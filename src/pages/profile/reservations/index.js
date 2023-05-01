import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import Link from "next/link";

async function fetchReservations(userId) {
  const response = await fetch(`/api/user/${userId}/reservations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const Reservations = () => {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState([]);
  const columns = [
    "Equipment",
    "Quantity",
    "Status",
    "Start Date",
    "End Date",
    "",
  ];

  useEffect(() => {
    async function fetchFromApi(userId) {
      let response = await fetchReservations(userId);
      const reservations = response.data.map((reservation) => {
        return {
          rowLink: `/reservations/${reservation._id}`,
          items: [
            <Link
              href={`/categories/${reservation.equipment.category.slug}/${reservation.equipment.slug}`}
            >
              {reservation.equipment.name}
            </Link>,
            reservation.quantity,
            <span className="text-red-700">{reservation.status}</span>,
            new Date(reservation.dateStart).toDateString(),
            new Date(reservation.dateEnd).toDateString(),
            <Link href={`/reservations/${reservation._id}`}>View Details</Link>,
          ],
        };
      });
      setReservations(reservations);
    }

    if (session?.user) {
      fetchFromApi(session?.user._id);
    }
  }, [session?.user]);

  return (
    <>
      <section className="relative pt-16 items-center">
        <CardTable
          columns={columns}
          tableData={reservations}
          label={"Reservations list"}
        />
      </section>
    </>
  );
};

export default Reservations;

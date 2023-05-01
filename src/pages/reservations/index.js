import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import { formatDate } from "@/lib/utils/date";

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
  const columns = ["Equipment", "Quantity", "Status", "Period"];

  useEffect(() => {
    async function fetchFromApi(userId) {
      let response = await fetchReservations(userId);

      const reservations = response.data.map((reservation) => {
        // prettier-ignore
        const statusDecoration =
          reservation.status == "pending"
          ? "rounded px-2 py-1 bg-red-100 text-red-400"
          : "rounded px-2 py-1 bg-green-100 text-green-400";
        return {
          rowLink: `/reservations/${reservation._id}`,
          items: [
            reservation.equipment.name,
            reservation.quantity,
            <span className={`bold uppercase ${statusDecoration}`}>
              {reservation.status}
            </span>,
            <span>
              {formatDate(reservation.dateStart)}
              {" — "}
              {formatDate(reservation.dateEnd)}
            </span>,
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

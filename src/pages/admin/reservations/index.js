import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import { formatDate } from "@/lib/utils/date";
import getStatusDecoration from "@/lib/utils/style/getStatusDecoration";

async function fetchReservations() {
  const response = await fetch(`/api/reservations`, {
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
  const columns = ["Equipment", "Quantity", "Status", "Student", "Period"];

  useEffect(() => {
    async function fetchFromApi() {
      let response = await fetchReservations();
      const reservations = response.data.map((reservation) => {
        return {
          rowLink: `/admin/reservations/${reservation._id}`,
          items: [
            `${reservation.equipment.name}`,
            reservation.quantity,
            <span
              className={`bold uppercase ${getStatusDecoration(
                reservation.status
              )}`}
            >
              {reservation.status}
            </span>,
            `${reservation.user.firstName} ${reservation.user.lastName}`,
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
      fetchFromApi();
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

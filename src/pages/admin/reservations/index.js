import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import { formatDate } from "@/lib/utils/date";
import getStatusDecoration from "@/lib/utils/style/getStatusDecoration";
import { GET } from "@/lib/fetcher";

const Reservations = () => {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const columns = ["Equipment", "Quantity", "Status", "Student", "Period"];

  useEffect(() => {
    async function fetchFromApi() {
      const response = await GET({ url: `/api/reservations` });
      setReservations(response.data);
    }

    if (session?.user) {
      fetchFromApi();
    }
  }, [session?.user]);

  useEffect(() => {
    const tempReservations = reservations
      .filter(({ status }) => {
        return status == selectedStatus || selectedStatus == "all";
      })
      .map((reservation) => {
        console.log({ reservation });
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
              {formatDate(reservation.dateEnd, "time")}
            </span>,
          ],
        };
      });
    setFilteredReservations(tempReservations);
  }, [reservations, selectedStatus]);

  return (
    <>
      <section className="relative">
        <div className="py-4 my-4">
          <select
            className="rounded-md"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <CardTable
          columns={columns}
          tableData={filteredReservations}
          label={"Reservations list"}
        />
      </section>
    </>
  );
};

export default Reservations;

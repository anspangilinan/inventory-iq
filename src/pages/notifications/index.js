import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";

async function fetchNotifications(userId) {
  const response = await fetch(`/api/user/${userId}/notifications`, {
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

const Notifications = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const columns = ["Date", "Message"];

  useEffect(() => {
    async function fetchFromApi(userId) {
      let response = await fetchNotifications(userId);
      const notifications = response.data.map((reservation) => {
        return {
          rowLink: `/categories/${reservation.equipment.category.slug}/${reservation.equipment.slug}`,
          items: [
            <Link
              href={`/categories/${reservation.equipment.category.slug}/${reservation.equipment.slug}`}
            >
              {reservation.equipment.name}
            </Link>,
            reservation.quantity,
            new Date(reservation.dateStart).toDateString(),
            new Date(reservation.dateEnd).toDateString(),
            <Link href={`/reservation/${reservation._id}`}>View Details</Link>,
          ],
        };
      });
      setNotifications(notifications);
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
          tableData={notifications}
          label={"Notifications list"}
        />
      </section>
    </>
  );
};

export default Notifications;

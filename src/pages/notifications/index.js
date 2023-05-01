import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import { formatDate } from "@/lib/utils/date";

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
      const notifications = response.data.map((notification) => {
        return {
          rowLink: `/reservations/${notification.reservation._id}`,
          items: [formatDate(notification.dateCreated), notification.message],
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

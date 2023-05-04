import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import { formatDate } from "@/lib/utils/date";
import { GET } from "@/lib/fetcher";

const Notifications = () => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const columns = ["Date", "Message"];

  useEffect(() => {
    async function fetchFromApi(userId) {
      let response = await GET({ url: `/api/user/${userId}/notifications` });
      const notifications = response.data.map((notification) => {
        const rowLink =
          session.user.role == "student"
            ? `/reservations/${notification.reservation._id}`
            : `/admin/reservations/${notification.reservation._id}`;
        return {
          rowLink,
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

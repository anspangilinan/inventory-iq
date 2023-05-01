import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";

async function fetchBookmarks(userId) {
  const response = await fetch(`/api/user/${userId}/bookmarks`, {
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

const Bookmarks = () => {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState([]);
  const columns = ["Bookmark Type", "Link"];

  useEffect(() => {
    async function fetchFromApi(userId) {
      let response = await fetchBookmarks(userId);
      const bookmarks = response.data.map((reservation) => {
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
          ],
        };
      });
      setBookmarks(bookmarks);
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
          tableData={bookmarks}
          label={"Bookmarks list"}
        />
      </section>
    </>
  );
};

export default Bookmarks;

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import { GET } from "@/lib/fetcher";

const Bookmarks = () => {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState([]);
  const columns = ["Link", "Bookmark Type"];

  useEffect(() => {
    async function fetchFromApi(userId) {
      let response = await GET({ url: `/api/user/${userId}/bookmarks` });
      const bookmarks = response.data.map((reservation) => {
        return {
          rowLink: reservation.equipment
            ? `/categories/${reservation.equipment.category.slug}/${reservation.equipment.slug}`
            : `/categories/${reservation.equipment.category.slug}`,
          items: [
            reservation.equipment
              ? reservation.equipment.name
              : reservation.category.name,
            reservation.equipment ? "Equipment" : "Category",
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
      <CardTable
        columns={columns}
        tableData={bookmarks}
        label={"Bookmarks list"}
        color={"light"}
      />
    </>
  );
};

export default Bookmarks;

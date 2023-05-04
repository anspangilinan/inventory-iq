import React, { useEffect, useState } from "react";
import useSWR from "swr";
import jsonFetcher from "@/lib/jsonFetcher";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { user: session.user },
  };
}

const HomePage = ({ user }) => {
  const { data } = useSWR("/api/equipmentCategory", jsonFetcher);
  const [equipmentCategories, setEquipmentCategories] = useState([]);
  const router = useRouter();

  // check if logged in and redirect to home page if so
  useEffect(() => {
    if (user.role == "admin") {
      router.replace("/admin/reservations");
    }
  }, [router]);

  useEffect(() => {
    if (data) setEquipmentCategories(data.data);
  }, [data]);

  const colors = ["red-400", "emerald-400", "lightBlue-400"];

  return (
    <>
      <div className="flex flex-wrap">
        {equipmentCategories?.map((category, i) => {
          return (
            <Link
              key={i}
              href={`/categories/${category.slug}`}
              className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center"
            >
              <div className="bg-white hover:bg-orange-100 relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-8">
                  <div
                    className={`bg-${
                      colors[i % 3]
                    } text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full`}
                  >
                    <i className={`text-3xl fa ${category.icon}`}></i>
                  </div>
                  <h6 className="text-xl font-semibold">{category.name}</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;

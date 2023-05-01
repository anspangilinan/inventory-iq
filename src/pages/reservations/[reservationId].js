import jsonFetcher from "@/lib/jsonFetcher";
import { formatDate } from "@/lib/utils/date";
import getStatusDecoration from "@/lib/utils/style/getStatusDecoration";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import useSWR from "swr";

export async function getServerSideProps(context) {
  const { reservationId } = context.query;
  return {
    props: { reservationId },
  };
}

const EquipmentDetails = ({ reservationId }) => {
  const [reservation, setReservation] = useState(undefined);

  const { data } = useSWR(`/api/reservations/${reservationId}`, jsonFetcher);

  const { data: session } = useSession();
  const isAdmin = session?.user.role == "admin";

  useEffect(() => {
    if (data) {
      setReservation(data.data);
    }
  }, [data]);

  return (
    reservation !== undefined && (
      <section className="relative bg-blueGray-200 mt-[300px]">
        <div className="container mx-auto w-full lg:w-5/6">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex items-center justify-between my-6">
                <div className="text-left w-9/12 pl-3 pr-6 text-blueGray-700">
                  <span className="text-xl text-blueGray-700  font-semibold ">
                    Reservation Details
                  </span>
                  <div className="text-blueGray-600">
                    <ul>
                      <li>
                        Equipment:{" "}
                        <Link
                          href={`/categories/${reservation.equipment.category.slug}/${reservation.equipment.slug}`}
                          className="hover:underline hover:text-orange-500"
                        >
                          {reservation.equipment.name}
                        </Link>
                      </li>
                      <li>
                        Category:{" "}
                        <Link
                          href={`/categories/${reservation.equipment.category.slug}`}
                          className="hover:underline hover:text-orange-500"
                        >
                          {reservation.equipment.category.name}
                        </Link>
                      </li>
                      <li>Quantity: {reservation.quantity}</li>
                      <li>
                        Period: {formatDate(reservation.dateStart)}
                        {" - "}
                        {formatDate(reservation.dateEnd)}
                      </li>
                      <li>
                        Status:{" "}
                        <span
                          className={`uppercase bold ${getStatusDecoration(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="border-b-2 my-2 py-2 w-full"></div>
                  <span className="text-xl text-blueGray-700 font-semibold ">
                    Student Details
                  </span>
                  <div className=" text-blueGray-600">
                    <ul>
                      <li>
                        {`Name: ${reservation.user.firstName}  ${reservation.user.lastName}`}
                      </li>
                      <li>Email: {reservation.user.email}</li>
                      {reservation.user.grade && (
                        <li className="mb-2 text-blueGray-600">
                          <i className="fas fa-chalkboard mr-2 text-lg text-blueGray-400"></i>
                          {` Grade: ${reservation.user.grade}  ${reservation.user.section}`}
                        </li>
                      )}
                    </ul>
                  </div>
                  {isAdmin && reservation.status == "pending" && (
                    <div className="mt-8 mb-2 text-blueGray-600 flex items-center">
                      <button className="w-3/4 bg-green-200 text-green-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        Approve
                      </button>
                      <button className="w-3/4 bg-red-200 text-red-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <Calendar
                    tileDisabled={() => true}
                    value={[reservation.dateStart, reservation.dateEnd]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default EquipmentDetails;

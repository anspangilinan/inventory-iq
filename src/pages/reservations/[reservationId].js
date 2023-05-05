import { PATCH } from "@/lib/fetcher";
import jsonFetcher from "@/lib/jsonFetcher";
import { formatDate } from "@/lib/utils/date";
import getStatusDecoration from "@/lib/utils/style/getStatusDecoration";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import useSWR from "swr";

export async function getServerSideProps(context) {
  const { reservationId } = context.query;
  return {
    props: { reservationId },
  };
}

async function updateReservation({ reservationId, body }) {
  return await PATCH({
    url: `/api/reservations/${reservationId}`,
    body: JSON.stringify(body),
  });
}

const ReservationDetails = ({ reservationId }) => {
  const [reservation, setReservation] = useState(undefined);

  const { data } = useSWR(`/api/reservations/${reservationId}`, jsonFetcher);

  const { data: session } = useSession();
  const isAdmin = session?.user.role == "admin";

  useEffect(() => {
    if (data) {
      setReservation(data.data);
    }
  }, [data]);

  const statusChange = async (status) => {
    await updateReservation({
      reservationId: reservation._id,
      body: { status },
    });
    toast.success(`Reservation ${status}`);
  };

  return (
    reservation !== undefined && (
      <section className="relative">
        <div className="container mx-auto w-full lg:w-5/6">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full xs:w-3/5 mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-col md:flex-row items-center justify-between my-6">
                <div>
                  <Calendar
                    tileDisabled={() => true}
                    value={[reservation.dateStart, reservation.dateEnd]}
                    calendarType={"US"}
                  />
                </div>
                <div className="text-left w-full pl-3 pr-6 text-blueGray-700">
                  <span className="text-xl text-blueGray-700  font-semibold ">
                    Reservation Details
                  </span>
                  <div className="text-blueGray-600">
                    <ul>
                      <li>
                        <span
                          className={`uppercase bold ${getStatusDecoration(
                            reservation.status
                          )}`}
                        >
                          {reservation.status}
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-400">Equipment:</span>{" "}
                        <Link
                          href={`/categories/${reservation.equipment.category.slug}/${reservation.equipment.slug}`}
                          className="hover:underline hover:text-orange-500"
                        >
                          {reservation.equipment.name}
                        </Link>
                      </li>
                      <li>
                        <span className="text-gray-400">Category:</span>{" "}
                        <Link
                          href={`/categories/${reservation.equipment.category.slug}`}
                          className="hover:underline hover:text-orange-500"
                        >
                          {reservation.equipment.category.name}
                        </Link>
                      </li>
                      <li>
                        <span className="text-gray-400">Quantity:</span>{" "}
                        {reservation.quantity}
                      </li>
                      <li>
                        <span className="text-gray-400">Date:</span>{" "}
                        <span className="text-amber-600">
                          {formatDate(reservation.dateStart, "dateOnly")}
                        </span>
                      </li>
                      <li>
                        <span className="text-gray-400">Period:</span>{" "}
                        <span className="text-amber-600">
                          {formatDate(reservation.dateStart, "time")}
                          {" - "}
                          {formatDate(reservation.dateEnd, "time")}
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
                        <span className="text-gray-400">Name:</span>{" "}
                        {`${reservation.user.firstName}  ${reservation.user.lastName}`}
                      </li>
                      <li>
                        <span className="text-gray-400">Email:</span>{" "}
                        {reservation.user.email}
                      </li>
                      {reservation.user.grade && (
                        <li className="mb-2 text-blueGray-600">
                          <span className="text-gray-400">Grade:</span>{" "}
                          {`${reservation.user.grade}  ${reservation.user.section}`}
                        </li>
                      )}
                    </ul>
                  </div>
                  {isAdmin && reservation.status == "pending" && (
                    <div className="mt-8 mb-2 text-blueGray-600 flex items-center">
                      <button
                        className="w-3/4 bg-green-200 text-green-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={async () => await statusChange("approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="w-3/4 bg-red-200 text-red-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={async () => await statusChange("rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default ReservationDetails;

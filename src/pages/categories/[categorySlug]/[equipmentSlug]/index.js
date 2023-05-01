import { CardTable } from "@/components/table";
import jsonFetcher from "@/lib/jsonFetcher";
import { formatDate } from "@/lib/utils/date";
import getStatusDecoration from "@/lib/utils/style/getStatusDecoration";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import useSWR from "swr";

export async function getServerSideProps(context) {
  const { categorySlug, equipmentSlug } = context.query;
  return {
    props: { categorySlug, equipmentSlug },
  };
}

async function fetchReservations(userId, equipmentId) {
  const response = await fetch(
    `/api/user/${userId}/reservations?equipmentId=${equipmentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

async function createReservation({ userId, body }) {
  const response = await fetch(`/api/user/${userId}/reservations`, {
    method: "POST",
    body: JSON.stringify(body),
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

async function upsertBookmark({ userId, body }) {
  const response = await fetch(`/api/user/${userId}/bookmarks`, {
    method: "POST",
    body: JSON.stringify(body),
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

const EquipmentReservations = ({ equipmentId }) => {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState([]);
  const columns = ["Quantity", "Period", "Status"];

  useEffect(() => {
    async function fetchFromApi(userId, equipmentId) {
      let response = await fetchReservations(userId, equipmentId);

      const reservations = response.data.map((reservation) => {
        return {
          items: [
            reservation.quantity,
            <span>
              {formatDate(reservation.dateStart)}
              {" — "}
              {formatDate(reservation.dateEnd)}
            </span>,
            <span
              className={`uppercase bold ${getStatusDecoration(
                reservation.status
              )}`}
            >
              {reservation.status}
            </span>,
          ],
        };
      });
      setReservations(reservations);
    }

    if (session?.user) {
      fetchFromApi(session?.user._id, equipmentId);
    }
  }, [session?.user]);

  return (
    <>
      <CardTable
        columns={columns}
        tableData={reservations}
        label={"Reservations for this equipment"}
        color={"dark"}
      />
    </>
  );
};

const EquipmentDetails = ({ equipmentSlug }) => {
  const [equipment, setEquipment] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const { data: session } = useSession();

  const { data } = useSWR(`/api/equipment/${equipmentSlug}`, jsonFetcher);

  useEffect(() => {
    if (data) {
      setEquipment(data.data);
    }
  }, [data]);

  const dateChange = (update) => {
    setDateRange(update);
  };

  const reserveHandler = async () => {
    if (quantity == 0) {
      toast.error("Please set a quantity");
    } else if (startDate === null) {
      toast.error("Select a start date");
    } else if (endDate === null) {
      toast.error("Select an End Date");
    } else {
      await createReservation({
        userId: session.user._id,
        body: {
          equipmentId: equipment._id,
          quantity,
          startDate,
          endDate,
        },
      });

      toast.success("Reservation submitted");
      setDateRange([null, null]);
      setQuantity(0);
    }
  };

  const bookmarkHandler = async () => {
    // upsertBookmark;
  };

  return (
    <>
      <div className="w-full md:w-4/6 relative flex-col md:flex justify-between items-center min-w-0 break-words bg-white p-6 shadow-xl rounded-lg">
        <div className="w-full md:w-1/2 md:flex">
          <div className="flex items-center justify-between pt-4 w-1/2">
            <h3 className="text-3xl font-semibold text-blueGray-600">
              {equipment?.name}
            </h3>
            <span className="text-3xl text-gray-600 hover:text-orange-400 hover:cursor-pointer">
              <i className="fa fa-bookmark"></i>
            </span>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
            {equipment?.description}
          </p>
          <ul className="list-none mt-6 bg-blueGrey-200 rounded-lg">
            <li className="py-2">
              <div className="flex items-center">
                <div className="bg-gray-300 rounded-full">
                  <span
                    onClick={() => setQuantity(quantity ? quantity - 1 : 0)}
                    className="text-white bg-red-400 hover:bg-red-600 hover:cursor-pointer rounded-full text-sm font-semibold inline-block py-1 px-2 uppercase"
                  >
                    <i className="fas fa-minus"></i>
                  </span>
                  <span className="text-sm font-semibold inline-block py-1 px-6 uppercase  bg-gray-300">
                    {quantity}
                  </span>
                  <span
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white bg-green-400 hover:bg-green-600 hover:cursor-pointer rounded-full text-sm font-semibold inline-block py-1 px-2 uppercase"
                  >
                    <i className="fas fa-plus"></i>
                  </span>
                </div>
              </div>
            </li>
            <li className="py-2">
              <div className="flex flex-wrap items-center">
                <i className="fa fa-calendar text-blueGray-600 mr-2"></i>
                <DatePicker
                  showIcon
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={dateChange}
                  withPortal
                  dateFormat="MMMM d, yyyy"
                  className="border-0 px-6 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </li>
            <li className="py-2">
              <div className="flex items-center">
                <div>
                  <button
                    className="bg-blueGray-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={reserveHandler}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 md:flex">
          <EquipmentReservations equipmentId={equipment._id} />
        </div>
      </div>
    </>
  );
};

export default EquipmentDetails;

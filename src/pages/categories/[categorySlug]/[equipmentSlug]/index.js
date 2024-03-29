import { CardTable } from "@/components/table";
import Bookmark from "@/components/bookmark";
import { GET, POST } from "@/lib/fetcher";
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
  return await GET({
    url: `/api/user/${userId}/reservations?equipmentId=${equipmentId}`,
  });
}

async function createReservation({ userId, body }) {
  return await POST({
    url: `/api/user/${userId}/reservations`,
    body: JSON.stringify(body),
  });
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
          rowLink: `/reservations/${reservation._id}`,
          items: [
            reservation.quantity,
            <span>
              {formatDate(reservation.dateStart)}
              {" — "}
              {formatDate(reservation.dateEnd, "time")}
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

    if (session?.user?._id && equipmentId) {
      fetchFromApi(session?.user._id, equipmentId);
    }
  }, [session?.user, equipmentId]);

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { data: session } = useSession();

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterEndPassedTime = (time) => {
    const selectedDate = new Date(time);

    return startDate.getTime() < selectedDate.getTime();
  };

  const { data } = useSWR(`/api/equipments/${equipmentSlug}`, jsonFetcher);
  useEffect(() => {
    if (data) {
      setEquipment(data.data);
    }
  }, [data]);

  useEffect(() => {
    async function refetchEquipment() {
      const queryString = new URLSearchParams({
        startDate,
        endDate,
      }).toString();
      const response = await GET({
        url: `/api/equipments/${equipmentSlug}?${queryString}`,
      });
      setEquipment(response.data);
    }
    if (startDate && endDate) {
      refetchEquipment();
    }
  }, [startDate, endDate]);

  const reserveHandler = async () => {
    if (quantity == 0) {
      toast.error("Please set a quantity");
    } else if (quantity > equipment.availableItems) {
      toast.error("Quantity exceeds maximum available items");
    } else if (startDate === null) {
      toast.error("Select a start date");
    } else if (endDate === null) {
      toast.error("Select an End Date");
    } else {
      if (startDate.getTime() >= endDate.getTime()) {
        toast.error("End time must be greater than Start time");
      } else if (
        startDate.getTime() <
          new Date(new Date(startDate).setHours(6, 30)).getTime() ||
        startDate.getTime() >
          new Date(new Date(startDate).setHours(16, 30)).getTime()
      ) {
        toast.error(
          "Start time out of valid period. Must be within 6:30 - 16:30"
        );
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
        setStartDate(new Date());
        setEndDate(new Date());
        setQuantity(0);
      }
    }
  };

  return (
    <>
      <div className="w-full xl:w-full relative flex-col md:flex justify-between items-center min-w-0 break-words bg-white p-6 shadow-xl rounded-lg">
        <div className="w-full flex-col xl:w-1/2 xl:flex">
          <div className="flex items-center justify-between pt-4 w-full">
            <h3 className="text-3xl font-semibold text-blueGray-600">
              {equipment?.name}
            </h3>
            <Bookmark
              userId={session?.user._id}
              params={{ equipmentId: equipment?._id }}
            />
          </div>
          <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
            {equipment?.description}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
            <span className="font-bold">Available items: </span>
            {equipment?.availableItems}
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
              <div className="w-full flex-row items-center">
                <DatePicker
                  className="m-auto"
                  showTimeSelect
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setEndDate(date);
                  }}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeIntervals={15}
                  filterTime={filterPassedTime}
                  minTime={new Date().setHours(6, 30)}
                  maxTime={new Date().setHours(16, 35)}
                />
                <DatePicker
                  className="m-auto w-left-0"
                  showTimeSelect
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="h:mm aa"
                  includeDates={[startDate, startDate]}
                  showTimeSelectOnly
                  timeIntervals={15}
                  filterTime={filterEndPassedTime}
                  minTime={new Date().setHours(6, 30)}
                  maxTime={new Date().setHours(16, 35)}
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
        <div className="w-full xl:w-1/2 xl:flex">
          <EquipmentReservations equipmentId={equipment._id} />
        </div>
      </div>
    </>
  );
};

export default EquipmentDetails;

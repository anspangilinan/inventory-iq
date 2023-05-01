import jsonFetcher from "@/lib/jsonFetcher";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export async function getServerSideProps(context) {
  const { reservationId } = context.query;
  return {
    props: { reservationId },
  };
}

const EquipmentDetails = ({ reservationId }) => {
  const [reservation, setReservation] = useState([]);

  const { data } = useSWR(`/api/reservations/${reservationId}`, jsonFetcher);

  useEffect(() => {
    if (data) {
      setReservation(data.data);
    }
  }, [data]);

  return <section className="relative py-20"></section>;
};

export default EquipmentDetails;

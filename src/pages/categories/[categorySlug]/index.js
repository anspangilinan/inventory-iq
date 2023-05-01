import React, { useEffect, useState } from "react";
import useSWR from "swr";
import jsonFetcher from "@/lib/jsonFetcher";
import { CardTable } from "@/components/table";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { categorySlug } = context.query;
  return {
    props: { categorySlug },
  };
}

const EquipmentsIndex = ({ categorySlug }) => {
  const { data } = useSWR(
    `/api/equipmentCategory/${categorySlug}`,
    jsonFetcher
  );
  const [equipments, setEquipments] = useState([]);
  const columns = ["Name", "Description"];

  useEffect(() => {
    if (data) {
      const equipments = data.data.map((equipment) => {
        return {
          rowLink: `/categories/${categorySlug}/${equipment.slug}`,
          items: [equipment.name, equipment.description],
        };
      });
      setEquipments(equipments);
    }
  }, [data]);

  return (
    <>
      <section className="relative pt-16 items-center">
        <CardTable
          columns={columns}
          tableData={equipments}
          label={`Equipments list`}
        />
      </section>
    </>
  );
};

export default EquipmentsIndex;

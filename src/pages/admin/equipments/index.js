import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardTable } from "@/components/table";
import { GET } from "@/lib/fetcher";

const EquipmentsAdmin = () => {
  const { data: session } = useSession();
  const [equipments, setEquipments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredEquipments, setFilteredEquipments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const columns = ["Equipment", "Category", "Available Items"];

  useEffect(() => {
    async function fetchFromApi() {
      const equipments = await GET({ url: `/api/equipments` });
      setEquipments(equipments.data);
      const categories = await GET({ url: `/api/equipmentCategory` });
      setCategories(categories.data);
    }

    if (session?.user) {
      fetchFromApi();
    }
  }, [session?.user]);

  useEffect(() => {
    const tempEquipment = equipments
      .filter(({ name, category }) => {
        const categoryCriteria =
          category.slug == selectedCategory || selectedCategory == "all";
        const searchCriteria =
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          searchTerm == "";
        return categoryCriteria && searchCriteria;
      })
      .map((equipment) => {
        return {
          rowLink: `/admin/equipments/${equipment.slug}/edit`,
          items: [
            equipment.name,
            equipment.category.name,
            equipment.availableItems,
            equipment.quantity,
          ],
        };
      });
    setFilteredEquipments(tempEquipment);
  }, [equipments, selectedCategory, searchTerm]);

  return (
    <>
      <section className="relative">
        <div className="py-4 my-4">
          <select
            className="rounded-md"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map(({ slug, name }, i) => {
              return (
                <option key={i} value={slug}>
                  {name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            className="rounded-md"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CardTable
          columns={columns}
          tableData={filteredEquipments}
          label={"Equipments list"}
        />
      </section>
    </>
  );
};

export default EquipmentsAdmin;

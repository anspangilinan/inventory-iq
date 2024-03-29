import { GET, PATCH } from "@/lib/fetcher";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { equipmentSlug } = context.query;

  return {
    props: { equipmentSlug },
  };
}

const EditEquipment = ({ equipmentSlug }) => {
  const [equipment, setEquipment] = useState();
  const { register, handleSubmit, setValue } = useForm({});

  useEffect(() => {
    async function fetchFromApi() {
      const response = await GET({ url: `/api/equipments/${equipmentSlug}` });
      setEquipment(response.data);
    }
    if (equipmentSlug) {
      fetchFromApi();
    }
  }, [equipmentSlug]);

  useEffect(() => {
    if (equipment) {
      setValue("name", equipment.name);
      setValue("availableItems", equipment.availableItems);
    }
  }, [equipment]);

  const isInt = (value) => {
    return (
      !isNaN(value) &&
      (function (x) {
        return (x | 0) === x;
      })(parseFloat(value))
    );
  };
  const onSubmit = async (data) => {
    if (!isInt(data.availableItems)) {
      toast.error("Please provide a valid number.");
    } else if (data.availableItems < 1) {
      toast.error("Please provided a positive number.");
    } else {
      const response = await PATCH({
        url: `/api/equipments/${equipment.slug}`,
        body: JSON.stringify({ ...data }),
      });
      toast.success("Updated Equipment!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col min-w-0 break-words w-full sm:w-1/2 m-auto mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Equipment Information
              </h6>
              <input
                className="bg-emerald-400 active:bg-blueGray-600 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
                value="Save Equipment"
              />
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Equipment
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("name")}
                    placeholder="Name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="availableItems"
                  >
                    Available Items
                  </label>
                  <input
                    type="text"
                    name="availableItems"
                    {...register("availableItems")}
                    placeholder="Available Items"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditEquipment;

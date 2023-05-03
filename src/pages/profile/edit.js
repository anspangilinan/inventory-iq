import { PATCH } from "@/lib/fetcher";
import { toast } from "react-toastify";
import { getSession, useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      user: session.user,
    },
  };
}

const EditProfile = ({ user }) => {
  const { data: session, update } = useSession();
  const aaa = useSession();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      // email: user.email,
      // password: user.password,
      grade: user.grade,
      section: user.section,
    },
  });

  const onSubmit = async (data) => {
    await PATCH({
      url: `/api/user/${user._id}`,
      body: JSON.stringify({ ...data }),
    });
    const newSession = {
      ...session,
      user: {
        ...data,
      },
    };

    await update({ user: { ...data } });
    toast.success("Updated profile!");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex flex-col min-w-0 break-words w-full sm:w-1/2 m-auto mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                My account
              </h6>
              <input
                className="bg-emerald-400 active:bg-blueGray-600 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
                value="Save Profile"
              />
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Account
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email")}
                    placeholder="Email address"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...register("password")}
                    placeholder="Password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" /> */}

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    {...register("firstName")}
                    placeholder="First Name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grade"
                  >
                    Grade
                  </label>
                  <input
                    type="text"
                    name="grade"
                    {...register("grade")}
                    placeholder="Grade"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="section"
                  >
                    Section
                  </label>
                  <input
                    type="text"
                    name="section"
                    {...register("section")}
                    placeholder="Section"
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

export default EditProfile;

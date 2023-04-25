/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <section className="relative py-16 bg-blueGray-200 mt-[300px]">
      <div className="container mx-auto px-4 w-1/2">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">
                      Active Reservations
                    </span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-sm text-blueGray-400">Bookmarks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-12">
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                {session?.user?.firstName} {session?.user?.lastName}
              </h3>
              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                {session?.user?.email}
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                Grade {session?.user?.grade} - {session?.user?.section}
              </div>
              <div className="mt-8 mb-2 text-blueGray-600">
                <button className="w-3/4 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  Edit Profile
                </button>
                <button className="w-3/4 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                  View Reservations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

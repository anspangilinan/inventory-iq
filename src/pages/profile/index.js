/* eslint-disable react/jsx-no-target-blank */
import { GET } from "@/lib/fetcher";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      user: session.user,
    },
  };
}

const Profile = ({ user }) => {
  const [reservations, setReservations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function fetchFromApi(userId) {
      const reservations = await GET({
        url: `/api/user/${userId}/reservations`,
      });
      const bookmarks = await GET({ url: `/api/user/${userId}/bookmarks` });
      setReservations(reservations.data);
      setBookmarks(bookmarks.data);
    }

    if (user) {
      fetchFromApi(user._id);
    }
  }, [user]);

  return (
    <>
      <div className="container mx-auto w-full lg:w-4/6">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {reservations.length}
                    </span>
                    <span className="text-sm text-blueGray-400">
                      Active Reservations
                    </span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {bookmarks.length}
                    </span>
                    <span className="text-sm text-blueGray-400">Bookmarks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-12">
              <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                {user.firstName} {user.lastName}
              </h3>
              <div className="mb-2 text-blueGray-600 mt-10">{user.email}</div>
              <div className="mb-2 text-blueGray-600">Role: {user.role}</div>
              {user.grade && (
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-chalkboard mr-2 text-lg text-blueGray-400"></i>{" "}
                  Grade {user.grade} - {user.section}
                </div>
              )}
              <div className="mt-8 mb-2 flex-col items-center text-blueGray-600">
                <a
                  href="/profile/edit"
                  className="bg-red-600 text-white active:bg-red-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Edit Profile
                </a>
                <div className="mt-8 mb-2 flex-col items-center text-blueGray-600"></div>
                <a
                  href="/reservations"
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  View Reservations
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

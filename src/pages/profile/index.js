/* eslint-disable react/jsx-no-target-blank */
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

async function fetchReservations(userId) {
  const response = await fetch(`/api/user/${userId}/reservations`, {
    method: "GET",
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

async function fetchBookmarks(userId) {
  const response = await fetch(`/api/user/${userId}/bookmarks`, {
    method: "GET",
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
const Profile = () => {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    async function fetchFromApi(userId) {
      const reservations = await fetchReservations(userId);
      const bookmarks = await fetchBookmarks(userId);
      setReservations(reservations.data);
      setBookmarks(bookmarks.data);
    }

    if (session?.user) {
      fetchFromApi(session?.user._id);
    }
  }, [session?.user]);

  return (
    <section className="relative bg-blueGray-200 mt-[300px]">
      <div className="container mx-auto w-full lg:w-4/6">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
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
                {session?.user?.firstName} {session?.user?.lastName}
              </h3>
              <div className="mb-2 text-blueGray-600 mt-10">
                {session?.user?.email}
              </div>
              <div className="mb-2 text-blueGray-600">
                Role: {session?.user?.role}
              </div>
              {session?.user.grade && (
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-chalkboard mr-2 text-lg text-blueGray-400"></i>{" "}
                  Grade {session?.user?.grade} - {session?.user?.section}
                </div>
              )}
              <div className="mt-8 mb-2 text-blueGray-600">
                <a
                  href="#"
                  className="w-3/4 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Edit Profile
                </a>
                <a
                  href="/reservations"
                  className="w-3/4 bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  View Reservations
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

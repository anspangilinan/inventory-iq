import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import SearchBar from "@/components/header/SearchBar";

export default function Sidebar() {
  const { data: session } = useSession();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link
            href="/"
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          >
            Inventory IQ
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <a href="/notifications">
                <i className="fas fa-bell"></i>
              </a>
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    Inventory IQ
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 mb-4 md:hidden">
              <SearchBar />
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Menu
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  href="/"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname == "/"
                      ? "text-red-500 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-home mr-2 text-sm " +
                      (router.pathname == "/"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Home
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/reservations"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname == "/reservations"
                      ? "text-red-500 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-book mr-2 text-sm " +
                      (router.pathname == "/reservations"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  My Reservations
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/bookmarks"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/bookmarks") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-bookmark mr-2 text-sm " +
                      (router.pathname.indexOf("/bookmarks") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Bookmarks
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {`${session?.user.firstName} ${session?.user.lastName}`}
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/profile"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/profile") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-user-circle mr-2 text-sm " +
                      (router.pathname.indexOf("/profile") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Profile
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/notifications"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname.indexOf("/notifications") !== -1
                      ? "text-red-500 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-bell mr-2 text-sm " +
                      (router.pathname.indexOf("/notifications") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Notifications
                </Link>
              </li>
              <li>
                <div
                  onClick={signOut}
                  className="cursor-pointer text-xs uppercase py-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                >
                  <i className="fas fa-sign-out mr-2 text-sm text-blueGray-300"></i>{" "}
                  Logout
                </div>
              </li>
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/admin/reservations"
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (router.pathname == "/admin/reservations"
                      ? "text-red-500 hover:text-red-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-newspaper mr-2 text-sm " +
                      (router.pathname == "/admin/reservations"
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Manage Reservations
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

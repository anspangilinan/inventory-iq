import SearchBar from "@/components/header/SearchBar";
import React from "react";

import UserDropdown from "./UserDropdown";
import Breadcrumb from "@/components/breadcrumbs";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="md:flex hidden flex-row flex-wrap items-center w-1/2">
            {session?.user.role == "student" && <SearchBar />}
          </div>
        </div>
      </nav>
      <Breadcrumb />
      {/* End Navbar */}
    </>
  );
}

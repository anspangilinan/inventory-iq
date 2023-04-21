import Breadcrumb from "@/components/breadcrumbs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs(breadcrumbs);
    console.log({ breadcrumbs });
  }, [router.asPath]);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header fixed />
      <div className="w-full flex flex-wrap items-center justify-between">
        <div className="container px-4 mx-auto">
          <section className="header relative pt-16 items-center">
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </section>
          <section>{children}</section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

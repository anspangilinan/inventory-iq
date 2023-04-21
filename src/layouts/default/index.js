import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header fixed />
      <div className="w-full flex flex-wrap items-center justify-between">
        <div className="container px-4 mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

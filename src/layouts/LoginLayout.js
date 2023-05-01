import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <main>
      <section className="relative w-full h-full py-40 min-h-screen">
        <div className="absolute top-0 w-full h-full bg-red-700 bg-no-repeat bg-full"></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginLayout;

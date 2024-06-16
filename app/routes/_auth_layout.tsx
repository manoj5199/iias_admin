import { Outlet } from "@remix-run/react";
import React from "react";

const AuthLayout = () => {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

"use client"
import React, { useContext, useEffect } from "react";
import Login from "@/pages/Login";
import { UserContext } from "@/context/UserContext";
import PageLoader from "@/components/ui/PageLoader";

export default function Home() {
  const { user, loadingUserDetails } = useContext(UserContext);
  
  return (
    <div
      className="
        w-screen h-screen flex items-center justify-center
        bg-[linear-gradient(to_bottom_left,rgba(255,225,230,0.75)_5%,#fff_30%,#fff_60%,rgba(255,225,230,0.75)_100%)]
      "
    >
      {
        loadingUserDetails ?
          <PageLoader />
          :
          user.username !== '' ?
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {(user?.username ?? '')}!</h1>
            </div>
            :
            <Login />
      }
    </div>
  );
}

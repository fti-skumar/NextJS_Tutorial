'use client';
import React, { useEffect, useState } from "react";
import Login from "./login/page";

export default function Home() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const onLogin = () => {
    setisLoggedIn(true);
  };
  // Simulate an API call to check if the user is logged in
  // const isLoggedIn = use(async () => {
  //   const response = await fetch('/api/check-login');
  //   const data = await response.json();
  //   return data.isLoggedIn;
  // });

  return (
    <div
      className="
        w-screen h-screen flex items-center justify-center
        bg-[linear-gradient(to_bottom_left,rgba(255,225,230,0.75)_5%,#fff_30%,#fff_60%,rgba(255,225,230,0.75)_100%)]
      "
    >
      <Login {...{onLogin}} />
    </div>
  );
}

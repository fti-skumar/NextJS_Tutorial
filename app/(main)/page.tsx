"use client"
import React, { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import PageLoader from "@/components/ui/PageLoader";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loadingUserDetails } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (loadingUserDetails) return;
    if (user._id === '') { 
      router.push('/login');
    } else {
      router.push('/cameras');
    }
  }, [user, loadingUserDetails, router]);
  
  return (
    <div
      className="
        w-full h-screen flex items-center justify-center
      "
    >
      {
        (loadingUserDetails || user._id === '') ?
          <PageLoader />
          :
          null
      }
    </div>
  );
}

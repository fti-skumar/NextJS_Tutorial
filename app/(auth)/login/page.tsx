"use client";
import { UserContext } from '@/context/UserContext';
import Login from '@/pages/Login';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const LoginPage = () => {
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
      className="w-screen h-screen flex items-center justify-center bg-[#f6f4f7]"
    >
      <Login />
    </div>
  );
};

export default LoginPage;
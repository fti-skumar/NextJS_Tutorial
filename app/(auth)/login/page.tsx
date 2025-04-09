"use client";
import PageLoader from '@/components/ui/PageLoader';
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
    <>
      {loadingUserDetails ? (
        <div className="w-full h-full flex items-center justify-center">
          <PageLoader />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default LoginPage;
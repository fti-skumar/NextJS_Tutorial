'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';

// Create a context for user data
export const UserContext = createContext({
  user: {username: '', _id: ''},
  updateUser: (user: {username: string, _id: string}) => {},
  loadingUserDetails: true,
});

const UserProvider = (
  { children }: Readonly<{
    children: React.ReactNode;
  }>) => {
  const [user, setUser] = useState({username: '', _id: ''});
  const [loadingUserDetails, setLoadingUserDetails] = useState(true);
  const router = useRouter();

  const updateUser = (user: {username: string, _id: string}) => {
    setUser(user);
  }
  
  useEffect(() => {
    // Only fetch if user is not already set (i.e., freshly logged in)
    if (user._id) {
      setLoadingUserDetails(false);
      return;
    }


    const getUser = async () => {
      try {
        // Fetch user data from the API
        const res = await fetch("/api/users/me");
        console.log('abcdr', res);
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // Store user in context or state
          if (data.user._id === '') {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
        setLoadingUserDetails(false);
      }
      catch (error) {
        console.error("Error fetching user data:", error);
        router.push('/login');
        setLoadingUserDetails(false);
      }
    }
  
    getUser();
  }, [user._id]); // Only run if user._id changes

  return (
    <UserContext.Provider value={{ user, loadingUserDetails, updateUser }}>
      {children}
    </UserContext.Provider>
  );
} 

export default UserProvider;
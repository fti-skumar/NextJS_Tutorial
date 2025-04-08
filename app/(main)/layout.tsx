"use client";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loadingUserDetails, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (response.ok) {
        updateUser({ username: '', _id: '' });
        router.push('/login'); // Redirect to home page after successful login
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="w-screen h-screen flex">
      {
        loadingUserDetails ?
          null
          :
          <>
            <SidebarProvider defaultOpen={false} className="w-[unset] shadow-[0px_0px_7px_0px_#0066ff0a]">
              <AppSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </SidebarProvider>
            <div className="h-screen flex flex-col flex-1">
              <div id="TopBar" className="w-full h-[3.5rem] flex shrink-0 items-center justify-end gap-[20px] p-[5px_30px] bg-[#f9f9fb] border-b-[1px] border-[#e8e8ec] shadow-[5px_0px_10px_0px_#0066ff0a]">
                <div>{user.username}</div>
                <Button
                  className={`text-[12px] w-[${loading ? '65px' : '56px'}] h-[26px] rounded-[5px] cursor-pointer flex items-center justify-center gap-[5px]`}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  <Loader2 className={`animate-spin ${loading ? 'block' : 'hidden'} !w-[15px] !h-[15px] `} />
                  Logout
                </Button>
              </div>
              <main className="w-full h-screen bg-[#f6f4f7] p-[30px_0_0_70px]">
                {children}
              </main>
            </div>
          </>
      }
    </div>
  );
}
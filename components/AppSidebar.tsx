"use client";
import { Cctv, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import NextLogo from "../public/assets/nextjs-logo.svg";
// import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Cameras",
    url: "/cameras",
    icon: Cctv,
  }
]

interface AppSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function AppSidebar({sidebarOpen, toggleSidebar}: AppSidebarProps) {
  const { open, setOpen } = useSidebar();
  const router = useRouter();
  const location = usePathname();

  const handleLogoClick = () => {
    if (location !== '/cameras') {
      router.push('/cameras');
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (sidebarOpen) return;
        setOpen(false);
      }}
    >
      <SidebarHeader className="h-[64px]">
        <SidebarMenuButton
          size="lg"
          className={`data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground ${!open ? 'gap-[0]' : ''}`}
          onClick={() => {handleLogoClick()}}
        >
          <div className="flex size-10 items-center justify-center text-sidebar-primary-foreground">
            <Image src={NextLogo} alt="next-logo" className="size-10" />
          </div>
          <div className="grid flex-1 text-left text-base leading-tight">
            <span className="truncate font-semibold text-[#3c3d3e]">
              NextJS Tutorial
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`${location === '/cameras' ? 'pointer-events-none': ''}`}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          size="lg"
          className={`data-[state=open]:bg-sidebar-accent cursor-pointer data-[state=open]:text-sidebar-accent-foreground ${!open ? 'gap-[0]' : ''}`}
          onClick={toggleSidebar}
        >
          <div className="flex size-10 items-center justify-center text-sidebar-primary-foreground">
            <Menu strokeWidth={2} color="#000" size={18} />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight mt-[2px]">
            <span className="truncate font-normal">
              {sidebarOpen ? 'Auto-Hide' : 'Keep Open'}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}

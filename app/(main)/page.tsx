"use client"
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/cameras');
  return (null);
}

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface HeaderProps {
  icon: React.ReactNode;
  title: string;
  backButton?: boolean;
  areaTitle?: string;
}

export default function PageHeader({ icon, title, backButton = false, areaTitle }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-4 h-32">
      <div className="flex gap-3.5">
        <div className="mt-[15px] text-xl text-gray-500">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-[18px]">
            {areaTitle ? (
              <div onClick={() => router.back()}>
                <div className="text-[12px] font-semibold text-[#717989] hover:underline cursor-pointer">
                  {areaTitle}
                </div>
              </div>
            ) : (
              <div /> // empty div with fixed height to maintain layout
            )}
          </div>
          <h1 className="text-xl font-semibold text-[#5a6671]">{title}</h1>
        </div>
      </div>
      {backButton && (
        <button
          onClick={() => router.back()}
          className="px-4 py-1 bg-gray-300 rounded text-gray-700 cursor-pointer"
        >
          Back
        </button>
      )}
    </div>
  );
}

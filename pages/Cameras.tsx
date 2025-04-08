'use client';
import { BiAbacus } from 'react-icons/bi';
import Link from 'next/link';
import styled from 'styled-components';
import { Cctv } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { ICamera } from '@/app/types/interface';
import Image from 'next/image';

const MainContainer = styled.div``;
const ContentContainer = styled.div``;

export default function CamerasList({ data }: { data: ICamera[] }) {
  return (
    <MainContainer className="flex w-[1100px] h-full">
      <ContentContainer className="space-y-2 text-sm">
        <PageHeader icon={<Cctv size={30} />} title="Cameras" backButton={false} />

        <div id='CameraContainer' className="mt-[56px] flex items-center w-[100%] gap-[25px] flex-wrap">
          {
            (data ?? []).map((item, index) => (
              <div id='CameraCArd' key={index} className='bg-[#ddd] rounded-[5px] overflow-hidden cursor-pointer'>
                <Image
                  src="/assets/live-view.jpg"
                  alt="camera"
                  width={320}
                  height={180}
                />
                <div id='CameraName' className='bg-[#fff] text-[12px] text-[#787f85] p-[10px]'>
                  <Link href={`/cameras/${item?.cam_id}`} className="hover:underline cursor-pointer">
                    {item?.camera_name || ''}
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </ContentContainer>
    </MainContainer>
  );
}

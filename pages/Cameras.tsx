'use client';

import { BiAbacus } from 'react-icons/bi';
import Link from 'next/link';
import styled from 'styled-components';
import { GiCctvCamera } from 'react-icons/gi';
import PageHeader from '@/components/ui/PageHeader';
import { ICamera } from '@/app/types/interface';

const MainContainer = styled.div``;
const ContentContainer = styled.div``;

export default function CamerasList({ data }: { data: ICamera[] }) {
  return (
    <MainContainer className="flex h-full">
      <ContentContainer className="space-y-2 text-sm ml-16 p-6">
        <PageHeader icon={<GiCctvCamera size={30} />} title="Cameras" backButton={false} />
        {data?.map((item, index) => (
          <div key={index} className="flex items-center text-gray-600">
            <BiAbacus className="text-orange-500 text-xs mr-2" />
            <div>
              <Link href={`/cameras/${item?.cam_id}`} className="font-semibold hover:underline cursor-pointer">
                {item?.camera_name || ''}
              </Link>
            </div>
          </div>
        ))}
      </ContentContainer>
    </MainContainer>
  );
}

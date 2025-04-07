'use client'
import { BiAbacus } from 'react-icons/bi';
import data from '../data/data.json'
import Link from 'next/link';
import styled from 'styled-components';
import { GiCctvCamera } from 'react-icons/gi';

const MainContainer = styled.div``;
const Sidebar = styled.div``;
const ContentContainer = styled.div``;
const Header = styled.div``;

export default function Cameras() {

  return (
    <MainContainer className="flex h-screen  bg-white pr-28 pl-10">
      {/* Sidebar */}
      <Sidebar className="w-16 h-screen bg-white shadow-md flex flex-col items-center py-4 fixed top-0 left-0">
        {/* Sidebar Icons */}
      </Sidebar>
      <ContentContainer className="space-y-2 text-sm ml-16 p-6">
      <Header className="flex justify-between items-center mb-4 h-32">
          <div className="flex gap-3.5">
            <GiCctvCamera size={30} className="text-gray-500 text-xl mt-[15px]" />
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-[#5a6671] mt-[20px]">Cameras</h1>
            </div>
          </div>
        </Header>
        {data.data.map((item, index) => (
          <div key={index} className="flex items-center text-gray-600">
            <BiAbacus className="text-orange-500 text-xs mr-2" />
            <div>
              <Link href={`/camera-details/${item.cam_id}`} className="font-semibold hover:underline cursor-pointer">
                {item.camera_name}
              </Link>
            </div>
          </div>
        ))}
      </ContentContainer>
    </MainContainer>
  );
}

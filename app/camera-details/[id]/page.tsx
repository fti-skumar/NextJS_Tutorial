'use client';

import { GiCctvCamera } from "react-icons/gi";
import { BsUpload } from "react-icons/bs";
import { BiSolidCircle } from "react-icons/bi";
import Image from "next/image";
import LiveView from '../../assets/live-view.jpg';
import data from '../../data/data.json'
import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";

const MainContainer = styled.div``;
const Sidebar = styled.div``;
const ContentContainer = styled.div``;
const Header = styled.div``;
const LayoutContainer = styled.div``;
const LeftSection = styled.div``;
const CameraDetailsCard = styled.div``;
const FTPDestinationsCard = styled.div``;
const IconBox = styled.div``;
const DetailsWrapper = styled.div``;
const FTPDetailsWrapper = styled.div``;
const RightSection = styled.div``;

export default function CameraDetails() {
  const params = useParams();
  const router = useRouter();
  const cameraId = params?.id;

  const [camera, setCamera] = useState<any>(null);

  useEffect(() => {
    if (cameraId) {
      const cam = data.data.find((item) => item.cam_id === cameraId);
      setCamera(cam);
    }
  }, [cameraId]);

  const getCameraStatus = useCallback((camera) => {
    if ((!camera?.fetch_enabled) || (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 0)) {
      return ('Fetch Disabled');
    } else if (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 1) {
      return ('Fetch Enabled');
    } else if (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 2) {
      return ('Fetch Failed');
    } else if (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 3) {
      return ('Awaiting Fetch');
    } else {
      return ('Awaiting Fetch');
    }
  }, []);

  return (
    <MainContainer className="flex h-screen  bg-white pr-28 pl-10">
      {/* Sidebar */}
      <Sidebar className="w-16 h-screen bg-white shadow-md flex flex-col items-center py-4 fixed top-0 left-0" />

      {/* Main Content */}
      <ContentContainer className="flex-1 ml-16 p-6">
        {/* Header */}

        <Header className="flex justify-between items-center mb-4 h-32">
          <div className="flex gap-3.5">
            <GiCctvCamera size={30} className="text-gray-500 text-xl mt-[15px]" />
            <div className="flex flex-col gap-1">
              <Link href="/cameras" passHref>
                <div className="text-[12px] font-semibold text-[#717989] hover:underline cursor-pointer">
                  Cameras
                </div>
              </Link>
              <h1 className="text-xl font-semibold text-[#5a6671]">{camera?.camera_name}</h1>
            </div>
          </div>
          <button onClick={() => router.push('/cameras')} className="px-4 py-1 bg-gray-300 rounded text-gray-700 cursor-pointer">
            Back
          </button>
        </Header>

        {/* Main Layout */}
        <LayoutContainer className="flex pb-10">
          {/* Left Section */}
          <LeftSection className="flex flex-col flex-1 gap-6">
            {/* Camera Details */}
            <CameraDetailsCard className="flex border bg-white">
              <IconBox className="w-[60px] h-full flex items-center justify-center border-r pr-2 mr-4">
                <GiCctvCamera className="text-gray-500 text-xl" />
              </IconBox>
              <DetailsWrapper className="flex-1">
                <h2 className="text-[#787f85] font-semibold text-[14px] p-3 ml-[-5px]">CAMERA DETAILS</h2>
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 p-2">
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">CAMERA STATUS</p>
                    <p className="text-[#697177] font-[500] text-[12px]">{getCameraStatus(camera)}</p>
                  </div>
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">META STATUS</p>
                    <p className="text-[#697177] font-[500] text-[12px]">{camera?.deleted_from_meta ? ('Deleted From Meta Server') : camera?.meta_sync ? ('In Sync') : ('Update Available')}</p>
                  </div>
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">FTP TRANSFER</p>
                    <p className="text-[#697177] font-[500] text-[12px]">{camera?.ftp_transfer ? ('Failed') : ('Enabled')}</p>
                  </div>
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">LATEST TRANSFER</p>
                    <p className="text-[#697177] font-[500] text-[12px]">
                      {(() => {
                        let formattedDate = ('Never Succeeded');
                        const filteredByUploadEnabled = camera?.upload_status_info?.filter(status => status);
                        const filteredByStatusCode = filteredByUploadEnabled?.filter(status => status.upload_status_code === 10000);
                        if (filteredByStatusCode && filteredByStatusCode?.length > 0) {
                          const latestItem = filteredByStatusCode?.reduce((latest, current) => {
                            return new Date(current.last_update_time) > new Date(latest.last_update_time) ? current : latest;
                          });
                          const lastUpdateTime = new Date(latestItem.last_update_time);
                          const year = lastUpdateTime.getFullYear();
                          const month = String(lastUpdateTime.getMonth() + 1).padStart(2, '0');
                          const day = String(lastUpdateTime.getDate()).padStart(2, '0');
                          const hours = String(lastUpdateTime.getHours()).padStart(2, '0');
                          const minutes = String(lastUpdateTime.getMinutes()).padStart(2, '0');
                          const seconds = String(lastUpdateTime.getSeconds()).padStart(2, '0');
                          formattedDate = `${year}/${month}/${day}  ${hours}:${minutes}:${seconds}`;
                        }
                        return formattedDate;
                      })()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">PTZ PRESET</p>
                    <p className="text-[#697177] font-[500] text-[12px]">{(camera?.access_and_preset_info?.ptz_preset && camera?.access_and_preset_info?.ptz_correction_enabled) ? camera.access_and_preset_info.ptz_preset : '-'}</p>
                  </div>
                </div>
              </DetailsWrapper>
            </CameraDetailsCard>

            {/* FTP Destinations */}
            <FTPDestinationsCard className="flex border bg-white">
              <IconBox className="w-[60px] h-full flex items-center justify-center border-r pr-2 mr-4">
                <BsUpload className="text-gray-600 text-xl" />
              </IconBox>
              <FTPDetailsWrapper className="flex-1">
                <h2 className="text-[#787f85] font-semibold text-[14px] p-3 ml-[-5px]">FTP DESTINATIONS</h2>
                <div className="space-y-2 text-sm pb-2">
                  {camera?.upload_status_info?.map((server, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <BiSolidCircle className="text-orange-500 text-xs mr-2" />
                      <div>
                        <p className="text-[#9ba1a6] font-[500] text-[12px]">{server?.ftp_server_name_en}</p>
                        <p className="text-[#697177] font-[500] text-[12px]">Awaiting Upload</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FTPDetailsWrapper>
            </FTPDestinationsCard>
          </LeftSection>

          {/* Right Section */}
          <RightSection className="border bg-white flex items-center justify-center w-[650px] h-[400px] ml-6">
            <Image src={LiveView} alt="Live view" className="w-full h-full object-cover" />
          </RightSection>
        </LayoutContainer>
      </ContentContainer>
    </MainContainer>
  );
}
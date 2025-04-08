'use client';

import { GiCctvCamera } from "react-icons/gi";
import Image from "next/image";
import LiveView from '../app/assets/live-view.jpg';
import React from "react";
import styled from "styled-components";
import PageHeader from "@/components/ui/PageHeader";
import { ICamera } from "@/app/types/interface";

const MainContainer = styled.div``;
const ContentContainer = styled.div``;
const OverviewContainer = styled.div``;
const LeftSection = styled.div``;
const CameraDetailsCard = styled.div``;
const IconBox = styled.div``;
const DetailsWrapper = styled.div``;
const RightSection = styled.div``;

interface CameraDetailsProps {
  camera: ICamera;
}

export default function CameraDetails({ camera }: CameraDetailsProps) {
  const getCameraStatus = (camera: ICamera) => {
    if ((!camera?.fetch_enabled) || (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 0)) {
      return 'Fetch Disabled';
    } else if (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 1) {
      return 'Fetch Enabled';
    } else if (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 2) {
      return 'Fetch Failed';
    } else if (camera?.fetch_enabled && camera?.fetch_status_info.fetch_status === 3) {
      return 'Awaiting Fetch';
    } else {
      return 'Awaiting Fetch';
    }
  };

  const getLatestSuccessfulUploadTime = (camera: ICamera) => {
    let formattedDate = 'Never Succeeded';

    const filteredByUploadEnabled = camera?.upload_status_info?.filter(status => status);
    const filteredByStatusCode = filteredByUploadEnabled?.filter(status => status.upload_status_code === 10000);

    if (filteredByStatusCode && filteredByStatusCode.length > 0) {
      const latestItem = filteredByStatusCode.reduce((latest, current) => {
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
  };

  return (
    <MainContainer className="flex h-screen bg-white pr-28 pl-10">
      <ContentContainer className="flex-1 ml-16 p-6">
        <PageHeader
          icon={<GiCctvCamera size={30} />}
          title={camera?.camera_name || ''}
          backButton
          areaTitle="Cameras"
        />
        <OverviewContainer className="flex">
          <LeftSection className="flex flex-col flex-1 gap-6">
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
                    <p className="text-[#697177] font-[500] text-[12px]">
                      {camera?.deleted_from_meta
                        ? 'Deleted From Meta Server'
                        : camera?.meta_sync
                        ? 'In Sync'
                        : 'Update Available'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">FTP TRANSFER</p>
                    <p className="text-[#697177] font-[500] text-[12px]">
                      {camera?.ftp_transfer ? 'Failed' : 'Enabled'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">LATEST TRANSFER</p>
                    <p className="text-[#697177] font-[500] text-[12px]">
                      {getLatestSuccessfulUploadTime(camera)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#9ba1a6] font-[500] text-[12px]">PTZ PRESET</p>
                    <p className="text-[#697177] font-[500] text-[12px]">
                      {(camera?.access_and_preset_info?.ptz_preset && camera?.access_and_preset_info?.ptz_correction_enabled)
                        ? camera.access_and_preset_info.ptz_preset
                        : '-'}
                    </p>
                  </div>
                </div>
              </DetailsWrapper>
            </CameraDetailsCard>
          </LeftSection>

          <RightSection className="border bg-white flex items-center justify-center w-[650px] h-[400px] ml-6">
            <Image src={LiveView} alt="Live view" className="w-full h-full object-cover" />
          </RightSection>
        </OverviewContainer>
      </ContentContainer>
    </MainContainer>
  );
}

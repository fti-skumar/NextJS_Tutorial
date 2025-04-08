import cameraData from '../../../data/data.json'; 
import CameraDetails from '@/pages/CameraDetails';
import { ICamera } from '@/app/types/interface';

export type PageProps = Promise<{ id: string }>;

export default async function Page(props: { params: PageProps }) {
  const { id } = await props.params;
  const camera = cameraData?.data.find(cam => cam?.cam_id === id);

  return <CameraDetails camera={camera as unknown as  ICamera} />;
}

import CameraDetails from '@/pages/CameraDetails';
import cameraData from '../../data/data.json'; // adjust path as needed

export default async function Page({ params }: { params: { id: string } }) {
  const camera = cameraData?.data?.find((cam) => cam?.cam_id === params?.id); // will be replaced with API call

  return <CameraDetails camera={camera} />;
}

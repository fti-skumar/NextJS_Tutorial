import data from '../data/data.json';
import CamerasList from '@/pages/Cameras'; // client component

export default function CamerasPage() {
  return <CamerasList data={data.data} />;
}
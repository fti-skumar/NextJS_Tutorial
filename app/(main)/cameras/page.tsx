import data from '../../data/data.json';
import CamerasList from '@/pages/Cameras'; // client component
import { ICamera } from '../../types/interface';


export default function Cameras() {
  return <CamerasList data={data.data as unknown as ICamera[]} />;
}
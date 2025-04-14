import CamerasList from '@/pages/Cameras'; // client component
import { ICamera } from '../../types/interface';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default async function Cameras() {
    const baseUrl = await getBaseUrl();
  
    const res = await fetch(`${baseUrl}/api/cameras`, {
      cache: 'no-store', // disables caching for fresh data
    });

    console.log(res,'res');//debug
  
    if (!res.ok) {
      // handle error, fallback UI or log
      return <div>Failed to fetch cameras</div>;
    }
  
    const json = await res.json();
    const camera = json?.data; // assuming the API returns an array
    console.log(camera)
    
  return <CamerasList data={camera as unknown as ICamera[]} />;
}
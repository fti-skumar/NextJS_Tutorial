import CameraDetails from '@/pages/CameraDetails';
import { ICamera } from '@/app/types/interface';
import { getBaseUrl } from '@/lib/getBaseUrl';

export type PageProps = Promise<{ id: string }>;

export default async function Page(props: { params: PageProps }) {
  const { id } = await props.params;
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/get-cameras/${id}`, {
    cache: 'no-store', // disables caching for fresh data
  });

  if (!res.ok) {
    // handle error, fallback UI or log
    return <div>Failed to fetch camera details</div>;
  }

  const json = await res.json();
  const camera = json?.data?.[0]; // assuming the API returns an array

  return <CameraDetails camera={camera as ICamera} />;
}

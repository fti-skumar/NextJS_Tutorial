import { Loader2 } from 'lucide-react';
import React from 'react';

const PageLoader = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-[5px]'>
      <Loader2 className='animate-spin text-[#54c3fb]' size={30} />
      <p className='text-[#595d69]'>Loading...</p>
    </div>
  )
}

export default PageLoader;
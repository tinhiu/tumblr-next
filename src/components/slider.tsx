import { useState } from 'react';
import Image from 'next/image';

import { TumblrPostPhoto } from '@/server/tumblr';
import ModalImage from './modal-image';

function Slider({ photos }: { photos: TumblrPostPhoto[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? photos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }

    const nextImage = () => {
        const isLast = currentIndex === photos.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }

    return (
        <div className='relative w-full'>
            <div className='relative flex justify-center overflow-hidden rounded-lg h-96'>
                <div className='absolute w-12 z-[1] top-0 right-0 px-3 bg-slate-400 font-semibold'>
                    {currentIndex + 1 + '/' + photos.length}
                </div>
                {
                    <div className='w-full h-full relative flex justify-center items-center'>
                        {photos.map((photo, index) => (
                            <div className={`flex absolute w-fit justify-center h-full opacity-0 overflow-hidden duration-700 delay-100 ${currentIndex == index ? 'opacity-100' : 'opacity-0'}`} key={index}>

                                <ModalImage image={photos[currentIndex].original_size.url}>
                                    <Image
                                        src={photo.original_size.url}
                                        width={0}
                                        height={0}
                                        sizes='100vw'
                                        className='w-full object-contain rounded-md hover:cursor-zoom-in'
                                        alt='photo'
                                    />
                                </ModalImage>
                            </div>
                        ))}
                    </div>
                }
            </div>
            {photos.length > 1 && <>
                <button
                    className='absolute rounded-lg bg-gray-100 p-3 inline-flex my-auto h-fit 
                    text-gray-500 hover:text-gray-500 items-center justify-center top-0 -left-8 bottom-0 rotate-180'
                    onClick={prevImage}>
                    <svg viewBox="0 0 48 48" fill='currentColor'
                        className='h-5 w-5 -rotate-90' xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z" />
                    </svg>
                </button>
                <button
                    className='absolute rounded-lg bg-gray-100 p-3 inline-flex my-auto h-fit 
                    text-gray-500 hover:text-gray-500 items-center justify-center top-0 -right-8 bottom-0'
                    onClick={nextImage}
                >
                    <svg viewBox="0 0 48 48" fill='currentColor'
                        className='h-5 w-5 -rotate-90' xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z" />
                    </svg>
                </button>
            </>}
        </div>
    );
}

export default Slider;
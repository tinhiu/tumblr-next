import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useRef, useState } from 'react';

type Props = {
    children: React.ReactNode
    image: string
}
function ModalImage({ image, children }: Props) {
    const [zoom, setZoom] = useState(false)

    const onClose = () => {
        setZoom(false);
    }
    return (
        <Dialog.Root onOpenChange={onClose}>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='bg-black/80 opacity-100 fixed flex top-0 left-0 bottom-0 right-0 justify-center items-center z-[52] inset-0' />
                <Dialog.Content className='min-h-screen z-[52] fixed left-1/2 top-1/2  
                -translate-y-1/2 -translate-x-1/2 w-fit'>
                    <Dialog.Close asChild>
                        <button
                            type="button"
                            className={`z-[53] absolute rounded-md p-4 inline-flex items-center justify-center outline-none border-0 text-white top-0  ${zoom ? 'right-8' : 'right-4'}`}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </Dialog.Close>
                    <div className='relative m-auto h-full w-fit z-[51] '>
                        <div className='flex justify-center items-center w-fit max-h-full max-w-full'>
                            <div className={`h-screen relative w-fit flex justify-center items-center transition-all ${zoom ? 'sm:items-baseline overflow-auto w-screen justify-between' : ''}`}>
                                <div className='relative '>
                                    <Image src={image}
                                        alt='photo-post'
                                        sizes={`(max-width: 1920px) 100vw, 1920px`}
                                        width={`${zoom ? window.innerWidth + 50 : 1920}`}
                                        height={`${zoom ? window.innerWidth : 1920}`}
                                        className={`box-border mx-auto transition-all pointer-events-none lg:pointer-events-auto ${zoom ? 'hover:cursor-zoom-out lg:w-screen lg:max-w-[inherit] max-h-[inherit] m-0' : 'hover:cursor-zoom-in j-full md:h-screen max-h-screen max-w-[100vw] w-fit'}`}
                                        onClick={() => setZoom(!zoom)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default ModalImage;
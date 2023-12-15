/* eslint-disable @next/next/no-img-element */
'use client'

import Image from 'next/image'
import { useState } from 'react'


export default function About() {
    const [open, setOpen] = useState(false)
    const [zoom, setZoom] = useState(false)
    const handleClick = () => {
        setOpen(!open);
    }
    const handleZoom = () => {
        setZoom(!zoom);
    }
    return (
        // <div className={`zoom-img w-full whitespace-nowrap overflow-auto flex justify-center items-center ${zoom ? '!h-screen items-baseline' : ''}`}>
        //     <div className='relative'>
        //         <Image src="http://placekitten.com/3000/3000" width={0} height={0}
        //             sizes='100vw' onClick={() => setZoom(!zoom)}
        //             alt='photo' className={`max-w-full h-full ${zoom ? 'scale-150' : ''} transition-all`} />

        //     </div>
        // </div>

        <div className='min-h-screen block h-full overflow-visible '>
            <main className='box-border'>
                <div className='relative w-full mx-auto p-0 text-center'>
                    <div className='text-left relative w-full '>
                        <div className='relative'>
                            <div className='box-border'>
                                <div className='bg-white'>
                                    <div className='box-border'>
                                        <section className='text-left'>
                                            <div className='box-border'>
                                                <div className='box-border pb-0 relative text-center py-0 px-[7.1%]'>
                                                    <div className='relative box-border inline-block max-w-[100%]'>
                                                        <div className='box-border relative' onClick={handleClick}>
                                                            <picture>
                                                                <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/2ff42b178553113.64e9fc2d6ffed.jpeg' alt='photo'
                                                                    className='mx-auto h-[50vh] left-auto relative top-auto inline-block max-w-[100%] align-middle pointer-events-none'
                                                                />
                                                            </picture>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                        </section>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {open && <div className='pointer-events-auto h-full text-left fixed top-0 left-0 w-screen z-10'>
                        <div className='bg-black z-20 opacity-50 fixed items-center flex justify-center top-0 left-0 right-0 bottom-0 box-border'></div>
                        <div className='h-full m-auto relative z-30'>
                            <div className='box-border'>
                                <span className='fixed top-4 right-4 w-4 h-4 bg-red-200 z-[99]' onClick={handleClick}></span>
                                <div className='inline-block max-h-full max-w-full box-border'>
                                    <div className='box-border'>
                                        <div className={`box-border flex h-full justify-center items-center absolute top-0 w-screen ${zoom ? 'sm:items-baseline overflow-auto w-full' : ''}`}>
                                            <div className='relative h-full w-screen'>
                                                <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/2ff42b178553113.64e9fc2d6ffed.jpeg' alt='photo' onClick={handleZoom}
                                                    className={`box-border mx-auto ${zoom ? 'pointer-events-none lg:pointer-events-auto lg:max-w-[inherit] max-h-[inherit] m-0' : 'max-h-screen max-w-[100vw] w-fit'} transition-all`}
                                                    sizes={`(max-width: 1920px) 100vw, 1920px`}
                                                    width={`${zoom ? window.innerWidth + 50 + 'px' : "100%"}`}
                                                    height={`${zoom ? window.innerWidth : "100%"}`}
                                                />

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>}
                </div>
            </main>
        </div>

    )
}
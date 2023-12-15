
'use client'
import { useRef, useState } from 'react'
import urlcat from 'urlcat';

import { METHOD, TYPE, TumblrBlog } from '@/server/tumblr';

import ListPost from './list-post';
import Loading from './loading';
import ScrollToTop from './scroll-to-top';
import Navbar from './navbar';


export default function MainComponent() {
    const [data, setData] = useState<TumblrBlog | null>(null)
    const [blogName, setBlogName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const ref = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setError('');
        setLoading(true);
        e.preventDefault();
        if (blogName == '') {
            setError('Please enter a blog name!')
            setLoading(false);
            return;
        };
        const url = urlcat('/api/tumblr?blog=:blogName&method=:method&type=:type',
            { blogName: blogName.toLowerCase(), method: METHOD, type: TYPE });
        const result = await fetch(url);
        if (result.status > 400) {
            setError('Blog name not found or something went wrong!');
            setData(null);
            setLoading(false);
            return;
        }
        const posts = await result.json();
        if (posts.blog?.blog?.description != null) {
            var m,
                rex = /href="(.*?)"/g,
                rex2 = /(?<=href=")[^"]*/g;
            while ((m = rex.exec(posts.blog.blog.description))) {
                if (!m[1].startsWith('https://')) {
                    m[1] = 'https://' + m[1];
                    let a = rex2.exec(posts.blog.blog.description)
                    if (a) {
                        posts.blog.blog.description = posts.blog.blog.description.replace(a[0], m[1]);
                    }
                }

            }
        }
        setData(posts.blog as TumblrBlog)
        setError('')
        setLoading(false);

    };

    const handleClear = () => {
        if (inputRef.current != null) {
            inputRef.current.focus();
        }
        setBlogName('');
    };
    return (

        <>
            <Navbar setData={setData} setBlogName={setBlogName} />
            <div className='flex flex-col justify-start items-center min-h-[calc(100vh-100px)]'>
                <div className='flex flex-col items-center mt-[10vh] w-full bg-transparent px-6 justify-start min-h-[30vh] gap-8'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold'>
                            Display your Tumblr profile from {' '}
                            <a href='https://www.tumblr.com/docs/en/api/v2' target='_blank'
                                className='underline'>Tumblr API</a>
                        </h1>
                        <h6>(hanavbara, ryokoxdd, simzart, feefal, brandirecognition...)</h6>
                    </div>
                    <form
                        ref={ref}
                        onSubmit={handleFormSubmit}
                        className='flex justify-center text-center flex-col gap-3 sm:flex-row'
                    >
                        <div className='relative flex'>
                            <input
                                type='text'
                                className={`rounded-xl pl-6 pr-10 py-4 outline-none shadow-md ${error ? 'border-red-500' : ''}
                            border hover:border-[#001935] focus:border-[#001935] transition-all`}
                                value={blogName}
                                placeholder='Enter your blog name...'
                                onChange={(e) => setBlogName(e.target.value)}
                                ref={inputRef}
                            />
                            {blogName != '' && (
                                <div
                                    className='absolute top-1/2 -translate-y-1/2 right-3 text-white 
                                    rounded-full w-fit p-1 bg-black/60 opacity-50'
                                    onClick={handleClear}
                                >
                                    <svg
                                        className="h-3 w-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="4"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <button
                            type='submit'
                            className='ml-1 text-white rounded-xl py-4 px-6 outline-none focus:outline-none shadow-md font-bold
                         bg-gradient-to-tl from-neutral-400 to-zinc-300 opacity-70 hover:scale-[0.97] transition-all'
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <main className='w-full px-[10vw] space-y-3 mb-4'>
                    {error != '' ? (
                        <h1 className='text-center text-lg font-medium mt-8'>{error}</h1>
                    ) : null}
                    {loading ? (
                        <Loading />
                    ) : (
                        data && <ListPost data={data} setData={setData} />
                    )}
                    {!loading && !error && !data && <div className="w-full block max-h-40 mx-auto">
                        <div className="w-full mx-auto animate-pulse flex flex-col justify-center items-center gap-2 mt-8 sm:mt-0">
                            <div className='w-10/12  p-2 rounded-lg bg-black/10 h-16 relative'>
                                <div className="w-12 bg-zinc-400/95 h-12 rounded-full absolute -bottom-1 mx-auto left-0 right-0">
                                </div>
                            </div>
                            <div className="w-1/2 bg-zinc-300/75 h-4 ">
                            </div>
                            <div className="w-1/3 bg-zinc-300/75 h-4 ">
                            </div>
                        </div>
                        <div className='block w-full mt-8' >
                            <div className='flex flex-row justify-center w-full gap-10' >
                                {
                                    [...Array(3)].map((_, index) => (
                                        <div className="w-full rounded-lg bg-neutral-600/5" key={index}>
                                            <div className="h-24 rounded-lg "></div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    </div>}
                </main>
                <ScrollToTop />
            </div>
        </>
    );
}
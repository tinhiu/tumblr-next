import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc';
import parse from 'html-react-parser';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { useInView } from 'react-intersection-observer';
import urlcat from 'urlcat';

import { Blog, LIMIT, METHOD, TYPE, TumblrBlog, TumblrPost } from '@/server/tumblr';

import Modal from './modal';
import Loading from './loading';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(utc)

const breakpointColumnsObj = {
    default: 4,
    3000: 5,
    2000: 5,
    1200: 4,
    1000: 3,
    700: 2,
};

type PropsType = {
    data: TumblrBlog
    setData: Dispatch<SetStateAction<TumblrBlog | null>>
}
export default function ListPost(props: PropsType) {
    const [blog, setBlog] = useState<Blog | null>(null)
    const [posts, setPosts] = useState<TumblrPost[]>([])
    const [pageNumber, setPageNumber] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)
    const [aspect, setAspect] = useState<boolean>(true)

    const { ref, inView } = useInView();

    useEffect(() => {
        setBlog(props.data.blog)
        setPosts(props.data.posts)
        if (props.data._links) {
            setPageNumber(props.data._links.next.query_params.page_number)
        } else {
            setPageNumber('')
        }
    }, [props.data])

    useEffect(() => {
        if (inView) {
            if (loading) return;
            handleLoadMore()
        }
    }, [inView]);

    const onLoadCallback = () => {
        setIsReady(true);
    };
    const handleChange = () => {
        setAspect(!aspect)
    }
    const handleLoadMore = async () => {
        setLoading(true)
        let url = ''
        if (pageNumber != '') {
            url = urlcat('/api/tumblr-next?blog=:blogName&method=:method&type=:type&limit=:limit&page_number=:page_number',
                {
                    blogName: props.data.blog.name,
                    method: METHOD,
                    type: TYPE,
                    limit: LIMIT,
                    page_number: pageNumber,
                });
        }
        if (url == '') return;
        const result = await fetch(url);
        const newPosts = await result.json();
        const data = newPosts.blog as TumblrBlog
        if (data._links) {
            setPageNumber(data._links.next.query_params.page_number)
        }
        setPosts((prev: TumblrPost[]) => [...prev, ...data.posts])
        setLoading(false);


    }
    return (
        <>
            {blog && <div className='flex flex-col justify-center items-center text-center mt-6 md:mt-0 animate-fade-in'>
                <div className='w-full flex flex-col justify-center relative space-y-5'>
                    <div className='w-full flex justify-center relative mb-8 mx-auto max-w-[90%]'>
                        <div className='relative flex h-full w-full justify-center
                                before:absolute before:h-full before:w-full before:rounded-2xl 
                                before:bg-noise before:opacity-80 before:content-[""]'>
                            <Image src={blog.theme.header_image} alt={blog.name} fill
                                className={`object-cover rounded-lg shadow-lg ${isReady ? ' bg-gray-200 blur-0' : 'blur-md'}`}
                                loading="lazy"
                                decoding="async"
                                onLoad={onLoadCallback}
                            />
                            <div className='w-32 h-32 mt-1 mb-4 p-2 relative top-10'>
                                <Image src={blog.avatar[0].url} alt={blog.name} fill
                                    style={{ backgroundColor: blog.theme.background_color }}
                                    className={`object-contain !w-fit mx-auto rounded-full shadow-sm 
                                    ${isReady ? ' bg-gray-200 blur-0' : 'blur-md'}`}
                                    loading="lazy"
                                    decoding="async"
                                    onLoad={onLoadCallback}
                                />
                            </div>

                        </div>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='font-bold text-2xl'>{blog.title}</h1>
                        <p><a href={blog.url} target='_blank'>@{blog.name}</a></p>
                        {blog.description && <p>{parse(blog.description)}</p>}
                    </div>
                </div>
            </div>}
            {posts.length > 0 && <div className='flex flex-col items-center animate-fade-in-bottom'>
                <div className='ml-auto flex'>
                    <label className="relative w-fit inline-flex justify-end items-center me-5 cursor-pointer">
                        <input type="checkbox" value="" checked={aspect} className="sr-only peer" onChange={handleChange} />
                        <div className="w-11 h-6 relative bg-gray-200 rounded-full peer 
                            peer-checked:after:translate-x-full 
                            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-transparent after:content-[''] 
                            after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 
                            after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-900">
                        </div>
                        <span className="ms-3 text-sm font-medium text-gray-900">{'</>'}</span>
                    </label>
                </div>
                <Masonry className="flex justify-center flex-wrap mt-2" breakpointCols={breakpointColumnsObj}>
                    {posts.map((post: TumblrPost, index: number) => (
                        <Modal post={post} key={index} >
                            <div className='group w-auto relative mx-1 mb-2 cursor-pointer' >
                                <div className='w-full h-full'>
                                    <figure className='relative flex h-full w-full justify-center
                                    before:absolute before:h-full before:w-full before:rounded-2xl 
                                    before:bg-noise before:opacity-80 before:content-[""]'>
                                        {
                                            post.photos.length > 0 ?
                                                <Image src={post.photos[0].original_size.url} alt={post.id.toString()}
                                                    width={0}
                                                    height={0}
                                                    sizes='100vw'
                                                    className={`w-full h-auto rounded-xl object-cover ${aspect ? 'aspect-[3/2]' : ''}
                                                transition duration-1000 ${isReady ? ' bg-gray-200 blur-0' : 'blur-sm'}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    onLoad={onLoadCallback}

                                                /> : <div className='w-20 h-20 bg-white/50'></div>
                                        }

                                    </figure>
                                </div>
                                <div className='absolute hidden text-white rounded-xl bg-black/60 
                                                top-0 left-0 right-0 bottom-0 group-hover:block transition-all'>
                                    <div className='absolute w-full left-0 top-0 p-4'>
                                        <h1 className=''>{dayjs.utc(post.date).format('MMM DD, YYYY')}</h1>
                                        {post.note_count} notes
                                    </div>
                                    <div className='hidden sm:block absolute w-full 
                                                    left-0 bottom-3 px-4 max-h-12 overflow-hidden'>
                                        {post.tags.map((tag: string, index: number) => {
                                            return <Fragment key={index}> #{tag}{' '} </Fragment>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    )
                    )}
                </Masonry >
            </div >}
            {blog?.posts == 0 && <h1 className='text-center'>No post was found!</h1>}
            {
                loading && <Loading />
            }
            {
                pageNumber != '' ? <div className="flex items-center justify-center p-4"
                    ref={ref}
                ></div> : null
            }
        </>

    )
}

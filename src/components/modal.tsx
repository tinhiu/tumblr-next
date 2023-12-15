
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import * as Dialog from '@radix-ui/react-dialog';
import parse from 'html-react-parser';

import { TYPE, TumblrPost } from '@/server/tumblr';

import Slider from './slider';

dayjs.extend(advancedFormat);

type Props = {
    children: React.ReactNode
    post: TumblrPost

}
const Modal = ({ post, children, ...props }: Props) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal >
                <Dialog.Overlay className='fixed bg-black/60 inset-0 z-10' />
                <Dialog.Content className='bg-white fixed left-1/2 top-1/2  
                -translate-y-1/2 -translate-x-1/2 w-screen max-w-lg px-8 py-4 z-10 rounded-lg'>
                    <Dialog.Close asChild>
                        <button
                            type="button"
                            className="absolute rounded-md p-4 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 top-0 right-0"
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
                    <Dialog.Title>
                        <div className='caption no-scrollbar'>
                            {post.caption ?
                                <>
                                    {parse(post.caption as string)}
                                </>
                                :
                                <>
                                    {post.type == 'photo' && post.summary.split('\n').map((x, index) => (
                                        <p key={index}>
                                            <small>{x}</small>
                                        </p>
                                    ))}
                                </>
                            }
                        </div>
                    </Dialog.Title>
                    {
                        post.type == TYPE ? (
                            <Slider photos={post.photos} />

                        ) :
                            (
                                <div className='relative w-full'>
                                    <div className='relative h-[60vh] flex flex-col overflow-x-auto overflow-scroll rounded-lg scrolly'>
                                        {parse(post.trail[0].content || post.trail[0].content_raw)}
                                    </div>
                                </div>
                            )
                    }
                    <div className='flex justify-between items-center mt-2 flex-col sm:flex-row'>
                        <i>
                            <small>
                                <a className='underline'
                                    href={post.post_url}
                                    target='_blank'
                                >
                                    Go post
                                </a>
                            </small>
                        </i>
                        <i>
                            <small>{dayjs.utc(post.date).fromNow()} on {' '}
                                <a className='underline'
                                    href={`https://${post.blog.name}.tumblr.com/day/${dayjs.utc(post.date).year()}/${dayjs.utc(post.date).month() + 1}/${dayjs.utc(post.date).date()}`}
                                    target='_blank'
                                >{dayjs.utc(post.date).format('MMM Do YYYY')}</a> with {' '}
                                <span className='font-bold'>{post.note_count}</span> notes
                            </small>
                        </i>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal;
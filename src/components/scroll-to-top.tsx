import { useEffect, useState } from 'react';

function ScrollToTop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        })
    }, [])
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className="relative">
            {" "}
            {showButton && (
                <button className='fixed bottom-10 right-2 sm:right-6 z-[9] bg-gray-300 p-1 rounded-lg' onClick={goToTop}>
                    <svg viewBox="0 0 48 48" fill='currentColor'
                        className='h-5 w-5 rotate-180 text-gray-500 hover:text-gray-500'
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z" />
                    </svg>
                </button>
            )}{" "}
        </div>
    );
}

export default ScrollToTop;
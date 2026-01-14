import gsap from 'gsap'
import { useEffect, useRef } from 'react'

const HeroSection = () => {
    const containerRef = useRef(null)
    const imageRef = useRef(null)
    const textRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

            // 1. Initial State
            gsap.set('.hero-line', { y: 100, opacity: 0 })
            gsap.set(imageRef.current, { scale: 1.4 })

            // 2. Animation Sequence
            tl.to(overlayRef.current, {
                height: 0,
                duration: 1.2,
                ease: 'expo.inOut',
            })
                .to(
                    imageRef.current,
                    {
                        scale: 1,
                        duration: 1,
                    },
                    '-=0.8',
                )
                .to(
                    '.hero-line',
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                    },
                    '-=1.5',
                )
                .to(
                    '.accent-dot',
                    {
                        scale: 1,
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'back.out(1.7)',
                    },
                    '-=0.5',
                )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-white"
        >
            {/* LEFT SIDE: Image Reveal */}
            <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen overflow-hidden">
                {/* Animated Reveal Overlay */}
                <div ref={overlayRef} className="absolute inset-0 z-20 bg-blue" />

                <img
                    ref={imageRef}
                    src="/hero.png"
                    alt="Amara Raja Hero"
                    className="w-full h-full object-cover transition-all duration-1000"
                />
            </div>

            {/* RIGHT SIDE: Typography */}
            <div
                ref={textRef}
                className="w-1/2 flex flex-col justify-center px-4 sm:px-12 md:px-20 text-right py-12"
            >
                <div className="hero-line overflow-hidden">
                    <h2 className="text-blue text-3xl sm:text-4xl lg:text-5xl mb-1 font-light tracking-tight">
                        Accelerating
                    </h2>
                </div>

                <div className="hero-line">
                    <h1
                        className="
              inline-block
              text-5xl sm:text-7xl lg:text-7xl font-black
              bg-linear-to-r
              from-green
              via-blue
              to-pink
              bg-clip-text
              text-transparent
              leading-none
              tracking-tighter
              pr-1.5
            "
                    >
                        Responsibly
                    </h1>
                </div>

                <div className="hero-line mt-4">
                    <p className="text-sm sm:text-md text-gray-500 font-medium tracking-widest uppercase">
                        Amara Raja Energy & Mobility Limited
                    </p>

                    {/* Futuristic Divider */}
                    <div className="flex justify-end items-center gap-4 mt-6">
                        <div className="h-px w-32 bg-linear-to-l from-blue to-transparent" />
                        <div className="w-2 h-2 rounded-full border border-blue" />
                    </div>
                </div>

                {/* <div className="absolute inset-0 bottom-0 bg-white/80" /> */}
                {/* Decorative background text */}
                <div className="absolute right-0 bottom-0 select-none  pointer-events-none translate-y-1/4">
                    <h3 className="text-[17vw] z-1000 font-black leading uppercase">
                        <span className="text-[#ebebeb] opacity-80 z-10  bg-clip-text  font-black inline-block">
                            ENERGY
                        </span>
                    </h3>
                </div>
            </div>

            {/* Mobile Design Polish */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .text-right {
                        text-align: center;
                        width: 100%;
                    }
                    .justify-end {
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    )
}

export default HeroSection

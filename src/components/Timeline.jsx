import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { timeline } from '../data/timelineData'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalTimeline() {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const track = trackRef.current
            const section = sectionRef.current

            // Calculate horizontal scroll distance
            const scrollWidth = track.scrollWidth
            const viewportWidth = window.innerWidth
            const scrollDistance = scrollWidth - viewportWidth

            // Horizontal scroll driven by vertical scroll
            gsap.to(track, {
                x: -scrollDistance,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${scrollWidth}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            })

            // Item reveal animation
            gsap.from('.timeline-item', {
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full  bg-white flex  flex-col overflow-hidden py-25"
        >
            <h2
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
              self-center mb-14
              text-center
            "
            >
                Timeline of Transformation
            </h2>
            {/* Horizontal Track */}
            <div
                ref={trackRef}
                className="relative flex flex-col lg:flex-row items-center lg:items-start min-w-full lg:min-w-max px-6 md:px-12 lg:px-24 py-10 lg:py-0"
            >
                {/* Line: Vertical on mobile (left-aligned), Horizontal on Desktop (top-aligned) */}
                <div className="absolute top-0 bottom-0 left-1/2 lg:left-0 lg:top-13 w-px lg:w-full h-full lg:h-px bg-gray-300 -translate-x-1/2 lg:translate-x-0" />

                {timeline.map((item, index) => (
                    <div
                        key={index}
                        className="timeline-item relative flex flex-col items-center w-full lg:w-[280px] mb-16 lg:mb-0 lg:mx-14"
                    >
                        {/* Year */}
                        <span className="mb-4 text-lg font-bold text-gray-800 bg-white px-2 z-20">
                            {item.year}
                        </span>

                        {/* Dot */}
                        <div className="relative z-20 w-5 h-5 rounded-full bg-lime-500 border-4 border-white shadow-lg" />

                        {/* Card Content */}
                        <div className="mt-6 flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:border-none lg:shadow-none lg:p-0">
                            <p className="text-sm text-gray-600 max-w-[240px] leading-relaxed ">
                                {item.text}
                            </p>

                            {/* <div className="h-px sm:h-6 bg-black/20 sm:bg-[unset] w-40 sm:w-[unset] my-3 sm:my-[unset]" /> */}
                            <div className='h-6'></div>

                            <img
                                src={item.image}
                                alt={item.year}
                                className="w-full max-w-[200px] lg:w-48 h-32 object-contain "
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

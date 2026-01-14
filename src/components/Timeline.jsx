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
            "
            >
                Timeline of Transformation
            </h2>
            {/* Horizontal Track */}
            <div ref={trackRef} className="relative flex items-start  min-w-max px-24">
                {/* Horizontal Line */}
                <div className="absolute top-13 left-0 w-full h-px bg-gray-300" />

                {timeline.map((item, index) => (
                    <div
                        key={index}
                        className="timeline-item relative flex flex-col items-center w-[280px] mx-14"
                    >
                        {/* Year */}
                        <span className="mb-4 text-lg font-semibold text-gray-800">
                            {item.year}
                        </span>

                        {/* Dot */}
                        <div className="relative z-10 w-4 h-4 rounded-full bg-lime-500 border-4 border-white shadow-md" />

                        {/* Content */}
                        <div className="mt-8 flex flex-col items-center text-center">
                            <p className="text-sm text-gray-600 max-w-[240px]">{item.text}</p>

                            <div className="h-6" />

                            <img
                                src={item.image}
                                alt={item.year}
                                className="w-48 h-28 object-contain rounded-xl"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

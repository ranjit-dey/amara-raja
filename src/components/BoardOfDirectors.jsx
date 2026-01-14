import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const BoardOfDirectors = ({ directors }) => {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slider = sliderRef.current

      const getScrollAmount = () =>
        slider.scrollWidth - window.innerWidth

      gsap.to(slider, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [directors])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden mb-20"
    >
      {/* Header */}
      <div className="relative z-10  px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl sm:text-7xl font-black leading-none tracking-tighter
          bg-linear-to-r from-green via-blue to-pink bg-clip-text text-transparent">
          Our Leadership
        </h2>
      </div>

      {/* Slider */}
      <div className="relative mt-20 flex items-center">
        <div
          ref={sliderRef}
          className="flex gap-6 md:gap-12 px-6 md:px-24 "
          style={{
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {directors.map((person, index) => (
            <div
              key={index}
              className="w-[75vw]  sm:w-[42vw] lg:w-[26vw] shrink-0"
            >
              <DirectorCard person={person} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const DirectorCard = ({ person, index }) => {
  const themeColors = [
    'var(--color-orange)',
    'var(--color-pink)',
    'var(--color-blue)',
    'var(--color-green)',
  ]
  const accentColor = themeColors[index % themeColors.length]

  return (
    <div className="group relative w-full">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl
        bg-gray-100 shadow-sm transition-all duration-500
        group-hover:shadow-xl">

        <div
          className="absolute top-0 right-0 w-12 h-12 opacity-0
            group-hover:opacity-100 transition-opacity z-10"
          style={{
            background: `linear-gradient(45deg, transparent 50%, ${accentColor} 50%)`,
          }}
        />

        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover transition-transform
            duration-700 group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="mt-4 space-y-1">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 truncate">
          {person.name}
        </h3>
        <p className="text-[10px] md:text-[11px] font-bold uppercase
          tracking-[0.2em] text-gray-400">
          {person.designation}
        </p>
      </div>
    </div>
  )
}

export default BoardOfDirectors

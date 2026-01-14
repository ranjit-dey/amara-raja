import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const BoardOfDirectors = ({ directors }) => {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)

  useEffect(() => {
    // Only run GSAP on Large Screens (992px+)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const slider = sliderRef.current
      const getScrollAmount = () => slider.scrollWidth - window.innerWidth

      gsap.to(slider, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, [directors]);

  // Mobile Button Controls
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full bg-white overflow-hidden py-10 lg:py-20">
      <div className="relative z-10 px-6 max-w-7xl mx-auto flex justify-between items-end">
        <h2 className="text-5xl sm:text-7xl font-black leading-none tracking-tighter
          bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">
          Our Leadership
        </h2>

        {/* Mobile Navigation Buttons - Only visible on small screens */}
        <div className="flex gap-2 lg:hidden mb-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm active:scale-90 transition-transform"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-sm active:scale-90 transition-transform"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative mt-12 lg:mt-20 flex items-center">
        <div
          ref={sliderRef}
          className="flex gap-6 md:gap-12 px-6 md:px-24 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:overflow-visible"
          style={{
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {directors.map((person, index) => (
            <div
              key={index}
              className="w-[80vw] sm:w-[45vw] lg:w-[26vw] shrink-0 snap-center"
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

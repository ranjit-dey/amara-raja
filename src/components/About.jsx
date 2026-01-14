import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    {
        label: 'Companies',
        value: 6,
        suffix: '',
        color: 'var(--color-green)',
        desc: 'A unified ecosystem driving industrial excellence.',
    },
    {
        label: 'Businesses',
        value: 17,
        suffix: '',
        color: 'var(--color-orange)',
        desc: 'Strategic operations across diverse global markets.',
    },
    {
        label: 'People',
        value: 21814,
        suffix: '+',
        color: 'var(--color-pink)',
        desc: 'Our workforce is the heart of our sustained legacy.',
    },
    {
        label: 'Revenue',
        value: 2,
        prefix: '$',
        suffix: ' Bn',
        color: 'var(--color-blue)',
        desc: 'Robust financial performance across all sectors.',
    },
]

const About = () => {
    const containerRef = useRef(null)

    useEffect(() => {
        let ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add('(min-width: 1024px)', () => {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    pin: '.left-panel',
                    pinSpacing: false,
                })

                stats.forEach((_, i) => {
                    gsap.from(`.stat-content-${i}`, {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: `.stat-block-${i}`,
                            start: 'top 60%',
                            toggleActions: 'play none none reverse',
                        },
                    })
                })
            })

            mm.add('(max-width: 1023px)', () => {
                gsap.utils.toArray('.stat-block-mobile').forEach((block) => {
                    gsap.from(block, {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: block,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                    })
                })
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative bg-[var(--color-white)] border-t border-gray-100"
        >
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Panel */}
                <div className="left-panel lg:w-1/2 h-fit lg:h-screen flex flex-col justify-center px-6 py-16 md:px-12 lg:px-24 bg-[var(--color-white)] lg:border-r border-gray-100">
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-[10px] md:text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">
                            Establishment
                        </h2>
                        <h1 className="text-5xl md:text-7xl lg:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter">
                            About <br />
                            <span
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
                                Amara Raja
                            </span>
                        </h1>
                        {/* Divider using Deep Red from theme */}
                        <div
                            className="h-1.5 w-20 bg-linear-to-r
              from-green
              via-blue
              to-pink my-4"
                        />
                        <p className="max-w-md text-base md:text-xl text-gray-500 font-light leading-relaxed pt-2">
                            Founded by{' '}
                            <span className="text-gray-900 font-bold">Dr Ramachandra N Galla</span>,
                            we are a <span className="font-bold text-deep-red">USD 2 Billion</span>{' '}
                            conglomerate anchored by excellence.
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="lg:w-1/2">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className={`stat-block-${index} stat-block-mobile h-[60vh] lg:h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 border-b border-gray-50`}
                            style={{
                                backgroundColor: `color-mix(in srgb, ${item.color} 10%, transparent)`,
                            }}
                        >
                            <div className={`stat-content-${index} space-y-4 md:space-y-6`}>
                                <div
                                    className="w-16 h-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">
                                    {item.label}
                                </h3>
                                {/* Applied the dynamic theme color to the value itself for visibility */}
                                <h4
                                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter"
                                    style={{ color: item.color }}
                                >
                                    {item.prefix}
                                    {item.value}
                                    {item.suffix}
                                </h4>
                                <p className="max-w-xs text-base md:text-lg text-gray-500 font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Watermark using Deep Red */}
            <div className="hidden lg:block absolute bottom-12 left-24">
                <span className="text-xs font-black tracking-widest  text-deep-red">
                    SINCE 1985
                </span>
            </div>
        </section>
    )
}

export default About

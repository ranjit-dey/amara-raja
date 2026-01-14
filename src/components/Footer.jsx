import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
    const footerRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current.children, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                },
                y: 32,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
            })
        }, footerRef)

        return () => ctx.revert()
    }, [])

    return (
        <footer
            ref={footerRef}
            className="relative bg-white text-gray-700 border-t border-gray-100"
        >
            {/* Top content */}
            <div
                ref={contentRef}
                className="mx-auto max-w-7xl px-6 py-5
                   flex flex-col gap-10
                   md:flex-row md:items-center md:justify-between"
            >
                {/* Logo */}
                <div
                    className="flex items-center justify-center sm:justify-start gap-4 cursor-pointer"
                    onClick={() => window.open('/')}
                >
                    <img src="/logo.png" alt="Amara Raja" className="w-40 object-contain" />
                </div>

                {/* Copyright */}
                <p className="text-center md:text-left text-sm font-light tracking-wide text-gray-500">
                    © 2026 <span className="font-medium text-gray-900">Amara Raja Group</span>. All
                    rights reserved.
                </p>

                {/* Partner */}
                <div
                    className="flex items-center justify-center md:justify-end gap-2 cursor-pointer"
                    onClick={() => window.open('https://kalolwala.com')}
                >
                    <span className="text-sm text-gray-400">Powered by</span>
                    <div className='bg-black pl-3 px-2 py-2 rounded-full '>
                        <img src="/ka-logo.png" alt="OKA" className="h-6  w-auto " />
                    </div>
                    <span className="font-bold" style={{ color: 'var(--color-orange)' }}>
                        ↗
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-auto max-w-7xl h-px bg-gray-100" />

            {/* Bottom */}
            <div className="py-7 text-center">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="group inline-flex items-center gap-3
                     text-xs uppercase tracking-[0.25em]
                     text-gray-400 hover:text-gray-900
                     transition-colors"
                >
                    <span
                        className="text-base transition-transform group-hover:-translate-y-1"
                        style={{ color: 'var(--color-blue)' }}
                    >
                        ↑
                    </span>
                    Back to Top
                </button>
            </div>
        </footer>
    )
}

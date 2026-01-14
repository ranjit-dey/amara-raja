import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { useEffect, useMemo, useRef, useState } from 'react'

gsap.registerPlugin(ScrollToPlugin)

const performanceHighlights = [
    {
        category: 'Financial Strength and Disciplined Growth',
        icon: '/financial.png',
        accent: 'var(--color-green)',
        items: [
            {
                title: '₹ 12,846 Cr',
                subtitle: 'Revenue from Operations in FY 2025',
                metric: '9.7%',
                metricLabel: 'YoY Growth',
            },
            {
                title: '₹ 1,812 Cr',
                subtitle: 'EBITDA reflecting resilient operations',
                metric: '14.1%',
                metricLabel: 'EBITDA Margin',
            },
            {
                title: '₹ 945 Cr',
                subtitle: 'PAT – Stable profitability & margins',
                metric: '7.4%',
                metricLabel: 'PAT Margin',
            },
            {
                title: '16.2% ROCE',
                subtitle: 'Strong capital efficiency with minimal debt',
                metric: '13.3%',
                metricLabel: 'ROE Margin',
            },
            {
                title: '~12% CAGR',
                subtitle: '10 Year Revenue',
            },
        ],
    },
    {
        category: 'Operational Efficiency',
        icon: '/efficiency.png',
        accent: 'var(--color-blue)',
        items: [
            {
                title: '65+ million units',
                subtitle: 'Annualised automotive battery capacity',
            },
            {
                title: 'Enhanced Production',
                subtitle: 'Through throughput gains',
            },
            {
                title: '₹ 1,200 Cr',
                subtitle: 'Capex focused on long-term capability',
            },
        ],
    },
    {
        category: 'Future-ready Energy',
        icon: '/investment.png',
        accent: 'var(--color-orange)',
        items: [
            {
                title: 'Fully Operational',
                subtitle: 'Lithium battery pack plants (Mobility & Stationary)',
            },
            {
                title: '16 GWh Giga-cell',
                subtitle: 'Factory construction underway (Phase 1: 2 GWh)',
            },
            {
                title: 'In-house developed',
                subtitle: '21700 cylindrical cell (NMC 811)',
            },
            {
                title: 'New e+ Energy Labs',
                subtitle: 'and Customer Qualification Plant progressing on schedule'
            }
        ],
    },
    {
        category: 'Sustainability',
        icon: '/sustainability.png',
        accent: 'var(--color-pink)',
        items: [
            {
                title: '67 MW',
                subtitle: 'Renewable Energy Capacity',
            },
            {
                title: 'CDP B',
                subtitle: 'Rating for Climate Change',
            },
            {
                title: '11.94x',
                subtitle: 'Water Positive',
            },
            {
                title: '69',
                subtitle: 'NSE ESG Rating'
            },
            {
                title: 'S&P CSA #74',
                subtitle: 'Ranked #1 in India in sector',
            },
        ],
    },
]

export default function PerformanceDashboard() {
    const [activeTab, setActiveTab] = useState(performanceHighlights[0].category)
    const containerRef = useRef(null)
    const gridAnchorRef = useRef(null)

    const activeData = useMemo(
        () => performanceHighlights.find((h) => h.category === activeTab),
        [activeTab],
    )

    // 1. Handle Scroll and Animation on Tab Change
    const handleTabChange = (category) => {
        if (category === activeTab) return

        // Scroll to the top of the grid section
        const yOffset = -300 // Adjust based on your sticky nav height
        const element = gridAnchorRef.current
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({ top: y, behavior: 'smooth' })
        setActiveTab(category)
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main entry animation for the whole grid
            gsap.fromTo(
                '.bento-card',
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'expo.out',
                    clearProps: 'all', // Prevents issues with hover transforms
                },
            )

            // Animate internal text elements for extra polish
            gsap.fromTo(
                '.card-content-inner',
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, delay: 0.2 },
            )
        }, containerRef)

        return () => ctx.revert()
    }, [activeTab])

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-blue/10 text-[#1a1a1a] p-6 md:p-12 selection:bg-black selection:text-white flex flex-col"
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
              p-2
              tracking-tighter
              self-center mb-14
            "
            >
                Accelerating Responsibly
            </h2>
            <div className="max-w-7xl mx-auto flex flex-col">
                {/* REFINED NAVIGATION */}
                <nav className=" mx-auto mb-8 ">
                    <div className="w-full border border-blue/20 rounded-xl lg:rounded-full p-2 flex flex-col lg:flex-row">
                        {performanceHighlights.map((tab) => (
                            <button
                                key={tab.category}
                                onClick={() => handleTabChange(tab.category)}
                                className={`px-5 py-2.5 rounded-md lg:rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                                    activeTab === tab.category
                                        ? 'bg-blue text-white shadow-lg'
                                        : 'text-gray-400 hover:text-blue hover:bg-gray-50'
                                }`}
                            >
                                {tab.category}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* GRID ANCHOR POINT */}
                <div ref={gridAnchorRef} className="invisible h-0" />

                {/* BENTO GRID LAYOUT */}
                <main>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
                        {/* LEFT SPOTLIGHT CARD */}
                        <div className="bento-card lg:col-span-5 relative overflow-hidden rounded-[40px] border border-gray-100 bg-white p-12 shadow-2xl shadow-gray-200/30 flex flex-col justify-between group">
                            {/* Theme Accent Bar */}
                            <div
                                className="absolute top-0 left-0 w-full h-3"
                                style={{ backgroundColor: activeData.accent }}
                            />

                            <div className="card-content-inner">
                                <div className="mb-10 w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden shadow-inner">
                                    <img
                                        className="h-8 w-8 object-contain"
                                        src={activeData.icon}
                                        alt=""
                                    />
                                </div>
                                <h2 className="text-5xl font-black tracking-tighter leading-[0.9] mb-6">
                                    {activeData.category}
                                </h2>
                                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] border-l-2 border-gray-100 pl-4">
                                    Strategic Highlights <br /> Year 2025
                                </p>
                            </div>

                            <div className="mt-20 flex items-end justify-between">
                                <div className="text-8xl font-black tracking-tighter text-gray-100 select-none">
                                    '25
                                </div>
                                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 cursor-pointer">
                                    →
                                </div>
                            </div>
                        </div>

                        {/* RIGHT DETAIL GRID */}
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {activeData.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`bento-card group border border-gray-100 bg-white p-10 rounded-[40px] transition-all duration-700 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-2 flex flex-col justify-between ${
                                        idx === 0 && activeData.items.length % 2 !== 0
                                            ? 'md:col-span-2'
                                            : ''
                                    }`}
                                >
                                    <div className="card-content-inner">
                                        {item.metric && (
                                            <div className="flex items-center gap-3 mb-6">
                                                <div
                                                    className="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-white shadow-sm"
                                                    style={{ backgroundColor: activeData.accent }}
                                                >
                                                    {item.metric}
                                                </div>
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">
                                                    {item.metricLabel}
                                                </span>
                                            </div>
                                        )}
                                        <h3 className="text-3xl font-black tracking-tighter mb-4 leading-tight group-hover:text-black">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                            {item.subtitle}
                                        </p>
                                    </div>

                                    {/* Hover Indicator */}
                                    <div
                                        className="h-1 w-0 group-hover:w-full mt-8 transition-all duration-500 rounded-full"
                                        style={{ backgroundColor: activeData.accent }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

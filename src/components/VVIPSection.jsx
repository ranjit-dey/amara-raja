const vvipList = [
    {
        image: '/jayadev.png',
        name: 'Jayadev Galla',
        designation: 'Chairman & Managing Director',
        speech: 'As I reflect on another transformative year at Amara Raja Energy & Mobility, I am filled with both pride in our achievements and excitement for the journey ahead. In the fiscal year 2024-25,through the Amara Raja Way, we truly embodied our theme of Accelerating Responsibly by pursuing ambitious growth, steadfastly committing to sustainability, innovation, and creating value for all stakeholders.',
        color: 'var(--color-blue)',
    },
    {
        image: '/harshavardhana.png',
        name: 'Harshavardhana Gourineni',
        designation: 'Executive Director- Automotive and Industrial',
        speech: 'As I reflect on FY 2024-25, I am struck by a defining theme: Accelerating Responsibly. In a world racing toward the new, we deliberately chose to ask ourselves a fundamental question—how do we make what already works, exceptional for the future? This year, we found our answer through strategic evolution, operational excellence and unswerving commitment to sustainable growth.',
        color: 'var(--color-green)',
    },
    {
        image: '/vikramadithya.png',
        name: 'Vikramadithya Gourineni',
        designation: 'Executive Director- New Energy Business',
        speech: 'It gives me great pleasure to share my thoughts at the close of yet another milestone year for Amara Raja Energy & Mobility. If I were to capture the essence of this year in one word, it would be execution.',
        color: 'var(--color-orange)',
    },
]

const VVIPSection = () => {
    return (
        <div className="bg-white  px-6 flex flex-col items-center">
            {/* Section Header */}
            <div className="text-center mb-24">
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

            "
                >
                    Leadership Vision
                </h2>
            </div>

            <div className="relative w-full max-w-6xl">
                {vvipList.map((person, index) => (
                    <div
                        key={index}
                        className="sticky top-28 mb-32 w-full group"
                        style={{
                            paddingTop: `${index * 40}px`,
                            zIndex: index,
                        }}
                    >
                        {/* Main Card Container */}
                        <div className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">
                            {/* Subtle Themed Glow in corner */}
                            <div
                                className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-25"
                                style={{ backgroundColor: person.color }}
                            />

                            <div className="flex flex-col md:flex-row items-center gap-10 p-10 md:p-16">
                                {/* Image Section - Fixed Rotation Logic */}
                                <div className="relative w-56 h-56 md:w-72 md:h-72 flex-shrink-0 flex items-center justify-center">
                                    <div
                                        className="w-full h-full relative z-10 overflow-hidden rounded-2xl"
                                        style={{ border: `4px solid ${person.color}` }}
                                    >
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col space-y-6 flex-1 text-center md:text-left">
                                    <div>
                                        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                                            {person.name}
                                        </h3>
                                        <p
                                            className="text-sm font-mono uppercase tracking-[0.25em] mt-2 font-bold"
                                            style={{ color: person.color }}
                                        >
                                            {person.designation}
                                        </p>
                                    </div>

                                    <div className="relative">
                                        {/* Themed Quote mark */}
                                        <span
                                            className="absolute -top-10 -left-6 text-8xl opacity-10 font-serif leading-none"
                                            style={{ color: person.color }}
                                        >
                                            “
                                        </span>
                                        <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-medium relative z-10">
                                            {person.speech}
                                        </p>
                                    </div>

                                    {/* Futuristic UI Element */}
                                    <div className="flex items-center gap-4 pt-4">
                                        <div
                                            className="w-12 h-1 rounded-full"
                                            style={{ backgroundColor: person.color }}
                                        ></div>
                                        <div className="h-[1px] flex-1 bg-slate-100"></div>
                                        <span className="text-[10px] font-black text-slate-300 tracking-[0.4em] uppercase">
                                            Section 0{index + 1}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VVIPSection

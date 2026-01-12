import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Companies", value: 6, suffix: "", color: "var(--color-green)", desc: "A unified ecosystem driving industrial excellence." },
  { label: "Businesses", value: 17, suffix: "", color: "var(--color-orange)", desc: "Strategic operations across diverse global markets." },
  { label: "People", value: 21814, suffix: "+", color: "var(--color-pink)", desc: "Our workforce is the heart of our sustained legacy." },
  { label: "Revenue", value: 2, prefix: "$", suffix: " Bn", color: "var(--color-blue)", desc: "Robust financial performance across all sectors." },
];

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create a MatchMedia to handle desktop-only pinning
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop: Pinning Logic
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".left-panel",
          pinSpacing: false,
        });

        // Staggered Entrance for right-side content
        stats.forEach((_, i) => {
          gsap.from(`.stat-content-${i}`, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: `.stat-block-${i}`,
              start: "top 60%",
              toggleActions: "play none none reverse",
            }
          });
        });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile: Simple fade-in animations as the user scrolls
        gsap.utils.toArray(".stat-block-mobile").forEach((block) => {
          gsap.from(block, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-white border-t border-gray-100">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Left Panel: The Anchor (Desktop Sticky / Mobile Header) */}
        <div className="left-panel lg:w-1/2 h-fit lg:h-screen flex flex-col justify-center px-6 py-16 md:px-12 lg:px-24 bg-white lg:border-r border-gray-100">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-[10px] md:text-sm font-bold tracking-[0.4em] text-gray-400 uppercase">
              Establishment
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">
              About <br />
              <span className="text-gray-300">Amara Raja</span>
            </h1>
            <div className="h-1 w-20 bg-blue-600 lg:hidden my-4" /> {/* Visual separator for mobile */}
            <p className="max-w-md text-base md:text-xl text-gray-500 font-light leading-relaxed pt-2">
              Founded by <span className="text-gray-900 font-medium">Dr Ramachandra N Galla</span>,
              we are a USD 2 Billion conglomerate anchored by excellence.
            </p>
          </div>
        </div>

        {/* Right Panel: The Data Stream */}
        <div className="lg:w-1/2">
          {stats.map((item, index) => (
            <div
              key={index}
              // Using two different classes for GSAP targeting (Desktop vs Mobile)
              className={`stat-block-${index} stat-block-mobile h-[60vh] lg:h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 border-b border-gray-50`}
            >
              <div className={`stat-content-${index} space-y-4 md:space-y-6`}>
                <div
                  className="w-12 md:w-16 h-1 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-400">
                  {item.label}
                </h3>
                <h4 className="text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter">
                  {item.prefix}{item.value}{item.suffix}
                </h4>
                <p className="max-w-xs text-base md:text-lg text-gray-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Absolute watermark - Desktop only */}
      <div className="hidden lg:block absolute bottom-12 left-24">
         <span className="text-xs font-black tracking-widest text-gray-200">SINCE 1985</span>
      </div>
    </section>
  );
};

export default About;

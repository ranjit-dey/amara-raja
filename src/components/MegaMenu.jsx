import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MegaMenu({ open, onClose }) {
  const menuRef = useRef(null)

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 bg-white">
      <div ref={menuRef} className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex justify-between mb-10">
          <h2 className="text-2xl font-semibold">Explore the Report</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-10 text-sm">

          {/* Corporate */}
          <Section
            title="Corporate Portrait"
            color="var(--color-green)"
            items={[
              'Accelerating Responsibly',
              'Vision, Values & Purpose',
              'Accelerating Worldwide'
            ]}
          />

          {/* Strategy */}
          <Section
            title="Macro & Strategy"
            color="var(--color-orange)"
            items={[
              'Management Discussion & Analysis',
              'Automotive Battery Business',
              'Industrial Battery Business',
              'New Energy Business'
            ]}
          />

          {/* Leadership */}
          <Section
            title="Leadership Messages"
            color="var(--color-pink)"
            items={[
              'Value Enhancement Journey',
              'Chairman & MD’s Communique',
              'ED – Automotive & Industrial',
              'ED – New Energy'
            ]}
          />

          {/* Governance */}
          <Section
            title="Governance & ESG"
            color="var(--color-blue)"
            items={[
              'Net Zero Journey',
              'ESG',
              'Stakeholder Engagement',
              'Risk Management',
              'Board of Directors'
            ]}
          />

          {/* Value Model */}
          <Section
            title="Value Creation Model"
            color="var(--color-green)"
            items={[
              'Financial Capital',
              'Manufactured Capital',
              'Human Capital',
              'Natural Capital',
              'Social & Relationship Capital'
            ]}
          />

          {/* Reports */}
          <Section
            title="Reports & Disclosures"
            color="var(--color-blue)"
            items={[
              'Board’s Report',
              'Corporate Governance Report',
              'BRSR',
              'Assurance Report'
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function Section({ title, items, color }) {
  return (
    <div>
      <h3
        className="font-semibold mb-4"
        style={{ color }}
      >
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item}
            className="text-gray-600 hover:text-black cursor-pointer transition"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

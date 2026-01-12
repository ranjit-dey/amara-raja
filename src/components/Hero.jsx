const Hero = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-between">

      {/* Image */}
      <div
        className="
          min-h-screen
          w-1/2
          bg-[url('/hero.png')]
          bg-contain
          bg-center
          bg-no-repeat
        "
      />

      {/* Text */}
      <div
        className="
          w-1/2
          flex flex-col justify-center
          px-4 sm:px-12
          text-right
        "
      >
        <h1 className="text-[color:var(--color-blue)] text-3xl sm:text-4xl mb-1">
          Accelerating
        </h1>

        <h1
          className="
            inline-block
            text-4xl sm:text-6xl font-bold
            bg-linear-to-r
            from-[color:var(--color-green)]
            to-[color:var(--color-blue)]
            bg-clip-text
            text-transparent
          "
        >
          Responsibly
        </h1>

        <p className="text-sm sm:text-md text-gray-600 mt-2">
          Amara Raja Energy & Mobility Limited
        </p>
      </div>

    </section>
  )
}

export default Hero

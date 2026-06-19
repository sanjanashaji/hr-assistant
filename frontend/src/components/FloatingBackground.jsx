function FloatingBackground() {

  return (
    <>

      <div
        className="
          absolute
          top-10
          right-10
          w-96
          h-96
          rounded-full
          bg-cyan-500
          blur-[140px]
          opacity-[0.07]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-10
          left-20
          w-80
          h-80
          rounded-full
          bg-blue-600
          blur-[140px]
          opacity-[0.07]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-indigo-600
          blur-[180px]
          opacity-[0.04]
          pointer-events-none
        "
      />

    </>
  );

}

export default FloatingBackground;

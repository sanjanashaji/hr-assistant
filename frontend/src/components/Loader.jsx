function Loader() {

  return (

    <div className="flex justify-start mb-4">

      <div className="glass rounded-2xl rounded-bl-md px-5 py-4 flex gap-1.5 items-center">

        <div className="
          w-2
          h-2
          rounded-full
          bg-cyan-400
          animate-bounce
        " />

        <div className="
          w-2
          h-2
          rounded-full
          bg-cyan-400
          animate-bounce
          [animation-delay:0.15s]
        " />

        <div className="
          w-2
          h-2
          rounded-full
          bg-cyan-400
          animate-bounce
          [animation-delay:0.3s]
        " />

      </div>

    </div>

  );

}

export default Loader;

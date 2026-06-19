const prompts = [

{
title:"Employee Details",
description:"View employee profile",
query:"details of Rahul Sharma 118"
},

{
title:"Manager Lookup",
description:"Find reporting manager",
query:"manager of Rahul Sharma 118"
},

{
title:"Work-Life Balance",
description:"View HR policy",
query:"What is the work life balance policy?"
},

{
title:"Promotion Policy",
description:"View promotion process",
query:"How does promotion policy work?"
},

{
title:"Top Performer",
description:"Employee insights",
query:"details of Rahul Sharma 118"
},

{
title:"Training Policy",
description:"Learning & Development",
query:"What are the training policies?"
}

];

function SuggestedPrompts({
  onPromptClick
}) {

  return (

    <div
      className="
        grid
        grid-cols-4
        gap-4
        mb-6
      "
    >

      {prompts.map(
        prompt => (

          <button
            key={prompt.title}
            onClick={() =>
              onPromptClick(
                prompt.query
              )
            }
            className="
              glass
              rounded-3xl
              p-5
              text-left

              hover:shadow-xl
              hover:shadow-cyan-500/20
              hover:-translate-y-1

              transition-all
              duration-300
            "
          >

            <h3
              className="
                text-lg
                font-bold
              "
            >
              {prompt.title}
            </h3>

            <p
              className="
                mt-2
                text-sm
                text-slate-400
              "
            >
              {prompt.description}
            </p>

          </button>

        )
      )}

    </div>

  );

}

export default SuggestedPrompts;
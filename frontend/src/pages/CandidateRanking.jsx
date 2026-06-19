import { useState } from "react";
import axios from "axios";

function CandidateRanking() {

  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState([]);

  const fetchRanking = async () => {

    const res = await axios.get(
      `http://127.0.0.1:5000/candidate-ranking/${jobId}`
    );

    setResult(res.data);
  };

  return (

    <div className="p-6 text-white">

      <h2 className="text-3xl mb-6">
        Candidate Ranking
      </h2>

      <input
        className="p-2 text-black"
        placeholder="JOB001"
        value={jobId}
        onChange={(e)=>
          setJobId(e.target.value)
        }
      />

      <button
        onClick={fetchRanking}
        className="
          ml-2
          px-4
          py-2
          bg-cyan-500
        "
      >
        Rank Candidates
      </button>

      <div className="mt-6">

        {result.map((candidate,index)=>(
          <div
            key={index}
            className="
              p-3
              bg-slate-800
              rounded
              mb-2
            "
          >
            {candidate.name}
          </div>
        ))}

      </div>

    </div>

  );
}

export default CandidateRanking;
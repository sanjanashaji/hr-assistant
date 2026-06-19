import { useState, useRef } from "react";
import axios from "axios";
import {
  FaUpload,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaTrophy,
  FaBriefcase
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:5000";

function ResumeScreening() {

  const [mode, setMode] = useState("upload");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requiredExperience, setRequiredExperience] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [lookupId, setLookupId] = useState("");
  const [lookupResult, setLookupResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (selected) => {
    setFiles(Array.from(selected));
  };

  const screenResumes = async () => {

    if (!files.length) {
      setError("Please upload at least one resume.");
      return;
    }

    if (!jobTitle.trim() || !requiredSkills.trim()) {
      setError("Job title and required skills are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();

    files.forEach(file => {
      formData.append("resumes", file);
    });

    formData.append("job_title", jobTitle);
    formData.append("job_description", jobDescription);
    formData.append("required_experience", requiredExperience || "0");
    formData.append("required_skills", requiredSkills);

    try {

      const response = await axios.post(
        `${API_BASE}/resume/screen`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Resume screening failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  const lookupCandidate = async () => {

    if (!lookupId.trim()) {
      setError("Please enter a candidate ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setLookupResult(null);

    try {

      const response = await axios.get(
        `${API_BASE}/resume/${lookupId.trim()}`
      );

      setLookupResult(response.data);

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Candidate not found."
      );

    } finally {

      setLoading(false);

    }

  };

  const fillSampleJob = () => {
    setJobTitle("Software Engineer");
    setJobDescription(
      "Build and maintain HR analytics web applications using React and Flask. " +
      "Deploy services with Docker and Azure. Collaborate with cross-functional teams."
    );
    setRequiredExperience("3");
    setRequiredSkills("React, Python, Flask, SQL, Docker, Java, Spring Boot");
  };

  return (

    <div className="page-panel animate-fade-in">

      <div className="mb-6">
        <h1 className="page-title">Resume Screening</h1>
        <p className="page-description">
          Upload resumes, define job requirements, and get ranked match scores with eligibility predictions
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode("upload"); setError(null); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            mode === "upload"
              ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
              : "text-slate-400 hover:bg-slate-800/60"
          }`}
        >
          <FaUpload className="inline mr-2" />
          Upload & Match
        </button>
        <button
          onClick={() => { setMode("lookup"); setError(null); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            mode === "lookup"
              ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
              : "text-slate-400 hover:bg-slate-800/60"
          }`}
        >
          <FaSearch className="inline mr-2" />
          Database Lookup
        </button>
      </div>

      {error && (
        <div className="result-panel border-red-500/30 mb-6">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {mode === "upload" && (

        <div className="space-y-6">

          <div className="flex justify-end">
            <button onClick={fillSampleJob} className="text-xs text-cyan-400 hover:text-cyan-300">
              Fill sample job requirements
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="space-y-4">
              <input
                className="input-field"
                placeholder="Job Title (e.g. Software Engineer)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />

              <textarea
                className="input-field h-28 py-3 resize-none"
                placeholder="Job Description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              <input
                className="input-field"
                type="number"
                min="0"
                step="0.5"
                placeholder="Required Experience (years)"
                value={requiredExperience}
                onChange={(e) => setRequiredExperience(e.target.value)}
              />

              <textarea
                className="input-field h-20 py-3 resize-none"
                placeholder="Required Skills (comma separated, e.g. React, Python, SQL)"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
              />
            </div>

            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
                className="glass rounded-2xl border-2 border-dashed border-slate-600 hover:border-cyan-500/50 p-8 text-center cursor-pointer transition-all h-full flex flex-col items-center justify-center min-h-[220px]"
              >
                <FaUpload className="text-3xl text-cyan-400/60 mb-3" />
                <p className="text-sm text-white font-medium">
                  Drop resumes here or click to upload
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PDF or TXT · Multiple files supported
                </p>
                {files.length > 0 && (
                  <div className="mt-4 space-y-1">
                    {files.map(f => (
                      <p key={f.name} className="text-xs text-cyan-400">{f.name}</p>
                    ))}
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.txt,.md"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />

              <p className="text-xs text-slate-500 mt-3">
                Try sample resumes from{" "}
                <a href="/sample_resumes/alice_johnson_resume.txt" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                  /sample_resumes/
                </a>
              </p>
            </div>

          </div>

          <button
            onClick={screenResumes}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Screening..." : "Screen & Rank Candidates"}
          </button>

          {result && (

            <div className="animate-slide-up space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat-card">
                  <p className="stat-label">Job Title</p>
                  <p className="text-lg font-bold text-white mt-1">{result.job_title}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Candidates Screened</p>
                  <p className="stat-value">{result.total_candidates}</p>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Eligible</p>
                  <p className="stat-value text-emerald-400">{result.eligible_count}</p>
                </div>
              </div>

              <div className="space-y-4">
                {result.candidates.map(candidate => (
                  <div
                    key={candidate.filename}
                    className={`glass rounded-2xl p-5 border ${
                      candidate.eligible
                        ? "border-emerald-500/30"
                        : "border-slate-700/50"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">

                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                          candidate.rank === 1
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          #{candidate.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-white">{candidate.candidate_name}</p>
                            {candidate.rank === 1 && (
                              <FaTrophy className="text-amber-400 text-sm" />
                            )}
                            {candidate.eligible ? (
                              <span className="badge-success">
                                <FaCheckCircle className="mr-1" /> Eligible
                              </span>
                            ) : (
                              <span className="badge-warning">
                                <FaTimesCircle className="mr-1" /> Not Eligible
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{candidate.filename}</p>
                          <p className="text-sm text-slate-400 mt-2">
                            Experience: {candidate.experience_years} yrs
                            {result.required_experience > 0 && (
                              <span className={candidate.experience_met ? " text-emerald-400" : " text-amber-400"}>
                                {" "}/ {result.required_experience} yrs required
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-3xl font-bold text-cyan-400">{candidate.match_score}%</p>
                        <p className="text-xs text-slate-500">Match Score</p>
                        <div className="flex gap-2 mt-2 text-[10px] text-slate-500 justify-end">
                          <span>Skills: {candidate.skills_score}</span>
                          <span>Exp: {candidate.experience_score}</span>
                          <span>Desc: {candidate.description_score}</span>
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-700/40">

                      <div>
                        <p className="text-xs font-semibold text-emerald-400 mb-2">Matched Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.matched_skills.length ? candidate.matched_skills.map(skill => (
                            <span key={skill} className="badge-success text-[10px]">{skill}</span>
                          )) : (
                            <span className="text-xs text-slate-500">None</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-amber-400 mb-2">Missing Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.missing_skills.length ? candidate.missing_skills.map(skill => (
                            <span key={skill} className="badge-warning text-[10px]">{skill}</span>
                          )) : (
                            <span className="text-xs text-slate-500">None</span>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

            </div>

          )}

        </div>

      )}

      {mode === "lookup" && (

        <div className="space-y-6">

          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              className="input-field"
              placeholder="Candidate ID (e.g. CAND001)"
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value)}
            />
            <button
              className="btn-primary shrink-0"
              onClick={lookupCandidate}
              disabled={loading}
            >
              <FaSearch className="text-sm" />
              {loading ? "Searching..." : "Lookup"}
            </button>
          </div>

          {lookupResult && (
            <div className="result-panel animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold text-white text-lg">{lookupResult.candidate_name}</p>
                  <p className="text-sm text-slate-400">{lookupResult.candidate_id}</p>
                </div>
                {lookupResult.eligible ? (
                  <span className="badge-success"><FaCheckCircle className="mr-1" /> Eligible</span>
                ) : (
                  <span className="badge-warning"><FaTimesCircle className="mr-1" /> Not Eligible</span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass rounded-xl p-4">
                  <FaBriefcase className="text-cyan-400/70 mb-2" />
                  <p className="stat-label">Recommended Role</p>
                  <p className="text-white font-semibold mt-1">{lookupResult.recommended_role}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="stat-label">Match Score</p>
                  <p className="text-2xl font-bold text-cyan-400 mt-1">{lookupResult.match_score}%</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="stat-label">Experience</p>
                  <p className="text-white font-semibold mt-1">{lookupResult.experience_years} years</p>
                </div>
              </div>
              {lookupResult.missing_skills?.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-amber-400 mb-2">Missing Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lookupResult.missing_skills.map(s => (
                      <span key={s} className="badge-warning text-[10px]">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      )}

    </div>

  );

}

export default ResumeScreening;

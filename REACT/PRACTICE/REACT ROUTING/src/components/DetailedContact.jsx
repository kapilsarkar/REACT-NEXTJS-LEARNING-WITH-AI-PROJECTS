import { useParams, useNavigate } from "react-router-dom";

const DetailedContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-indigo-500/20 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Contact Details
          </span>
          <h2 className="text-2xl font-bold text-white capitalize">
            Contact ID: <span className="text-indigo-400">{id}</span>
          </h2>
        </div>
        <button
          onClick={() => navigate("/contact")}
          className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
        >
          ← Back to Contacts
        </button>
      </div>

      <div className="space-y-3 text-slate-300 text-sm">
        <p>
          Viewing dynamic route details for item parameter:{" "}
          <code className="bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono">
            {id}
          </code>
        </p>
      </div>
    </div>
  );
};

export default DetailedContact;
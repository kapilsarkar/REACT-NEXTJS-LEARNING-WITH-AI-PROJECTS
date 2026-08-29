
import { Link } from "react-router-dom";

const NewUserCard = ({ user }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Header: Title & Rating Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {user.title}
          </h3>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60 shrink-0">
            <svg
              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {user.rating}
          </span>
        </div>

        {/* Method / Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {user.method}
        </p>
      </div>

      {/* Card Action Link */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-end">
        <Link
          to={`/${user.id}`}
          className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Edit smoothie
          <svg
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NewUserCard;
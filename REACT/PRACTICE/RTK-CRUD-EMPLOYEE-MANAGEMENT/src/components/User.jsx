import { useState } from "react";
import { 
  useGetAllPostQuery, 
  useGetPostByIdQuery, 
  useGetPostByLimitQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} from "../features/posts";

// Reusable Spinning Circle Component
const LoadingCircle = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-sky-600"></div>
    <span className="text-lg font-medium text-gray-600">Loading...</span>
  </div>
);

const User = () => {
  const [viewMode, setViewMode] = useState("limited"); // 'all' | 'limited'
  const [postLimit, setPostLimit] = useState(5);
  const [selectedId, setSelectedId] = useState(1);

  // Queries
  const { 
    data: allPosts, 
    isLoading: isAllLoading, 
    isError: isAllError 
  } = useGetAllPostQuery(undefined, { skip: viewMode !== "all" });

  const { 
    data: limitedPosts, 
    isLoading: isLimitLoading, 
    isError: isLimitError 
  } = useGetPostByLimitQuery(postLimit, { skip: viewMode !== "limited" });

  const { 
    data: singlePost, 
    isLoading: isSingleLoading, 
    isError: isSingleError 
  } = useGetPostByIdQuery(selectedId);

  // Mutations
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  // Active data states
  const activePosts = viewMode === "all" ? allPosts : limitedPosts;
  const isListLoading = viewMode === "all" ? isAllLoading : isLimitLoading;
  const isListError = viewMode === "all" ? isAllError : isLimitError;

  // Handlers
  const handleUpdate = async (e, post) => {
    e.stopPropagation(); // Avoid triggering card selection
    const newTitle = prompt("Enter updated title:", post.title);
    if (!newTitle || newTitle === post.title) return;

    try {
      await updatePost({
        id: post.id,
        title: newTitle,
        body: post.body,
        userId: post.userId || 1,
      }).unwrap();
    } catch (err) {
      alert(`Update failed: ${err.message || "Something went wrong"}`);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Avoid triggering card selection
    if (!confirm(`Are you sure you want to delete post #${id}?`)) return;

    try {
      await deletePost(id).unwrap();
    } catch (err) {
      alert(`Delete failed: ${err.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* --- Main Post List Section --- */}
        <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Posts Feed ({viewMode === "all" ? "All Posts" : `Top ${postLimit}`})
            </h2>

            {/* Toggle View Mode & Limit Controls */}
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-lg bg-slate-100 p-1">
                <button
                  onClick={() => setViewMode("limited")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    viewMode === "limited" ? "bg-white text-sky-600 shadow-sm" : "text-slate-600"
                  }`}
                >
                  Limited
                </button>
                <button
                  onClick={() => setViewMode("all")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    viewMode === "all" ? "bg-white text-sky-600 shadow-sm" : "text-slate-600"
                  }`}
                >
                  All (100)
                </button>
              </div>

              {viewMode === "limited" && (
                <select
                  value={postLimit}
                  onChange={(e) => setPostLimit(Number(e.target.value))}
                  className="bg-slate-100 border border-slate-300 text-slate-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              )}
            </div>
          </div>

          {isListLoading && (
            <div className="flex h-64 justify-center items-center">
              <LoadingCircle />
            </div>
          )}

          {isListError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
              Failed to load posts.
            </div>
          )}

          {!isListLoading && !isListError && (
            <ul className="space-y-3.5 max-h-[600px] overflow-y-auto pr-2">
              {activePosts?.map((post) => (
                <li 
                  key={post.id}
                  onClick={() => setSelectedId(post.id)}
                  className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                    selectedId === post.id 
                      ? "border-sky-500 bg-sky-50/60 shadow-sm" 
                      : "border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3.5">
                    <div className="flex items-start gap-3.5">
                      <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs ${
                        selectedId === post.id ? "bg-sky-600 text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                        {post.id}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-slate-800 capitalize leading-snug">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-slate-500 text-xs leading-relaxed line-clamp-2">
                          {post.body}
                        </p>
                      </div>
                    </div>

                    {/* Quick Item Action Buttons */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={(e) => handleUpdate(e, post)}
                        disabled={isUpdating}
                        className="px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-100 hover:bg-sky-200 rounded-md transition-colors disabled:opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, post.id)}
                        disabled={isDeleting}
                        className="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-md transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* --- Featured Single Post Detail --- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 self-start sticky top-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Post Detail</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              ID: {selectedId}
            </span>
          </div>

          {isSingleLoading && (
            <div className="flex h-48 justify-center items-center">
              <LoadingCircle />
            </div>
          )}

          {isSingleError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              Could not load details for post #{selectedId}.
            </div>
          )}

          {!isSingleLoading && !isSingleError && singlePost && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-sky-700 capitalize leading-snug">
                {singlePost.title}
              </h3>
              <div className="h-px bg-slate-100 w-full" />
              <p className="text-slate-600 text-sm leading-relaxed">
                {singlePost.body}
              </p>

              {/* Action Buttons in Detail View */}
              <div className="pt-3 flex gap-2">
                <button
                  onClick={(e) => handleUpdate(e, singlePost)}
                  disabled={isUpdating}
                  className="flex-1 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Edit Post"}
                </button>
                <button
                  onClick={(e) => handleDelete(e, singlePost.id)}
                  disabled={isDeleting}
                  className="flex-1 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete Post"}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default User;
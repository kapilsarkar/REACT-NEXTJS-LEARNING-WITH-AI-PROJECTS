const LazyLoading = () => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-6 md:p-8 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl transition-all duration-300">
      
      {/* Top Header Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 rounded-full">
          <span className="w-2 h-2 mr-2 bg-emerald-400 rounded-full animate-pulse"></span>
          Lazy Loaded Chunk
        </span>
        <span className="text-xs text-slate-500">Loaded on Demand</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 mb-2">
        Lazy Loading Page
      </h2>

      {/* Subtitle */}
      <p className="text-slate-400 text-base md:text-lg mb-6 font-medium">
        This component was loaded asynchronously using React's <code className="text-indigo-300 bg-slate-800 px-2 py-0.5 rounded text-sm font-mono">React.lazy()</code> and <code className="text-indigo-300 bg-slate-800 px-2 py-0.5 rounded text-sm font-mono">&lt;Suspense&gt;</code>.
      </p>

      <hr className="border-slate-800 mb-6" />

      {/* Body Content */}
      <div className="space-y-4 text-slate-300 leading-relaxed font-normal text-base md:text-lg">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id tempora debitis quidem eum, incidunt beatae quaerat molestias. Asperiores ab aliquam minus porro ducimus. Explicabo quaerat earum recusandae fugit consequuntur laborum molestiae officiis perferendis architecto adipisci voluptas quasi doloremque.
        </p>
        <p>
          Excepturi molestias ea, optio ipsa reprehenderit nesciunt voluptatem obcaecati laudantium labore reiciendis deserunt quos! Obcaecati culpa molestias non tempora error voluptates eligendi quasi beatae omnis voluptate. Perspiciatis laudantium repellat laboriosam corrupti, in iste at aliquid perferendis eum quia odit ratione esse odio sed commodi fuga rem nemo.
        </p>
      </div>

      {/* Footer Info Box */}
      <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between text-xs md:text-sm text-slate-400">
        <span>⚡ Performance Boost</span>
        <span>Bundle Size Saved: ~15KB</span>
      </div>
    </div>
  );
};

export default LazyLoading;
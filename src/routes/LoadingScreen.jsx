function LoadingScreen({ message = "Checking authentication..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <img
          src="/chat_verse.png"
          alt="ChatVerse"
          className="h-16 w-16 object-contain"
        />

        {/* App Name */}
        <h1 className="mt-1 text-2xl font-bold text-gray-900">
          Chat<span className="text-indigo-500">Verse</span>
        </h1>

        {/* Loading Dots */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
        </div>

        {/* Loading Message */}
        <p className="mt-3 text-sm text-gray-400">{message}</p>
      </div>
    </div>
  );
}

export default LoadingScreen;

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold text-emerald-800 animate-bounce">
        404
      </h1>
      
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Page Not Found
      </h2>
      
      <p className="text-gray-500 mt-2 max-w-xs">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>

      <Link 
        href="/" 
        className="mt-6 px-6 py-3 bg-emerald-800 text-white rounded-lg font-medium transition-all hover:bg-emerald-900 hover:shadow-lg active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}

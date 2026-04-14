

    //   <Link 
    //     href="/" 
    //     className="mt-8 px-6 py-3 bg-[#2D4F3F] text-white rounded-lg font-medium hover:bg-emerald-900 transition shadow-lg"
    //   >
    //     Back to Home
    //   </Link>
   export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-emerald-800">404</h1>
      <p className="text-gray-500 mt-4">Oops! This page doesn't exist.</p>
    </div>
  );
}

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | FxBrokers.co.ke</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-[#07101E] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-[#C9A84C] text-8xl font-black mb-4">404</p>
          <h1 className="text-white text-2xl font-bold mb-3">Page Not Found</h1>
          <p className="text-gray-500 text-sm mb-8">The page you are looking for does not exist or has been moved.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="bg-[#C9A84C] hover:bg-[#b8953e] text-[#07101E] font-bold text-sm px-6 py-3 rounded-xl transition-colors">
              Go Home
            </Link>
            <Link to="/brokers" className="border border-white/20 hover:border-[#C9A84C]/40 text-gray-300 text-sm px-6 py-3 rounded-xl transition-all">
              Browse Brokers
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
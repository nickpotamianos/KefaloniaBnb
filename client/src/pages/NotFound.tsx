import { Button } from "@/components/ui/button";
import { Home as HomeIcon, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Kefalonia Vintage Home</title>
        <meta name="description" content="The page you're looking for could not be found. Return to our homepage to explore our authentic Greek island villa in Fiscardo, Kefalonia." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F6F2] to-[#F2F7FC] px-4">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-[var(--terracotta)] playfair mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--deep-blue)] mb-4 playfair">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for seems to have wandered off like a Greek island explorer.
              Let's get you back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <a href="/">
                <HomeIcon className="mr-2 h-5 w-5" />
                Go to Homepage
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[var(--deep-blue)] text-[var(--deep-blue)] hover:bg-[var(--deep-blue)]/5 rounded-full"
              onClick={() => window.history.back()}
            >
              <button>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </button>
            </Button>
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
            <p className="text-gray-700 mb-4">
              Looking for information about our villa? Here are some helpful links:
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <a href="/#house" className="text-[var(--primary-blue)] hover:underline">The House</a>
              <span className="text-gray-300">|</span>
              <a href="/#location" className="text-[var(--primary-blue)] hover:underline">Location</a>
              <span className="text-gray-300">|</span>
              <a href="/#reviews" className="text-[var(--primary-blue)] hover:underline">Reviews</a>
              <span className="text-gray-300">|</span>
              <a href="/#booking" className="text-[var(--primary-blue)] hover:underline">Book Now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

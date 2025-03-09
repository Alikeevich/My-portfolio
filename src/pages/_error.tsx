import { NextPage } from "next";

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0418] text-white">
      <div className="text-center p-8 max-w-md bg-purple-900/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-900/20">
        <h1 className="text-3xl font-bold mb-4 text-white">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </h1>
        <p className="text-purple-200/80 mb-6">
          We apologize for the inconvenience. Please try again later.
        </p>
        <a
          href="/"
          className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

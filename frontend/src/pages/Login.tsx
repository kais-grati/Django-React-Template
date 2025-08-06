import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="relative h-screen rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-100/60 via-transparent to-cyan-200/40"></div>
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-radial from-blue-300/40 to-transparent blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-radial from-indigo-300/40 to-transparent blur-3xl"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 w-96">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome back!
            </h2>
            <p className="text-gray-600 mt-2">
              Sign in to your account to continue.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition">
              Sign In
            </button>
            <p className="text-center text-sm text-gray-600">
              Not a member? {" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create an account 
              </Link>
            </p>
            <div className="text-center">
              <Link
                to="/"
                className="text-sm text-blue-600 hover:text-blue-700 transition"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

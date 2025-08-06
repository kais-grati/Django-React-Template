import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="relative min-h-screen rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-200/60 via-transparent to-cyan-300/40"></div>
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-radial from-blue-300/40 to-transparent blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-radial from-indigo-300/40 to-transparent blur-3xl"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 w-96 max-w-md">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome!</h2>
            <p className="text-gray-600 mt-2">Create your new account to get started.</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-start text-sm">
                <input type="checkbox" className="mr-3 mt-1" />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-blue-800 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-800 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              
              <label className="flex items-start text-sm">
                <input type="checkbox" className="mr-3 mt-1" />
                <span className="text-gray-600">
                  I would like to receive marketing emails and updates
                </span>
              </label>
            </div>
            
            <button className="w-full py-2 px-4 bg-blue-800 text-white rounded-2xl hover:bg-blue-700 transition font-medium">
              Create Account
            </button>
            
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-800 hover:underline font-medium">
                Sign in
              </Link>
            </p>
            
            <div className="text-center">
              <Link
                to="/"
                className="text-sm text-blue-800 hover:text-blue-900 transition"
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

export default Register;
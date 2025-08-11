import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../components/UX/Interceptor";
import { getErrorMessage, useTokenContext } from "../components/Helper";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAccessToken, setIsAuthenticated } = useTokenContext();

    const location = useLocation();
    const previousPage = location.state?.from || "/";
    const message = location.state?.message;

    const sendLoginRequest = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login/", {
                email,
                password,
            });
            const data = response.data;
            if (data?.accessToken) {
                setAccessToken(data.accessToken);
                setIsAuthenticated(true);
                navigate(previousPage);
            } else if (data?.error) {
                setError(data.error);
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error: unknown) {
            // Check if it's an axios error with response data
            if (error && typeof error === "object" && "response" in error) {
                const axiosError = error as any; // Type assertion for axios error
                if (axiosError.response?.data) {
                    // Backend sent an error response with data
                    const errorData = axiosError.response.data;
                    if (errorData.error) {
                        setError(errorData.error);
                    } else if (errorData.message) {
                        setError(errorData.message);
                    } else if (typeof errorData === "string") {
                        setError(errorData);
                    } else {
                        setError("Login failed. Please try again.");
                    }
                } else {
                    setError("Login failed. Please try again.");
                }
            } else if (
                error &&
                typeof error === "object" &&
                "request" in error
            ) {
                // Network error - request was made but no response received
                setError(
                    "Network error. Please check your connection and try again."
                );
            } else {
                // Something else happened
                const errorMessage = getErrorMessage(error);
                if (errorMessage) {
                    setError(errorMessage);
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            }
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: { key: string }) => {
        if (e.key === "Enter") {
            sendLoginRequest();
        }
    };

    return (
        <div className="relative h-screen rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-100/60 via-transparent to-cyan-200/40"></div>
            <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-radial from-blue-300/40 to-transparent blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-radial from-indigo-300/40 to-transparent blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                {message && (
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded">
                        {message}
                    </div>
                )}

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                Remember me
                            </label>
                            <a
                                href="#"
                                className="text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            onClick={sendLoginRequest}
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Not a member?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline"
                            >
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

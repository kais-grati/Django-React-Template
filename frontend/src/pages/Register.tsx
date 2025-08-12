import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTokenContext } from "../components/Helper";
import api from "../components/UX/Interceptor";

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        // phoneNumber: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
        receiveEmails: false
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { setAccessToken, setIsAuthenticated } = useTokenContext();
    const navigate = useNavigate();

    const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError("First name is required");
            return false;
        }
        if (!formData.lastName.trim()) {
            setError("Last name is required");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        }
        // if (!formData.phoneNumber.trim()) {
        //     setError("Phone number is required");
        //     return false;
        // }
        if (!formData.password) {
            setError("Password is required");
            return false;
        }
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (!formData.agreeToTerms) {
            setError("You must agree to the Terms of Service");
            return false;
        }
        return true;
    };

    // Type guard function to check if error is an axios error
    function isAxiosError(error: unknown): error is { response?: { data?: any }; request?: any } {
        return error !== null && 
               typeof error === 'object' && 
               ('response' in error || 'request' in error);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/register/", {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                // phone_number: formData.phoneNumber,
                password: formData.password,
                receive_emails: formData.receiveEmails
            });

            const data = response.data;
            
            // If registration returns a token, log them in automatically
            if (data?.accessToken) {
                setAccessToken(data.accessToken);
                setIsAuthenticated(true);
                navigate("/"); // Redirect to home page
            } else if (data?.message) {
                // If registration successful but no token (email verification required)
                setError("Registration successful! Please check your email to verify your account.");
                // You might want to navigate to a verification page instead
                // navigate("/verify-email");
            } else {
                navigate("/login"); // Redirect to login page
            }
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.data) {
                    const errorData = error.response.data;
                    if (errorData.error) {
                        setError(errorData.error);
                    } else if (errorData.message) {
                        setError(errorData.message);
                    } else if (errorData.email && Array.isArray(errorData.email)) {
                        setError(errorData.email[0]);
                    } else if (typeof errorData === 'string') {
                        setError(errorData);
                    } else {
                        setError("Registration failed. Please try again.");
                    }
                } else if (error.request) {
                    setError("Network error. Please check your connection and try again.");
                } else {
                    setError("Registration failed. Please try again.");
                }
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

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
                    
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="John"
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Doe"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="john@example.com"
                                disabled={loading}
                            />
                        </div>
                        
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="+1 (555) 123-4567"
                                disabled={loading}
                            />
                        </div> */}
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>
                        
                        <div className="space-y-3">
                            <label className="flex items-start text-sm">
                                <input 
                                    type="checkbox" 
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="mr-3 mt-1" 
                                    disabled={loading}
                                />
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
                                <input 
                                    type="checkbox" 
                                    name="receiveEmails"
                                    checked={formData.receiveEmails}
                                    onChange={handleInputChange}
                                    className="mr-3 mt-1" 
                                    disabled={loading}
                                />
                                <span className="text-gray-600">
                                    I would like to receive marketing emails and updates
                                </span>
                            </label>
                        </div>
                        
                        <button 
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-800 text-white rounded-2xl hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
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
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
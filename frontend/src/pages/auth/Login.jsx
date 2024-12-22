import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff, Hospital } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - replace with actual API call
    login({ ...formData, role: "patient" });
    navigate("/patient");
  };

  // Add test login handlers
  const handleTestLogin = (role) => {
    const testCredentials = {
      patient: {
        email: "patient@test.com",
        password: "123456",
        role: "patient",
      },
      doctor: { email: "doctor@test.com", password: "123456", role: "doctor" },
    };
    login(testCredentials[role]);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full min-h-screen sm:min-h-fit sm:w-[480px] p-6 sm:p-10 bg-white sm:rounded-lg sm:shadow-lg flex flex-col justify-center">
        {/* Test Credentials Info
        <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
          <p className="font-medium mb-1">Test Credentials:</p>
          <p>Patient: patient@test.com / 123456</p>
          <p>Doctor: doctor@test.com / 123456</p>
        </div> */}

        <div className="text-center mb-8">
          <Hospital className="w-14 h-14 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-6 sm:mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-base text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 sm:h-auto p-3 border border-gray-300 rounded-xl sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 sm:h-auto p-3 border border-gray-300 rounded-xl sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12 text-base"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 sm:h-auto mt-4 bg-blue-500 text-white px-4 py-3 rounded-xl sm:rounded-lg hover:bg-blue-600 transition-colors font-medium text-base shadow-sm"
          >
            LogIn
          </button>
        </form>

        {/* Quick Login Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => handleTestLogin("patient")}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
          >
            Test as Patient
          </button>
          <button
            type="button"
            onClick={() => handleTestLogin("doctor")}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
          >
            Test as Doctor
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

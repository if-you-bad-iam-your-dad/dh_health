import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Hospital, UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log("Form submitted:", formData);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full min-h-screen sm:min-h-fit sm:w-[480px] p-6 sm:p-8 bg-white sm:rounded-xl sm:shadow-lg flex flex-col justify-center">
        <div className="text-center mb-6">
          <Hospital className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Create Account</h1>
          <p className="text-base text-gray-600">Sign up for your personal account</p>
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
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-12 sm:h-auto p-3 border border-gray-300 rounded-xl sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12 text-base"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-base sm:text-sm font-medium text-gray-700 mb-2 sm:mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-12 sm:h-auto p-3 border border-gray-300 rounded-xl sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-12 sm:h-auto mt-4 bg-blue-500 text-white px-4 py-3 rounded-xl sm:rounded-lg hover:bg-blue-600 transition-colors font-medium text-base shadow-sm flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            Create Account
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

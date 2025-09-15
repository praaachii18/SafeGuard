import { useState } from "react";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      // signup call
      console.log("Signup data:", formData);
    } else {
      // login call
      console.log("Login data:", formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="emailOrMobile"
            placeholder="Email or Mobile"
            value={formData.emailOrMobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          {isSignup && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              {/* Password Rules */}
              <ul className="text-sm text-gray-600 list-disc ml-5">
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character (!@#$%^&*)</li>
              </ul>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <button
            className="text-purple-600 font-semibold hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
}

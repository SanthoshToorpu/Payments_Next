"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const mode = isSignup ? "signup" : "login";

  const handleSubmit = async (e: React.FormEvent, provider?: string) => {
    e.preventDefault();

    if (provider) {
      // Handle Google login
      await signIn(provider, { callbackUrl: "/" });
    } else {
      // Handle credentials-based sign-up or login
      const result = await signIn("credentials", {
        ...formData,
        mode: mode,
        redirect: false,
        callbackUrl : "/" // Prevent NextAuth's auto-redirect
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          {isSignup ? "Sign Up" : "Login"}
        </h1>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          {/* Username (only for Sign-Up) */}
          {isSignup && (
            <div className="input-group">
              <label htmlFor="username" className="block text-sm text-gray-600">
                Username
              </label>
              <input
                id="username"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          )}

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="username@provider.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Phone Number (only for Sign-Up) */}
          {isSignup && (
            <div className="input-group">
              <label htmlFor="number" className="block text-sm text-gray-600">
                Mobile No.
              </label>
              <input
                id="number"
                type="tel"
                placeholder="123-456-7890"
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          {/* Divider */}
          <div className="text-center text-gray-500 my-4">OR</div>

          {/* Google Login Button */}
          <button
            onClick={(e) => handleSubmit(e, "google")}
            className="w-full px-4 py-2 flex items-center justify-center text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google Logo"
              className="mr-2"
            />
            Login with Google
          </button>

          {/* Toggle between Sign-up and Login */}
          <p className="text-center text-sm text-gray-600">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <a
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

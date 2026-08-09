import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData);

      navigate("/chat");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Chat<span className="text-indigo-500">Verse</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Connect. Chat. Stay in touch.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Welcome back</h2>

            <p className="mt-1 text-sm text-slate-400">
              Login to continue to ChatVerse.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  onClick={() => {
                    // Forgot password functionality will be added later.
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} ChatVerse
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, ArrowRight } from "lucide-react";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both fields.");
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Welcome back!");
      // Small delay to allow auth state to update
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message ?? "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-900 bg-grid flex items-center justify-center p-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm animate-slide-up">
        {/* Logo block */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 items-center justify-center mb-4">
            <Shield size={28} className="text-brand-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">
            AJKKSAPT
          </h1>
          <p className="text-surface-400 text-sm mt-1">
            Campus Management System
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-800 border border-surface-600 rounded-2xl p-6 shadow-2xl">
          <p className="font-mono text-xs text-surface-400 uppercase tracking-widest mb-5">
            Admin Sign In
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-surface-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ajkksapt.edu"
                className="w-full bg-surface-700 border border-surface-500 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-surface-500
                  focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-surface-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-700 border border-surface-500 rounded-lg px-3 py-2.5 pr-10 text-sm text-white placeholder:text-surface-500
                    focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed
                text-white font-medium text-sm rounded-lg py-2.5 transition-all duration-150"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-surface-500 mt-4">
          Access restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}

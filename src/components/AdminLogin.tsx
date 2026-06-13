import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ArrowRight, Lock, Mail, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface AdminLoginProps {
  navigate: (path: string) => void;
}

export function AdminLogin({ navigate }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Whitelisted admin email validation
    const whitelist = ["solarainfo2024@gmail.com"];
    if (!whitelist.includes(email.trim().toLowerCase())) {
      setError("Access Denied: Only whitelisted administrators can log in.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Success: redirect to dashboard
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid credentials. Please verify your email and password.");
      } else {
        setError("An error occurred during authentication: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-4 text-white">
      {/* Background visual elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-brand/30 rounded-full blur-[100px]" />
        <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-brand/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-[#111]/80 border border-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 relative z-10 box-glow shadow-2xl"
      >
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 text-brand mb-4">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight uppercase">Solara Admin</h1>
          <p className="text-sm text-white/50 mt-2">Sign in to manage your landing page content</p>
        </div>

        {/* Error Toast */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/20 text-red-200 text-sm flex gap-3 items-start"
          >
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email input */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-white/60 block" htmlFor="email">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@solarabd.com"
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-white/60 block" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/50 transition-all text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full group btn-solid-brand py-4 rounded-xl flex items-center justify-center text-sm font-semibold tracking-wider uppercase disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Authenticating...
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>
      </motion.div>
    </div>
  );
}

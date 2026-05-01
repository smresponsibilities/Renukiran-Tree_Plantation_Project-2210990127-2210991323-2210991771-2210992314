"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Leaf, LogIn } from "lucide-react";
import { useAuth } from "../../components/AuthProvider";

export default function Login() {
  const [ngo_email, setNgoEmail] = useState("");
  const [ngo_password, setNgoPassword] = useState("");
  const [ngo_error, setNgoError] = useState("");
  const [ngo_loading, setNgoLoading] = useState(false);
  const ngo_router = useRouter();
  const { ngo_refresh } = useAuth();

  const ngo_handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setNgoError("");
    setNgoLoading(true);

    try {
      const ngo_res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ngo_email, password: ngo_password }),
      });
      const ngo_data = await ngo_res.json();
      
      if (!ngo_res.ok) {
        const ngo_msg = (ngo_data.error && !ngo_data.error.includes("EBADNAME") && !ngo_data.error.includes("querySrv")) 
          ? ngo_data.error 
          : "Unable to connect to server. Please try again later.";
        toast.error(ngo_msg);
        setNgoError(ngo_msg);
        setNgoLoading(false);
        return;
      }
      
      toast.success("Welcome back!");
      ngo_refresh();
      
      if (ngo_data.user.role === "admin") {
        ngo_router.push("/admin");
      } else {
        ngo_router.push("/dashboard");
      }
      ngo_router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
      setNgoError("Network error. Please try again.");
      setNgoLoading(false);
    }
  };

  return (
    <div className="flex-1 flex min-h-[80vh]">
      {/* Left — Image panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/60 to-dark/80"></div>
        <div className="relative z-10 flex flex-col justify-end p-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald/20 backdrop-blur-md flex items-center justify-center border border-emerald/20">
              <Leaf className="w-5 h-5 text-emerald" />
            </div>
            <span className="text-white font-bold text-lg">Renukiran</span>
          </div>
          <h2 className="heading-serif text-3xl font-black text-white leading-tight mb-3">
            Every tree planted is a<br/> tree for tomorrow.
          </h2>
          {/* placeholder numbers */}
          <p className="text-white/50 text-sm font-accent max-w-md">
            Join 25,000+ Indians who are restoring our planet — one tree at a time.
          </p>
          <div className="flex gap-6 mt-8">
            {[
              { stat: "1.2M+", label: "Trees Planted" },
              { stat: "92%", label: "Survival Rate" },
              { stat: "150+", label: "Locations" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-xl font-black text-accent heading-serif">{s.stat}</p>
                <p className="text-[10px] text-white/40 font-semibold uppercase tracking-wider font-accent">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald" />
            </div>
            <span className="font-bold text-forest">Renukiran</span>
          </div>

          <h1 className="heading-serif text-3xl font-black text-forest mb-2">Welcome back</h1>
          <p className="text-earth text-sm font-accent mb-8">Login to your dashboard to track your trees and impact.</p>
          
          {ngo_error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 font-medium p-3 rounded-xl text-sm mb-5 text-center border border-red-100"
            >
              {ngo_error}
            </motion.div>
          )}
          
          <form onSubmit={ngo_handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-bold text-forest mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-earth/40" />
                <input 
                  type="email" 
                  required 
                  value={ngo_email}
                  onChange={e => setNgoEmail(e.target.value)}
                  className="w-full rounded-xl bg-surface border border-sand/60 pl-10 pr-4 py-3 text-sm outline-none focus:border-emerald focus:ring-1 focus:ring-emerald/30 transition-all font-medium text-forest" 
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-forest mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-earth/40" />
                <input 
                  type="password" 
                  required 
                  value={ngo_password}
                  onChange={e => setNgoPassword(e.target.value)}
                  className="w-full rounded-xl bg-surface border border-sand/60 pl-10 pr-4 py-3 text-sm outline-none focus:border-emerald focus:ring-1 focus:ring-emerald/30 transition-all font-medium text-forest" 
                  placeholder="••••••••"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={ngo_loading}
              className="mt-2 w-full font-bold py-3.5 rounded-xl bg-emerald text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald/20 hover:shadow-xl hover:shadow-emerald/30 transition-all btn-glow disabled:opacity-50"
            >
              {ngo_loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Login
                </>
              )}
            </motion.button>
          </form>
          
          <p className="text-sm text-center text-earth mt-8 font-accent">
            Don&apos;t have an account? <Link href="/register" className="text-emerald font-bold link-animated">Register</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

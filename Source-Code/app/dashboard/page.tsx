"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, LogOut, FileText, Trees, Download, Clock, ArrowRight, ExternalLink, ShoppingBag } from "lucide-react";
import { useAuth } from "../../components/AuthProvider";
import SectionReveal, { StaggerContainer, StaggerItem } from "../../components/SectionReveal";

export default function UserDashboard() {
  const [ngo_orders, setNgoOrders] = useState([]);
  const { user, ngo_refresh } = useAuth();
  const ngo_router = useRouter();

  useEffect(() => {
    fetch("/api/user/orders").then(ngo_res => {
      if (!ngo_res.ok) return;
      return ngo_res.json();
    }).then(ngo_data => {
      if (ngo_data?.data) setNgoOrders(ngo_data.data);
    }).catch(() => {});
  }, []);

  const ngo_handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Signed out successfully.");
    ngo_refresh();
    ngo_router.push("/login");
  };

  const ngo_totalTrees = ngo_orders.reduce((acc: number, o: any) => 
    acc + o.trees.reduce((s: number, t: any) => s + t.quantity, 0), 0
  );

  return (
    <div className="max-w-7xl mx-auto p-5 pt-28 min-h-[70vh]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6"
      >
        <div>
          <h1 className="heading-serif text-3xl md:text-4xl font-black text-forest">My Dashboard</h1>
          <p className="text-earth font-accent mt-1">Welcome back, <span className="font-bold text-emerald">{user?.name || "Nature Supporter"}</span></p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={ngo_handleLogout}
          className="px-5 py-2.5 bg-surface border border-sand/50 hover:bg-red-50 hover:border-red-200 hover:text-red-500 rounded-xl font-bold text-forest text-sm transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </motion.button>
      </motion.div>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Trees, stat: ngo_totalTrees, label: "Trees Sponsored", gradient: "from-emerald/10 to-green-500/10" },
          { icon: FileText, stat: ngo_orders.filter((o: any) => o.certificateValidated).length, label: "Certificates Ready", gradient: "from-violet-500/10 to-purple-500/10" },
          { icon: Clock, stat: ngo_orders.filter((o: any) => !o.certificateValidated).length, label: "Pending", gradient: "from-amber-500/10 to-yellow-500/10" },
          { icon: ShoppingBag, stat: ngo_orders.length, label: "Total Orders", gradient: "from-sky-500/10 to-blue-500/10" },
        ].map((item, i) => (
          <StaggerItem key={i}>
            <motion.div whileHover={{ y: -4 }} className="text-center p-6 rounded-2xl bg-surface border border-sand/50 shadow-sm hover:shadow-lg hover:border-emerald/15 transition-all group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6 text-forest" />
              </div>
              <p className="text-2xl font-black text-forest heading-serif">{item.stat}</p>
              <p className="text-[10px] text-earth font-semibold mt-1 uppercase tracking-wider font-accent">{item.label}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Certificates */}
      <SectionReveal>
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-serif text-xl font-bold text-forest flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald" />
            </span>
            My Certificates
          </h2>
          <Link href="/marketplace" className="text-sm font-bold text-emerald flex items-center gap-1 hover:gap-2 transition-all">
            Sponsor More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionReveal>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {ngo_orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-16 text-center bg-surface border border-sand/50 rounded-2xl"
          >
            <Sprout className="w-14 h-14 text-emerald/25 mx-auto mb-4" />
            <p className="heading-serif font-bold text-forest text-xl mb-2">No trees sponsored yet</p>
            <p className="text-earth text-sm font-accent mb-6">Head to the marketplace to plant your first tree.</p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/marketplace" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald text-white font-bold rounded-xl shadow-lg shadow-emerald/20 btn-glow">
                <Trees className="w-4 h-4" /> Enter Marketplace
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          ngo_orders.map((o: any) => (
            <StaggerItem key={o._id}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-surface p-6 rounded-2xl border border-sand/50 shadow-sm hover:shadow-lg hover:border-emerald/15 transition-all flex flex-col h-full relative overflow-hidden group"
              >
                {/* Side accent */}
                <div className={`absolute top-0 left-0 w-1 h-full ${o.certificateValidated ? 'bg-gradient-to-b from-emerald to-primary-light' : 'bg-gradient-to-b from-amber-400 to-amber-300'} group-hover:w-1.5 transition-all`}></div>
                
                <div className="flex justify-between items-start mb-4 pl-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-earth block mb-0.5 font-accent">Order</span>
                    <span className="font-mono text-xs font-bold text-forest">{o.razorpayOrderId?.slice(-8)}</span>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${o.paymentStatus === 'Completed' ? 'bg-emerald/10 text-emerald' : 'bg-amber-100 text-amber-700'}`}>
                    {o.paymentStatus}
                  </span>
                </div>
                
                <div className="flex-1 pl-3">
                  <p className="text-sm font-bold text-forest mb-4 leading-relaxed">
                    {o.trees.map((t: any) => `${t.quantity}× ${t.name}`).join(' · ')}
                  </p>
                  <div className="pt-4 border-t border-sand/30">
                    <p className="text-[10px] text-earth uppercase font-bold tracking-widest mb-1 font-accent">Total</p>
                    <p className="text-2xl font-black text-forest heading-serif">₹{o.totalAmount}</p>
                  </div>
                </div>

                <div className="mt-5 pl-3">
                  {o.certificateValidated ? (
                    <>
                      {o.certificateId && (
                        <p className="text-[10px] text-earth uppercase font-bold tracking-widest mb-2 text-center font-accent">
                          ID: <span className="font-mono text-emerald">{o.certificateId}</span>
                        </p>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open(`/certificate/${o._id}`, '_blank')}
                        className="w-full flex items-center justify-center gap-2 bg-emerald text-white font-bold py-3 rounded-xl shadow-md shadow-emerald/20 hover:shadow-lg btn-glow text-sm"
                      >
                        <Download className="w-4 h-4" /> Download Certificate
                      </motion.button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cream text-earth font-bold text-sm border border-sand/50">
                      <Clock className="w-4 h-4" /> Awaiting Validation from Renukiran
                    </div>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))
        )}
      </StaggerContainer>
    </div>
  );
}

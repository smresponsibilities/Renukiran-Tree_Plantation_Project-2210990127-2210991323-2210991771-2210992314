"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Trees, TrendingUp, MapPin, Clock, BarChart3, Leaf, ArrowRight, ChevronDown } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import SectionReveal, { StaggerContainer, StaggerItem } from "../../components/SectionReveal";

const ngo_trackingTimeline = [
  { date: "Mar 2026", event: "Delhi NCR Miyawaki Forest — 500 trees planted", icon: Trees },
  { date: "Feb 2026", event: "EcoBank joins as CSR partner — 25,000 trees committed", icon: Target },
  { date: "Jan 2026", event: "Aravalli project crosses 10,000 trees milestone", icon: TrendingUp },
  { date: "Dec 2025", event: "Sundarbans Mangrove project completed!", icon: Leaf },
  { date: "Nov 2025", event: "92% survival rate across all projects — quarterly report", icon: BarChart3 },
];

const ngo_growthData = [
  { month: "Jul", trees: 800000 }, { month: "Aug", trees: 850000 }, { month: "Sep", trees: 920000 },
  { month: "Oct", trees: 980000 }, { month: "Nov", trees: 1050000 }, { month: "Dec", trees: 1100000 },
  { month: "Jan", trees: 1150000 }, { month: "Feb", trees: 1180000 }, { month: "Mar", trees: 1200000 },
];

const ngo_co2Data = [
  { month: "Jul", co2: 3200 }, { month: "Aug", co2: 3500 }, { month: "Sep", co2: 3900 },
  { month: "Oct", co2: 4200 }, { month: "Nov", co2: 4500 }, { month: "Dec", co2: 4700 },
  { month: "Jan", co2: 5000 }, { month: "Feb", co2: 5200 }, { month: "Mar", co2: 5400 },
];

const ngo_survivalData = [
  { name: "Surviving", value: 92 },
  { name: "Lost", value: 8 },
];

const NGO_SURVIVAL_COLORS = ["#1FA971", "#e8dcc8"];

export default function Tracking() {
  const [ngo_selectedId, setNgoSelectedId] = useState<string | null>(null);
  const [ngo_filter, setNgoFilter] = useState("all");
  const [ngo_projects, setNgoProjects] = useState<any[]>([]);
  const [ngo_loading, setNgoLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then(res => res.json())
      .then(json => { setNgoProjects(json.data || []); setNgoLoading(false); })
      .catch(() => setNgoLoading(false));
  }, []);

  const ngo_filtered = ngo_filter === "all" ? ngo_projects : ngo_projects.filter((p) => p.status.toLowerCase() === ngo_filter);
  const ngo_totalPlanned = ngo_projects.reduce((s, p) => s + (p.targetTrees || 0), 0);
  const ngo_totalPlanted = ngo_projects.reduce((s, p) => s + (p.treesPlanted || 0), 0);

  return (
    <main className="flex-1 w-full max-w-[1400px] mx-auto px-5 lg:px-10 py-8 space-y-12">
      {/* Header */}
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block text-emerald font-bold tracking-[0.15em] uppercase text-xs mb-3 font-accent">Real-Time Data</span>
            <h1 className="heading-serif text-3xl md:text-4xl font-black text-forest">Our Impact</h1>
            <p className="text-earth mt-1 font-accent">Track plantation projects in real-time with GPS coordinates and progress updates.</p>
          </div>
        </div>
      </SectionReveal>

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Target, label: "Trees Planned", value: ngo_totalPlanned.toLocaleString(), gradient: "from-amber-500/10 to-yellow-500/10" },
          { icon: Trees, label: "Trees Planted", value: ngo_totalPlanted.toLocaleString(), gradient: "from-emerald/10 to-green-500/10" },
          { icon: TrendingUp, label: "Survival Rate", value: "92%", gradient: "from-sky-500/10 to-blue-500/10" },
          { icon: MapPin, label: "Active Zones", value: ngo_projects.filter(p => p.status === "Active").length.toString(), gradient: "from-rose-500/10 to-pink-500/10" },
        ].map((s, i) => (
          <StaggerItem key={i}>
            <motion.div whileHover={{ y: -4 }} className="flex flex-col gap-3 p-5 rounded-2xl bg-surface border border-sand/50 shadow-sm hover:shadow-lg hover:border-emerald/15 transition-all group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-forest" />
              </div>
              <p className="text-2xl font-black text-forest heading-serif">{s.value}</p>
              <p className="text-[10px] text-earth font-semibold uppercase tracking-wider font-accent">{s.label}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Impact Dashboard */}
      <SectionReveal>
        <div className="space-y-4">
          <h2 className="heading-serif text-2xl font-bold text-forest flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald" /> Impact Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Trees Growth */}
            <div className="bg-surface rounded-2xl border border-sand/50 p-5 shadow-sm">
              <p className="text-xs font-bold text-earth uppercase tracking-wider mb-1 font-accent">Trees Planted</p>
              <p className="text-xl font-black text-forest heading-serif mb-3">1.2M+</p>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={ngo_growthData}>
                  <defs>
                    <linearGradient id="colorTrees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1FA971" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1FA971" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b6b5e" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e8dcc8", fontSize: 12 }} />
                  <Area type="monotone" dataKey="trees" stroke="#1FA971" fill="url(#colorTrees)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* CO2 Offset */}
            <div className="bg-surface rounded-2xl border border-sand/50 p-5 shadow-sm">
              <p className="text-xs font-bold text-earth uppercase tracking-wider mb-1 font-accent">CO₂ Offset (Tons)</p>
              <p className="text-xl font-black text-forest heading-serif mb-3">50K+</p>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={ngo_co2Data}>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#6b6b5e" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e8dcc8", fontSize: 12 }} />
                  <Bar dataKey="co2" fill="#D4A537" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Survival Rate */}
            <div className="bg-surface rounded-2xl border border-sand/50 p-5 shadow-sm">
              <p className="text-xs font-bold text-earth uppercase tracking-wider mb-1 font-accent">Survival Rate</p>
              <p className="text-xl font-black text-forest heading-serif mb-3">92%</p>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width={140} height={120}>
                  <PieChart>
                    <Pie data={ngo_survivalData} innerRadius={35} outerRadius={55} dataKey="value" startAngle={90} endAngle={-270}>
                      {ngo_survivalData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={NGO_SURVIVAL_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e8dcc8", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      {/* Map Visualization */}
      <SectionReveal>
        <h2 className="heading-serif text-2xl font-bold text-forest mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald" /> Impact Map
        </h2>
        <div className="relative h-[350px] rounded-3xl overflow-hidden bg-gradient-forest shadow-xl border border-white/5">
          <div className="absolute inset-0 grid-pattern opacity-[0.06]"></div>
          {/* SVG India Map Outline */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 400 400" className="w-64 h-64" fill="none" stroke="white" strokeWidth="0.5">
              <path d="M200,50 L220,60 L240,55 L260,65 L280,60 L290,80 L300,100 L310,130 L320,160 L315,190 L310,220 L300,250 L280,280 L260,300 L240,320 L220,340 L200,350 L180,340 L160,330 L140,310 L130,290 L120,260 L110,230 L105,200 L100,170 L105,140 L110,110 L120,85 L140,70 L160,60 L180,52 Z" />
            </svg>
          </div>
          {/* Animated markers */}
          {[
            { top: "28%", left: "45%", label: "Delhi NCR" },
            { top: "50%", left: "35%", label: "Rajasthan" },
            { top: "38%", left: "58%", label: "UP" },
            { top: "60%", left: "48%", label: "Maharashtra" },
            { top: "72%", left: "42%", label: "Karnataka" },
          ].map((pin, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
              className="absolute group cursor-pointer"
              style={{ top: pin.top, left: pin.left }}
            >
              <div className="w-3 h-3 bg-emerald rounded-full anim-pulse-dot shadow-lg shadow-emerald/30"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm text-forest text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-sand/50">
                {pin.label}
              </div>
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
            <p className="text-white/60 font-bold text-sm font-accent">{ngo_projects.length} plantation zones</p>
          </div>
        </div>
      </SectionReveal>

      {/* Projects */}
      <section className="space-y-6">
        <SectionReveal className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="heading-serif text-2xl font-bold text-forest">Projects</h2>
          <div className="flex gap-2">
            {["all", "active", "completed"].map((s) => (
              <motion.button whileTap={{ scale: 0.95 }} key={s} onClick={() => setNgoFilter(s)} className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${ngo_filter === s ? "bg-emerald text-white shadow-md shadow-emerald/20" : "bg-surface text-earth border border-sand/50 hover:border-emerald/20"}`}>{s}</motion.button>
            ))}
          </div>
        </SectionReveal>

        {ngo_loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-2xl border border-sand/50">
            <Leaf className="w-8 h-8 text-emerald anim-pulse-dot mb-4" />
            <p className="font-bold text-forest">Loading impact data.........</p>
          </div>
        ) : ngo_filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-2xl border border-sand/50">
            <MapPin className="w-8 h-8 text-earth/30 mb-4" />
            <p className="font-bold text-forest">No projects match your filter unfortunately</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {ngo_filtered.map((p) => (
              <StaggerItem key={p._id}>
                <motion.article
                  whileHover={{ y: -2 }}
                  className={`bg-surface rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${ngo_selectedId === p._id ? "border-emerald shadow-xl" : "border-sand/50 hover:shadow-lg hover:border-emerald/15"}`}
                  onClick={() => setNgoSelectedId(ngo_selectedId === p._id ? null : p._id)}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-32 h-32 md:h-auto shrink-0 bg-cover bg-center bg-forest" style={{backgroundImage: `url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=300&q=80")`}}></div>
                    <div className="flex-1 p-5 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-forest">{p.title}</h3>
                          <p className="text-sm text-earth mt-0.5 flex items-center gap-1 font-accent"><MapPin className="w-3 h-3 text-emerald" /> {p.location}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${p.status === "Active" ? "bg-emerald/10 text-emerald" : "bg-accent/15 text-accent-dark"}`}>{p.status}</span>
                      </div>
                      <div className="mt-auto pt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-earth font-accent">{(p.treesPlanted || 0).toLocaleString()} / {(p.targetTrees || 100).toLocaleString()}</span>
                          <span className="font-bold text-emerald">{Math.min(100, Math.round(((p.treesPlanted || 0) / (p.targetTrees || 1)) * 100))}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-cream-dark/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, ((p.treesPlanted || 0) / (p.targetTrees || 1)) * 100)}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald to-primary-light rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      <AnimatePresence>
                        {ngo_selectedId === p._id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 pt-4 border-t border-cream-dark/50 space-y-3 overflow-hidden">
                            <p className="text-earth text-xs uppercase font-semibold font-accent"><Clock className="w-3 h-3 inline mr-1" /> Started: {new Date(p.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm text-dark font-medium font-accent">{p.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </section>

      {/* Timeline */}
      <SectionReveal>
        <h2 className="heading-serif text-2xl font-bold text-forest mb-6">Timeline</h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-emerald/15"></div>
          {ngo_trackingTimeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-4 items-start group mb-6"
            >
              <div className="relative z-10 flex-shrink-0 size-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald/10 to-primary-light/10 border border-emerald/15 group-hover:from-emerald/20 group-hover:to-primary-light/15 transition-colors">
                <item.icon className="w-5 h-5 text-emerald" />
              </div>
              <div className="pb-2 pt-1">
                <p className="text-[10px] font-bold text-earth uppercase tracking-wider font-accent">{item.date}</p>
                <p className="text-sm font-medium text-forest mt-0.5 group-hover:text-emerald transition-colors">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </main>
  );
}

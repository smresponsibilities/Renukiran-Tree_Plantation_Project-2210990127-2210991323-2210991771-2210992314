"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Recycle, Users, CheckCircle, Leaf, ArrowRight, Shield, Award, Globe, Linkedin, Twitter, Mail } from "lucide-react";
import SectionReveal, { StaggerContainer, StaggerItem } from "../../components/SectionReveal";

// not correct rn
const ngo_timeline = [
  { year: "2015", title: "Foundation Born", desc: "Renukiran Welfare Foundation started with a vision to bridge social welfare and environmental action." },
  { year: "2017", title: "First 10,000 Trees", desc: "First milestone — 10,000 trees planted across Rajasthan's arid landscapes." },
  { year: "2019", title: "CSR Launch", desc: "Launched corporate partnerships. 15 companies joined as CSR plantation partners." },
  { year: "2021", title: "Digital Platform", desc: "Launched GPS tracking, digital certificates, and online tree sponsorship." },
  { year: "2023", title: "1 Million Trees", desc: "Crossed the historic milestone of 1 million trees planted across India." },
  { year: "2026", title: "Scaling to 10M", desc: "Targeting 10 million trees by 2030 with Miyawaki, mangrove, and agroforestry expansion." },
];

const ngo_values = [
  { icon: Eye, title: "Transparency", desc: "Every tree GPS-tagged with geo-tagged photos. Verify your impact in real-time." },
  { icon: Recycle, title: "Sustainability", desc: "3 years of care for every tree. 92%+ survival rate across all projects." },
  { icon: Users, title: "Community", desc: "Creating livelihoods for rural communities while restoring landscapes." },
  { icon: CheckCircle, title: "Accountability", desc: "Audit-ready reports, quarterly updates, and 100% fund utilization." },
];

// random people
const ngo_team = [
  { name: "Renu Sharma", role: "Founder & CEO", desc: "15+ years in social welfare and environmental activism.", gradient: "from-emerald to-primary-light" },
  { name: "Amit Verma", role: "Head of Operations", desc: "Manages 150+ plantation locations across India.", gradient: "from-sky-500 to-blue-500" },
  { name: "Priya Bose", role: "CSR Partnerships", desc: "Connects corporates with impactful plantation initiatives.", gradient: "from-violet-500 to-purple-500" },
  { name: "Dr. Ravi Kumar", role: "Chief Botanist", desc: "PhD in Forest Ecology. Designs species selection plans.", gradient: "from-amber-500 to-yellow-500" },
];

export default function Mission() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <div className="w-full max-w-7xl px-5 py-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex min-h-[450px] flex-col overflow-hidden rounded-3xl items-center justify-center p-8 text-center shadow-2xl shadow-forest/15"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-110" style={{backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/60 to-dark/80"></div>
          </div>
          <div className="relative z-10">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4 inline-block font-accent">Our Story</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="heading-serif text-white text-4xl font-black leading-tight md:text-6xl mb-4">
              Rooted in honesty and <br/>growing with purpose
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 text-base max-w-lg mx-auto mb-6 font-accent">Every tree planted is a seed of hope. Zero overheads — 100% impact.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/marketplace" className="h-12 px-8 flex items-center rounded-full bg-gradient-gold text-white font-bold shadow-lg transition-shadow gap-2">
                  <Leaf className="w-4 h-4" /> Join the Mission now 
                </Link>
              </motion.div>
              <Link href="/tracking" className="h-12 px-8 flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-semibold hover:bg-white/15 transition-all gap-2">
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Our Story */}
      <section className="w-full max-w-5xl px-5 py-16 flex flex-col gap-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <SectionReveal direction="left">
            <div className="flex flex-col gap-6">
              <span className="text-emerald font-bold tracking-[0.15em] uppercase text-xs font-accent">From Slums to Saplings</span>
              <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest leading-tight">Our journey began 11 years ago</h2>
              <p className="text-earth text-base leading-relaxed font-accent">
                Renukiran started in 2015 with a complex belief: the environment and society are deeply interconnected. What began as community welfare work has grown into India&apos;s most transparent tree plantation platform.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { stat: "11+", label: "Years" },
                  { stat: "1.2M+", label: "Trees" },
                  { stat: "150+", label: "Locations" },
                ].map((s, i) => (
                  <motion.div whileHover={{ y: -2 }} key={i} className="text-center p-4 rounded-xl bg-emerald/5 border border-emerald/8 hover:border-emerald/15 transition-colors">
                    <p className="text-xl font-black text-emerald heading-serif">{s.stat}</p>
                    <p className="text-[10px] text-earth font-semibold uppercase font-accent">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
          <SectionReveal direction="right" className="grid grid-cols-2 gap-4">
            <motion.img whileHover={{ y: -4 }} className="rounded-2xl object-cover h-64 w-full translate-y-6 shadow-lg hover:shadow-xl transition-shadow" src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80" alt="Planting" />
            <motion.img whileHover={{ y: -4 }} className="rounded-2xl object-cover h-64 w-full shadow-lg hover:shadow-xl transition-shadow" src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&q=80" alt="Forest" />
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-surface py-20 relative">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="max-w-[1280px] mx-auto px-5 relative z-10">
          <SectionReveal className="text-center mb-12">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">What Drives Us</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Our Core Values</h2>
          </SectionReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ngo_values.map((v, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -6 }} className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-cream/60 backdrop-blur-sm border border-transparent hover:border-emerald/10 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald/10 to-primary-light/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <v.icon className="w-7 h-7 text-emerald" />
                  </div>
                  <h3 className="text-lg font-bold text-forest">{v.title}</h3>
                  <p className="text-sm text-earth leading-relaxed font-accent">{v.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full bg-cream py-20 relative overflow-hidden">
        <div className="absolute inset-0 line-pattern opacity-30"></div>
        <div className="max-w-3xl mx-auto px-5 relative z-10">
          <SectionReveal className="text-center mb-12">
            <span className="inline-block text-emerald font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">Milestones</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Our Journey</h2>
          </SectionReveal>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald via-emerald/50 to-emerald/10"></div>
            {ngo_timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative flex items-start gap-6 mb-10 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 flex-shrink-0 size-12 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald to-primary-light text-white font-bold text-xs shadow-lg shadow-emerald/20 heading-serif group-hover:shadow-xl group-hover:shadow-emerald/30 transition-shadow"
                >
                  {item.year.slice(2)}
                </motion.div>
                <div className="pt-1">
                  <p className="text-2xl font-black text-emerald/15 heading-serif">{item.year}</p>
                  <h3 className="text-lg font-bold text-forest mt-0.5 group-hover:text-emerald transition-colors">{item.title}</h3>
                  <p className="text-sm text-earth mt-1 font-accent">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="w-full bg-surface py-20 relative">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="max-w-[1280px] mx-auto px-5 relative z-10">
          <SectionReveal className="text-center mb-12">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">Leadership</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">The People Half Behind the Trees</h2>
          </SectionReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ngo_team.map((p, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-cream/60 backdrop-blur-sm border border-transparent hover:border-emerald/10 hover:shadow-xl transition-all overflow-hidden group"
                >
                  {/* Avatar */}
                  <div className={`size-20 rounded-full bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-bold text-2xl heading-serif mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                    {p.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-forest">{p.name}</h3>
                  <p className="text-sm text-emerald font-semibold mb-2 font-accent">{p.role}</p>
                  <p className="text-sm text-earth font-accent">{p.desc}</p>
                  
                  {/* Hover social links */}
                  <div className="flex gap-2 mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {[Linkedin, Twitter, Mail].map((Icon, j) => (
                      <a key={j} href="#" className="size-8 flex items-center justify-center rounded-lg bg-emerald/10 text-emerald hover:bg-emerald/20 transition-colors">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>

                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald/10 transition-colors pointer-events-none"></div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Certifications */}
      <section className="w-full bg-cream py-16 relative">
        <div className="max-w-[1280px] mx-auto px-5">
          <SectionReveal className="text-center mb-10">
            <h2 className="heading-serif text-2xl font-black text-forest flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-emerald" /> Trust & Compliance
            </h2>
          </SectionReveal>
          <StaggerContainer className="flex flex-wrap justify-center gap-3">
            {[
              { label: "ISO 14001 Certified", icon: Award },
              { label: "Section 80G", icon: Shield },
              { label: "FCRA Registered", icon: Globe },
              { label: "12A Registration", icon: CheckCircle },
              { label: "CSR1 NGO", icon: CheckCircle },
            ].map((cert, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -2, scale: 1.02 }} className="flex items-center gap-2 px-5 py-3 rounded-full bg-surface border border-sand/50 shadow-sm hover:border-emerald/15 hover:shadow-md transition-all">
                  <cert.icon className="w-4 h-4 text-emerald" />
                  <span className="text-sm font-semibold text-forest">{cert.label}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      <div className="h-0 w-full bg-cream"></div>
    </main>
  );
}

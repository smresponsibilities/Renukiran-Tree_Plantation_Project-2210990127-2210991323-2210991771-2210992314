"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trees, ShoppingBag, Users, Building2, MapPin, TrendingUp, Phone, Mail, Leaf, ArrowRight, CheckCircle, BarChart3, FileText, ChevronRight } from "lucide-react";
import SectionReveal, { StaggerContainer, StaggerItem } from "../../components/SectionReveal";

const ngo_csrServices = [
  { icon: Trees, title: "CSR Tree Plantation", desc: "End-to-end plantation initiatives with transparent tracking, GPS tagging, and audit-ready reports.", features: ["Geo-tagged trees", "Quarterly reports", "Tax benefits under 80G"] },
  { icon: ShoppingBag, title: "D2C Sustainability", desc: "Empower your D2C brand with carbon-neutral operations and eco-first packaging solutions.", features: ["Carbon-neutral shipping", "Green brand stories", "Consumer trust badges"] },
  { icon: Users, title: "Employee Engagement", desc: "Team plantation drives that build culture, create ESG value, and genuinely improve the environment.", features: ["Virtual plantation events", "Individual certificates", "Impact dashboards"] },
];

// most imp
export default function CSR() {
  const [ngo_formStep, setNgoFormStep] = useState(0);
  const [ngo_formData, setNgoFormData] = useState({ company: "", email: "", phone: "", trees: "", message: "" });
  const [ngo_submitted, setNgoSubmitted] = useState(false);
  const [ngo_partners, setNgoPartners] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/partners", { cache: "no-store" })
      .then((res) => res.json())
      .then((json) => { if (json.data) setNgoPartners(json.data); })
      .catch(() => {});
  }, []);

  const ngo_handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNgoSubmitted(true);
    setTimeout(() => { setNgoSubmitted(false); setNgoFormStep(0); }, 5000);
    setNgoFormData({ company: "", email: "", phone: "", trees: "", message: "" });
  };

  const ngo_nextStep = () => setNgoFormStep((prev) => Math.min(prev + 1, 2));
  const ngo_prevStep = () => setNgoFormStep((prev) => Math.max(prev - 1, 0));

  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section className="p-5 md:p-8 max-w-[1440px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative flex min-h-[450px] flex-col overflow-hidden rounded-3xl items-start justify-end px-8 pb-14 pt-32 md:px-14 shadow-2xl shadow-forest/15">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80')"}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/30"></div>
          </div>
          <div className="relative z-10">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent backdrop-blur-md border border-accent/20 mb-5">
              <Building2 className="w-3 h-3" /> For Startups & Corporates & Your company
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="heading-serif text-white text-4xl md:text-5xl font-black leading-tight mb-3">Corporate CSR Solutions </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 text-base max-w-xl mb-6 font-accent">Partner with Renukiran to achieve your ESG goals through impactful, transparent plantation initiatives </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="#contact" className="h-12 px-8 flex items-center rounded-full bg-gradient-gold text-white font-bold shadow-lg transition-shadow gap-2">Get Started <ArrowRight className="w-4 h-4" /></a>
              </motion.div>
              <a href="#services" className="h-12 px-8 flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-semibold hover:bg-white/15 transition-all gap-2">Explore Services</a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 max-w-[1280px] mx-auto px-5">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Building2, stat: "100+", label: "Corporate Partners", gradient: "from-violet-500/10 to-purple-500/10" },
            { icon: Trees, stat: "5L+", label: "CSR Trees Planted", gradient: "from-emerald/10 to-green-500/10" },
            { icon: TrendingUp, stat: "₹2Cr+", label: "Funds Deployed", gradient: "from-amber-500/10 to-yellow-500/10" },
            { icon: MapPin, stat: "50+", label: "Cities Covered", gradient: "from-rose-500/10 to-pink-500/10" },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <motion.div whileHover={{ y: -4 }} className="text-center p-6 rounded-2xl bg-surface border border-sand/50 shadow-sm hover:shadow-lg hover:border-emerald/15 transition-all group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-forest" />
                </div>
                <p className="text-2xl md:text-3xl font-black text-emerald heading-serif">{item.stat}</p>
                <p className="text-xs text-earth font-semibold mt-1 uppercase tracking-wider font-accent">{item.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Partners */}
      {ngo_partners.length > 0 && (
        <section className="py-12 border-t border-b border-sand/50 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 text-center">
            <p className="text-xs font-bold text-earth uppercase tracking-[0.15em] mb-8 font-accent">Trusted by industry leaders </p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
              {ngo_partners.map((p) => (
                <motion.div key={p._id} whileHover={{ scale: 1.05 }} className="flex flex-col items-center gap-2 group cursor-default grayscale hover:grayscale-0 transition-all">
                  <img src={p.logoUrl} alt={p.companyName} className="h-10 md:h-14 object-contain max-w-[140px]" />
                  <span className="text-[10px] font-bold text-accent px-2 py-0.5 bg-accent/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-accent">
                    {(p.treesSponsored || 0).toLocaleString()} Trees
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Partner */}
      <section className="py-16 bg-surface relative">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="max-w-[1280px] mx-auto px-5 relative z-10">
          <SectionReveal className="text-center mb-12">
            <span className="inline-block text-emerald font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">Partnership Benefits</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Why partner with Renukiran?</h2> 
          </SectionReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: TrendingUp, title: "Carbon Offsetting", desc: "Offset your company's carbon footprint with verified, GPS-tagged tree plantations across India." },
              { icon: BarChart3, title: "ESG Compliance", desc: "Receive audit-ready, quarterly impact reports that meet all ESG compliance requirements." },
              { icon: Users, title: "Community Impact", desc: "Create rural livelihoods while restoring degraded landscapes — real social and environmental ROI." },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -6 }} className="group flex flex-col gap-5 rounded-2xl border border-sand/50 bg-cream/60 backdrop-blur-sm p-8 hover:shadow-xl hover:border-emerald/15 hover:bg-surface transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald/10 to-primary-light/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7 text-emerald" />
                  </div>
                  <h3 className="text-xl font-bold text-forest">{item.title}</h3>
                  <p className="text-earth leading-relaxed text-sm font-accent">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 line-pattern opacity-30"></div>
        <div className="max-w-[1280px] mx-auto px-5 relative z-10">
          <SectionReveal className="text-center mb-12">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">Our Services</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Tailored solutions as per your  CSR goals</h2>
          </SectionReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ngo_csrServices.map((s, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -6 }} className="flex flex-col gap-5 rounded-2xl bg-surface p-8 border border-sand/50 shadow-sm hover:shadow-xl hover:border-emerald/15 transition-all duration-300 group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald/10 to-primary-light/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <s.icon className="w-7 h-7 text-emerald" />
                  </div>
                  <h3 className="text-xl font-bold text-forest">{s.title}</h3>
                  <p className="text-earth text-sm leading-relaxed font-accent">{s.desc}</p>
                  <ul className="space-y-2 mt-auto pt-4 border-t border-sand/30">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-earth font-accent">
                        <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-surface relative">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="max-w-[1280px] mx-auto px-5 relative z-10">
          <SectionReveal className="text-center mb-12">
            <h2 className="heading-serif text-3xl font-black text-forest">How it works</h2>
          </SectionReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: "01", icon: Phone, title: "Connect", desc: "Share your CSR goals and budget with our team" },
              { step: "02", icon: FileText, title: "Plan", desc: "We design a customized plantation strategy." },
              { step: "03", icon: Leaf, title: "Execute", desc: "Trees planted with full documentation & geo-tagging." },
              { step: "04", icon: BarChart3, title: "Report", desc: "ESG-compliant impact reports delivered quarterly." },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -4 }} className="relative flex flex-col gap-4 p-6 rounded-2xl bg-cream/60 backdrop-blur-sm border border-transparent hover:border-emerald/10 transition-all group">
                  <span className="text-4xl font-black text-emerald/10 heading-serif">{item.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald/10 to-primary-light/10 flex items-center justify-center group-hover:from-emerald/20 transition-colors">
                    <item.icon className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="text-lg font-bold text-forest">{item.title}</h3>
                  <p className="text-sm text-earth font-accent">{item.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute top-14 -right-3 w-6 h-0.5 bg-emerald/15"></div>}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Step Form */}
      <section id="contact" className="py-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="max-w-3xl mx-auto px-5 relative z-10">
          <SectionReveal className="text-center mb-10">
            <span className="inline-block text-emerald font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">Get Started</span>
            <h2 className="heading-serif text-3xl font-black text-forest mb-2">Partner with Renukiran</h2>
            <p className="text-earth text-sm font-accent">Our CSR team will respond within 24 hours hopefully</p>
          </SectionReveal>

          {ngo_submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-12 rounded-2xl bg-emerald/5 border border-emerald/15">
              <CheckCircle className="w-12 h-12 text-emerald mx-auto mb-4" />
              <h3 className="heading-serif text-2xl font-bold text-forest mb-2">Thank You!</h3>
              <p className="text-earth font-accent">Our team will reach out within 24 hours hopefully</p>
            </motion.div>
          ) : (
            <div className="bg-surface rounded-2xl p-8 border border-sand/50 shadow-lg">
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {[0, 1, 2].map((step) => (
                  <div key={step} className="flex-1 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${ngo_formStep >= step ? "bg-emerald text-white" : "bg-cream text-earth border border-sand/50"}`}>
                      {ngo_formStep > step ? <CheckCircle className="w-4 h-4" /> : step + 1}
                    </div>
                    {step < 2 && <div className={`flex-1 h-0.5 rounded-full transition-all ${ngo_formStep > step ? "bg-emerald" : "bg-sand/50"}`}></div>}
                  </div>
                ))}
              </div>

              <form onSubmit={ngo_handleSubmit}>
                <AnimatePresence mode="wait">
                  {ngo_formStep === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-forest">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-forest mb-2">Company Name *</label>
                          <input type="text" required className="w-full rounded-xl border border-sand/50 bg-cream px-4 py-3 text-sm focus:border-emerald focus:ring-1 focus:ring-emerald/30 focus:outline-none transition-colors" placeholder="Your company" value={ngo_formData.company} onChange={(e) => setNgoFormData({...ngo_formData, company: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-forest mb-2">Work Email *</label>
                          <input type="email" required className="w-full rounded-xl border border-sand/50 bg-cream px-4 py-3 text-sm focus:border-emerald focus:ring-1 focus:ring-emerald/30 focus:outline-none transition-colors" placeholder="you@company.com" value={ngo_formData.email} onChange={(e) => setNgoFormData({...ngo_formData, email: e.target.value})} />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <motion.button whileTap={{ scale: 0.95 }} type="button" onClick={ngo_nextStep} className="h-11 px-8 rounded-full bg-emerald text-white font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                          Next <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {ngo_formStep === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-forest">CSR Goals</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-forest mb-2">Phone</label>
                          <input type="tel" className="w-full rounded-xl border border-sand/50 bg-cream px-4 py-3 text-sm focus:border-emerald focus:ring-1 focus:ring-emerald/30 focus:outline-none transition-colors" placeholder="+91 98765 43210" value={ngo_formData.phone} onChange={(e) => setNgoFormData({...ngo_formData, phone: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-forest mb-2">Number of Trees</label>
                          <select className="w-full rounded-xl border border-sand/50 bg-cream px-4 py-3 text-sm focus:border-emerald focus:ring-1 focus:ring-emerald/30 focus:outline-none transition-colors" value={ngo_formData.trees} onChange={(e) => setNgoFormData({...ngo_formData, trees: e.target.value})}>
                            <option value="">Select range</option>
                            <option>100 – 500</option>
                            <option>500 – 1,000</option>
                            <option>1,000 – 5,000</option>
                            <option>5,000+</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button type="button" onClick={ngo_prevStep} className="h-11 px-6 rounded-full border border-sand/50 text-forest font-bold text-sm hover:bg-cream transition-colors">Back</button>
                        <motion.button whileTap={{ scale: 0.95 }} type="button" onClick={ngo_nextStep} className="h-11 px-8 rounded-full bg-emerald text-white font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                          Next <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {ngo_formStep === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <h3 className="text-lg font-bold text-forest">Additional Details</h3>
                      <div>
                        <label className="block text-sm font-bold text-forest mb-2">Message</label>
                        <textarea rows={4} className="w-full rounded-xl border border-sand/50 bg-cream px-4 py-3 text-sm focus:border-emerald focus:ring-1 focus:ring-emerald/30 focus:outline-none transition-colors resize-none" placeholder="Tell us about your CSR goals..." value={ngo_formData.message} onChange={(e) => setNgoFormData({...ngo_formData, message: e.target.value})}></textarea>
                      </div>
                      <div className="flex justify-between">
                        <button type="button" onClick={ngo_prevStep} className="h-11 px-6 rounded-full border border-sand/50 text-forest font-bold text-sm hover:bg-cream transition-colors">Back</button>
                        <motion.button whileTap={{ scale: 0.95 }} type="submit" className="h-11 px-10 rounded-full bg-gradient-gold text-white font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
                          Submit Enquiry <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          )}
        </div>
      </section>
      <div className="h-0 bg-cream"></div>
    </main>
  );
}

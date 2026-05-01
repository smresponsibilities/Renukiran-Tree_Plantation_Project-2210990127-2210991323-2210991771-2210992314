"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trees, CloudRain, ThermometerSun, Skull, Wind, Heart, Droplets, Bird, Sparkles, Star, ArrowRight, Building2, FileText, Leaf, Gift, Baby, GraduationCap, HeartHandshake, Cake, Flower2, TreePine, TreeDeciduous, Sprout } from "lucide-react";
import SectionReveal, { StaggerContainer, StaggerItem } from "../components/SectionReveal";
import AnimatedCounter from "../components/AnimatedCounter";
import ParticleField from "../components/ParticleField";
import Marquee from "../components/Marquee";

// jhuthe
const ngo_testimonials = [
  { name: "Priya Sharma", location: "Mumbai", text: "Planted 10 trees for my daughter's birthday. Received GPS coordinates and beautiful certificates! Truly transparent.", rating: 5 },
  { name: "Rahul Verma", location: "Delhi", text: "Our company partnered with Renukiran for CSR. The audit-ready reports and real impact tracking are exceptional.", rating: 5 },
  { name: "Anita Krishnan", location: "Bangalore", text: "Gifted trees to memorialize my grandmother. The team was compassionate, and I can see the trees growing through updates.", rating: 5 },
  { name: "Vikram Singh", location: "Jaipur", text: "The geo-tagging feature is incredible. I can pinpoint exactly where each of my 50 trees stands. Amazing transparency!", rating: 5 },
  { name: "Meera Patel", location: "Ahmedabad", text: "Best CSR initiative we've partnered with. Quarterly reports are audit-ready and the impact is visible.", rating: 5 },
  { name: "Arjun Reddy", location: "Hyderabad", text: "The digital certificate for each tree is beautifully designed. Makes for a perfect green gift.", rating: 5 },
];

// sache
const ngo_focusAreas = [
  { title: "Agroforestry", desc: "Empowering farmers with sustainable agriculture and tree planting.", icon: Sprout, image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=600" },
  { title: "Miyawaki Forests", desc: "Dense, native forests in urban areas — 30x denser, 10x faster.", icon: Trees, image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600" },
  { title: "Mangrove Restoration", desc: "Protecting coastal ecosystems and marine biodiversity.", icon: Droplets, image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?auto=format&fit=crop&q=80&w=600" },
  { title: "Rural Reforestation", desc: "Revitalizing rural landscapes for biodiversity & local economies.", icon: TreeDeciduous, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600" },
  { title: "Urban Green Spaces", desc: "Transforming cities to improve air quality and reduce heat.", icon: Building2, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600" },
  { title: "Food Forests", desc: "Self-sustaining ecosystems that provide continuous edible harvests.", icon: TreePine, image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" },
];

const ngo_occasions = [
  { icon: Cake, label: "Birthday", color: "from-pink-500/20 to-rose-500/20" },
  { icon: Flower2, label: "Mother", color: "from-purple-500/20 to-fuchsia-500/20" },
  { icon: Gift, label: "Gift", color: "from-emerald/20 to-green-500/20" },
  { icon: Heart, label: "Memorial", color: "from-amber-500/20 to-orange-500/20" },
  { icon: HeartHandshake, label: "Women's Day", color: "from-violet-500/20 to-indigo-500/20" },
  { icon: Sparkles, label: "Anniversary", color: "from-yellow-500/20 to-amber-500/20" },
];

export default function Home() {
  return (
    <div className="relative flex flex-col w-full overflow-x-hidden">

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-forest/20 min-h-[580px] flex items-center">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-cover bg-center scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80")'}}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-forest/80 to-forest/40"></div>
            </div>

            {/* Particles */}
            <ParticleField particleCount={35} speed={0.25} maxSize={3} />

            {/* Content */}
            <div className="relative z-20 max-w-2xl px-8 md:px-14 py-14 flex flex-col gap-7">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent backdrop-blur-md border border-accent/20"
              >
                <span className="w-2 h-2 rounded-full bg-accent anim-pulse-dot"></span>
                Mission 2030
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="heading-serif text-4xl font-black leading-[1.08] text-white md:text-[56px]"
              >
                Every tree you plant<br/>
                <span className="text-gradient-gold">is a breath of life</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base text-white/60 md:text-lg leading-relaxed max-w-lg"
              >
                Join 25,000+ Indians who are restoring our planet through Renukiran Foundation. Plant a tree with GPS tracking, 3-year care guarantee, and a digital certificate.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mt-1"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/marketplace" className="h-13 px-8 flex items-center justify-center gap-2 rounded-full bg-gradient-gold text-white text-[15px] font-bold shadow-xl shadow-accent/25 transition-shadow hover:shadow-2xl hover:shadow-accent/35">
                    <Leaf className="w-4 h-4" />
                    Plant a Tree — ₹299
                  </Link>
                </motion.div>
                <Link href="/tracking" className="h-13 px-8 flex items-center justify-center gap-2 rounded-full bg-white/8 backdrop-blur-md border border-white/15 text-white text-[15px] font-semibold hover:bg-white/15 transition-all">
                  View Our Impact <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="relative z-30 mx-4 md:mx-10 -mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {[
              { icon: Trees, value: 12, suffix: "L+", label: "Trees Planted", gradient: "from-emerald/15 to-primary-light/10" },
              { icon: Wind, value: 50, suffix: "k Tons", label: "CO₂ Offset", gradient: "from-sky-500/10 to-blue-500/10" },
              { icon: Heart, value: 25, suffix: "k+", label: "Happy Donors", gradient: "from-rose-500/10 to-pink-500/10" },
              { icon: Sparkles, value: 150, suffix: "+", label: "Locations", gradient: "from-amber-500/10 to-yellow-500/10" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass flex flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-forest" />
                </div>
                <p className="text-xl sm:text-2xl font-black text-forest heading-serif">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-earth uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ THE PROBLEM ═══════════ */}
      <section className="py-20 md:py-28 bg-gradient-forest text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.04]"></div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center mb-16">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">The Crisis</span>
            <h2 className="heading-serif text-3xl md:text-5xl font-black leading-tight mb-4">
              Our forests are<br className="hidden md:block"/> <span className="text-gradient-gold">disappearing</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto font-accent">The data is alarming. But every crisis is also an opportunity to act.</p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Skull, stat: "7M", label: "deaths from pollution per year" },
              { icon: TreeDeciduous, stat: "83%", label: "wildlife lost to habitat destruction" },
              { icon: ThermometerSun, stat: "1.5°C", label: "global warming target at risk" },
              { icon: CloudRain, stat: "40%", label: "of Earth's land is degraded" },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(212,165,55,0.3)" }}
                  className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.04] border border-white/8 backdrop-blur-sm transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                    <item.icon className="w-7 h-7 text-accent/80 group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-4xl font-black text-accent mb-2 heading-serif">{item.stat}</p>
                  <p className="text-white/40 text-sm font-accent">{item.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ ONE TREE CAN ═══════════ */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center mb-16">
            <span className="inline-block text-emerald font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">The Solution</span>
            <h2 className="heading-serif text-3xl md:text-5xl font-black text-forest leading-tight mb-4">
              One tree planted by <span className="text-gradient-green">you</span> can
            </h2>
            <p className="text-earth text-base max-w-xl mx-auto font-accent">You may not have the time to plant hundreds of trees. That&apos;s where Renukiran comes in.</p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Wind, title: "Generate Oxygen", desc: "Sufficient for one person for an entire year", gradient: "from-sky-500/10 to-blue-500/10" },
              { icon: Leaf, title: "Offset Carbon", desc: "Offset your carbon footprint for 2 full weeks", gradient: "from-emerald/10 to-green-500/10" },
              { icon: Sparkles, title: "Economic Value", desc: "Provide ₹75,000 in ecological value per year", gradient: "from-amber-500/10 to-yellow-500/10" },
              { icon: Bird, title: "Support Wildlife", desc: "Habitat & food for 32+ birds and animals", gradient: "from-violet-500/10 to-purple-500/10" },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center text-center p-8 rounded-2xl bg-surface/80 backdrop-blur-sm border border-sand/50 shadow-sm hover:shadow-xl hover:shadow-forest/5 hover:border-emerald/15 transition-all duration-400 group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-forest" />
                  </div>
                  <h3 className="text-lg font-bold text-forest mb-2">{item.title}</h3>
                  <p className="text-earth text-sm leading-relaxed font-accent">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <SectionReveal delay={0.3} className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/marketplace" className="inline-flex h-13 px-10 items-center justify-center gap-2 rounded-full bg-gradient-gold text-white text-[15px] font-bold shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/30 transition-shadow">
                <Leaf className="w-4 h-4" />
                Plant Your Tree — ₹299
              </Link>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 bg-surface relative">
        <div className="absolute inset-0 line-pattern opacity-30"></div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block text-emerald font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">How It Works</span>
              <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest leading-tight mb-3">
                Plant a tree in <span className="text-gradient-green">4 simple steps</span>
              </h2>
              <p className="text-earth text-base font-accent flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald" /> 4ft Tree + 3 Years Care + GeoTag — starting at just ₹299</p>
            </div>
            <Link href="/mission" className="hidden md:flex items-center gap-2 text-emerald font-bold text-sm hover:gap-3 transition-all">
              See our full process <ArrowRight className="w-4 h-4" />
            </Link>
          </SectionReveal>

          <StaggerContainer className="grid gap-8 md:grid-cols-4 relative">
            {/* Connector line behind cards (desktop only) */}
            <div className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] z-0">
              <div className="w-full h-full border-t-2 border-dashed border-emerald/30"></div>
            </div>
            {[
              { step: "01", icon: Gift, title: "Choose & Pay", desc: "Select a tree species or gift occasion. Pay securely via UPI, card, or net banking." },
              { step: "02", icon: Sprout, title: "We Plant", desc: "Our team plants the sapling at a verified location within 15 days of your order." },
              { step: "03", icon: Sparkles, title: "Get Proof", desc: "Receive geo-tagged photos, GPS coordinates, and a personalized digital certificate." },
              { step: "04", icon: Trees, title: "Track Growth", desc: "Monitor your tree's growth through periodic photo updates for 3 continuous years." },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col gap-4 rounded-2xl bg-white p-8 border border-sand/60 hover:border-emerald/20 hover:shadow-xl hover:shadow-forest/5 transition-all duration-300 z-10"
                >
                  {/* Step number circle */}
                  <div className="w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center border-2 border-emerald/20 group-hover:bg-emerald/15 transition-colors">
                    <span className="text-lg font-black text-emerald heading-serif">{item.step}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald/10 to-primary-light/10 flex items-center justify-center group-hover:from-emerald/20 group-hover:to-primary-light/15 transition-colors">
                    <item.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="text-lg font-bold text-forest">{item.title}</h3>
                  <p className="text-earth text-sm leading-relaxed font-accent">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ GIFT OCCASIONS ═══════════ */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center mb-16">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">Gift a Living Legacy</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest leading-tight mb-3">
              Plant a tree for every occasion
            </h2>
            <p className="text-earth max-w-xl mx-auto font-accent">Create eternal memories with a tree planted in their name. Each comes with a beautiful digital certificate.</p>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ngo_occasions.map((item, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="/marketplace" className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-surface/80 backdrop-blur-sm border border-sand/50 hover:shadow-xl hover:border-accent/20 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-7 h-7 text-forest/70" />
                    </div>
                    <p className="text-sm font-bold text-forest">{item.label}</p>
                    <p className="text-xs text-accent font-semibold font-accent">From ₹299</p>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ FOCUS AREAS ═══════════ */}
      <section className="py-20 md:py-28 bg-surface relative">
        <div className="absolute inset-0 grid-pattern opacity-40"></div>
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal className="text-center mb-16">
            <span className="inline-block text-emerald font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">Where We Work</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">Our Focus Areas</h2>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ngo_focusAreas.map((area, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl overflow-hidden h-72 border border-sand/50 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${area.image}")` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 border border-white/10">
                      <area.icon className="w-5 h-5 text-emerald" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{area.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed font-accent mb-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{area.desc}</p>
                    <Link href="/tracking" className="inline-flex items-center gap-1 text-sm text-emerald font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      View Projects <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <SectionReveal className="text-center mb-12">
            <span className="inline-block text-accent font-bold tracking-[0.15em] uppercase text-xs mb-4 font-accent">4.5★ Average Rating</span>
            <h2 className="heading-serif text-3xl md:text-4xl font-black text-forest">What our donors say</h2>
          </SectionReveal>
        </div>

        <Marquee speed={40} pauseOnHover>
          {ngo_testimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] flex flex-col gap-4 rounded-2xl bg-surface/90 backdrop-blur-sm p-6 border border-sand/50 shadow-sm hover:shadow-lg hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-earth text-sm leading-relaxed font-accent">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-sand/50">
                <div className="size-10 rounded-full bg-gradient-to-br from-emerald to-primary-light flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-forest">{t.name}</p>
                  <p className="text-xs text-earth font-accent">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ═══════════ CSR SECTION ═══════════ */}
      <section className="py-20 md:py-28 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <SectionReveal direction="left" className="flex flex-col gap-6 md:w-1/2">
              <span className="text-accent font-bold tracking-[0.15em] uppercase text-xs font-accent">For Startups & Corporates</span>
              <h2 className="heading-serif text-3xl md:text-5xl font-black text-forest leading-tight">
                CSR Partnerships that <span className="text-gradient-gold">create impact</span>
              </h2>
              <p className="text-earth text-base leading-relaxed font-accent">
                Engage effortlessly in impactful CSR with streamlined, transparent tree plantation initiatives. Get audit-ready ESG reports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/csr" className="w-fit h-12 flex items-center justify-center px-8 rounded-full bg-forest text-white text-sm font-bold hover:bg-forest-light transition-all shadow-lg hover:shadow-xl gap-2">
                    Partner With Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <a href="/brochure.pdf" download className="w-fit h-12 flex items-center justify-center px-8 rounded-full border-2 border-sand text-forest text-sm font-bold hover:border-emerald hover:text-emerald transition-all gap-2">
                  <FileText className="w-4 h-4" />
                  Download Brochure
                </a>
              </div>
            </SectionReveal>

            <SectionReveal direction="right" className="md:w-1/2">
              <div className="rounded-3xl overflow-hidden h-80 w-full shadow-2xl shadow-forest/15 relative group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80")'}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-0 bg-surface"></div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Info, Leaf, Search, ArrowRight, TreeDeciduous, Heart, Sparkles, Check, Minus, Plus, Star, Cake, Flower2, Gift, Flame, User, Gem, GraduationCap, Baby } from "lucide-react";
import TreeInfoPopup from "../../components/TreeInfoPopup";
import { useCart } from "../../components/CartProvider";
import SectionReveal from "../../components/SectionReveal";
import TiltCard from "../../components/TiltCard";

interface NgoTree {
  id: string | number;
  name: string;
  price: number;
  type: string;
  img: string;
}

const ngo_typeIcons: Record<string, any> = {
  "Fruit Bearing": TreeDeciduous,
  "Medicinal": Leaf,
  "Shade Giving": Heart,
};

export default function Marketplace() {
  const [ngo_trees, setNgoTrees] = useState<NgoTree[]>([]);
  const [ngo_loading, setNgoLoading] = useState(true);
  const [ngo_activeFilters, setNgoActiveFilters] = useState<string[]>(["Fruit Bearing", "Medicinal", "Shade Giving"]);
  const [ngo_sortBy, setNgoSortBy] = useState("recommended");
  const [ngo_quantities, setNgoQuantities] = useState<Record<string, number>>({});
  const [ngo_selectedTree, setNgoSelectedTree] = useState<string | null>(null);
  const [ngo_addedId, setNgoAddedId] = useState<string | number | null>(null);
  const { ngo_addToCart } = useCart();

  const ngo_handleAddToCart = (tree: NgoTree) => {
    const ngo_qty = ngo_quantities[tree.id] || 1;
    ngo_addToCart({ id: tree.id, name: tree.name, img: tree.img, price: tree.price * 12 }, ngo_qty);
    setNgoAddedId(tree.id);
    setTimeout(() => setNgoAddedId(null), 1500);
  };

  useEffect(() => {
    async function ngo_fetchTrees() {
      try {
        const ngo_res = await fetch("/api/trees");
        if (!ngo_res.ok) { setNgoLoading(false); return; }
        const ngo_data = await ngo_res.json();
        if (!Array.isArray(ngo_data)) { setNgoLoading(false); return; }
        const ngo_enhancedData = await Promise.all(ngo_data.map(async (t: NgoTree) => {
          try {
            let ngo_query = t.name.trim();
            let ngo_wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ngo_query)}`);
            if (!ngo_wikiRes.ok) {
              ngo_query = t.name.replace(/Tree/ig, "").trim();
              ngo_wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ngo_query)}`);
            }
            if (ngo_wikiRes.ok) {
              const ngo_wikiData = await ngo_wikiRes.json();
              if (ngo_wikiData.thumbnail?.source) return { ...t, img: ngo_wikiData.thumbnail.source };
            }
            return t;
          } catch { return t; }
        }));
        setNgoTrees(ngo_enhancedData);
      } catch {
        // API unavailable — handled gracefully
      } finally {
        setNgoLoading(false);
      }
    }
    ngo_fetchTrees();
  }, []);

  const ngo_toggleFilter = (f: string) =>
    setNgoActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

  const ngo_filteredTrees = ngo_trees
    .filter((t) => ngo_activeFilters.includes(t.type))
    .sort((a, b) => {
      if (ngo_sortBy === "price-low") return a.price - b.price;
      if (ngo_sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const ngo_updateQty = (id: string | number, delta: number) =>
    setNgoQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));

  const NgoSkeletonCard = () => (
    <div className="bg-surface rounded-2xl border border-sand/50 overflow-hidden">
      <div className="h-52 bg-sand/40 anim-shimmer"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-cream-dark/60 rounded-lg w-3/4"></div>
        <div className="h-4 bg-cream/80 rounded-lg w-1/2"></div>
        <div className="h-4 bg-cream/60 rounded-lg w-full"></div>
        <div className="h-11 bg-cream-dark/50 rounded-xl mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full">
      {/* Hero */}
      <section className="p-5 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl min-h-[320px] flex items-center shadow-2xl shadow-forest/15 group"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-forest/70 to-transparent z-10"></div>
            <img alt="Planting" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1200&q=80" />
          </div>
          <div className="relative z-20 flex flex-col justify-center max-w-2xl px-8 md:px-14 py-12">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-accent backdrop-blur-md border border-accent/20 mb-5">
              <Leaf className="w-3 h-3" /> 4.1ft Tree + 3 Years Care + GeoTag
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="heading-serif text-white text-3xl md:text-5xl font-black leading-tight mb-4">
              Gift a tree<br/>every special moment
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 text-base mb-6 max-w-lg leading-relaxed font-accent">
              Celebrate birthdays, memorials, and anniversaries with a living legacy. Starting at just 299 with digital certificate.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-3">
              {["4.5★ Rating", "1.2M+ Trees", "GPS Tracking", "3-Year Care"].map((tag) => (
                <span key={tag} className="text-[11px] font-bold text-white/50 bg-white/8 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/8 font-accent">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Occasion Quick-Picks */}
      <section className="px-5 md:px-8">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
          {[
            { icon: Cake, label: "Birthday", gradient: "from-rose-500/15 to-pink-500/15" },
            { icon: Flower2, label: "For Mother", gradient: "from-purple-500/15 to-fuchsia-500/15" },
            { icon: Gift, label: "Gift", gradient: "from-emerald/15 to-green-500/15" },
            { icon: Flame, label: "Memorial", gradient: "from-amber-500/15 to-orange-500/15" },
            { icon: User, label: "Women's Day", gradient: "from-violet-500/15 to-indigo-500/15" },
            { icon: Gem, label: "Anniversary", gradient: "from-yellow-500/15 to-amber-500/15" },
            { icon: GraduationCap, label: "Graduation", gradient: "from-sky-500/15 to-blue-500/15" },
            { icon: Baby, label: "New Baby", gradient: "from-pink-500/15 to-rose-500/15" },
          ].map((occ, i) => {
            const NgoOccIcon = occ.icon;
            return (
              <motion.button whileHover={{ y: -2 }} key={i} className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full bg-surface border border-sand/50 hover:border-emerald/20 hover:shadow-md transition-all duration-200 group">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${occ.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <NgoOccIcon className="w-4 h-4 text-forest/70" />
                </div>
                <span className="text-[13px] font-semibold text-forest whitespace-nowrap">{occ.label}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8 px-5 md:px-8 pb-12 mt-4">
        {/* Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
          <SectionReveal>
            <div className="bg-surface rounded-2xl p-6 border border-sand/50 shadow-sm">
              <h3 className="font-bold text-forest mb-4 flex items-center gap-2 text-sm">
                <Search className="w-4 h-4 text-emerald" /> Filter by Type
              </h3>
              <div className="space-y-3">
                {["Fruit Bearing", "Medicinal", "Shade Giving"].map((filter) => {
                  const NgoFilterIcon = ngo_typeIcons[filter] || Leaf;
                  return (
                    <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-sage text-emerald focus:ring-emerald/30 w-4 h-4 accent-emerald"
                        checked={ngo_activeFilters.includes(filter)}
                        onChange={() => ngo_toggleFilter(filter)}
                      />
                      <NgoFilterIcon className="w-4 h-4 text-earth group-hover:text-emerald transition-colors" />
                      <span className="text-sm text-dark/70 group-hover:text-emerald transition-colors font-medium">{filter}</span>
                      <span className="ml-auto text-[11px] text-earth bg-cream rounded-full px-2 py-0.5 font-semibold">
                        {ngo_trees.filter((t) => t.type === filter).length}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="bg-gradient-to-br from-emerald/5 via-cream to-accent/5 rounded-2xl p-6 border border-emerald/8">
              <h3 className="font-bold text-forest mb-4 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> What You Get
              </h3>
              <ul className="space-y-2.5 text-sm text-earth font-accent">
                {[
                  "4ft tree planted in your name",
                  "3 years of care & maintenance",
                  "GPS coordinates & geo-tagged photos",
                  "Personalized digital certificate",
                  "Periodic growth photo updates",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </aside>

        {/* Tree Grid */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="heading-serif text-2xl font-bold text-forest">Choose a Tree</h2>
              <p className="text-sm text-earth mt-1 font-accent">{ngo_filteredTrees.length} Trees available</p>
            </div>
            <select
              className="bg-surface border border-sand/50 text-sm font-medium text-forest rounded-xl py-2 pl-4 pr-8 cursor-pointer hover:border-emerald/30 transition-colors focus:ring-1 focus:ring-emerald/30 focus:border-emerald focus:outline-none"
              value={ngo_sortBy}
              onChange={(e) => setNgoSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {ngo_loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => <NgoSkeletonCard key={i} />)}
            </div>
          ) : ngo_filteredTrees.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-earth bg-surface rounded-2xl border border-sand/50">
              <Search className="w-12 h-12 text-earth/30 mb-4" />
              <p className="font-bold text-lg text-forest">No trees match your filters sorry</p>
              <p className="text-sm font-accent mb-4">Try adjusting the filters above please</p>
              <button onClick={() => setNgoActiveFilters(["Fruit Bearing", "Medicinal", "Shade Giving"])} className="text-sm text-emerald font-bold hover:underline">
                Reset all filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {ngo_filteredTrees.map((tree) => {
                  const NgoTypeIcon = ngo_typeIcons[tree.type] || Leaf;
                  return (
                    <motion.div
                      key={tree.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group bg-surface rounded-2xl border border-sand/50 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-forest/5 hover:border-emerald/15 transition-shadow duration-300 flex flex-col"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img src={tree.img} alt={tree.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className="text-[11px] font-bold bg-surface/90 backdrop-blur-sm text-forest px-3 py-1.5 rounded-full border border-sand/50 flex items-center gap-1.5">
                            <NgoTypeIcon className="w-3 h-3 text-emerald" /> {tree.type}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="text-[11px] font-bold bg-gradient-gold text-white px-3 py-1.5 rounded-full shadow-md">
                            ₹{tree.price * 12}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-lg text-forest mb-1">{tree.name}</h3>
                        <div className="flex items-center gap-1 mb-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="w-3.5 h-3.5 text-accent fill-accent" />
                          ))}
                          <span className="text-[11px] text-earth ml-1 font-accent">(4.5)</span>
                        </div>
                        <p className="text-xs text-earth mb-4 flex items-center gap-1 font-accent">
                          <Leaf className="w-3 h-3 text-emerald" /> 4ft Tree + 3 Years Care + GeoTag
                        </p>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-semibold text-earth font-accent">Qty:</span>
                          <div className="flex items-center border border-sand/50 rounded-lg overflow-hidden">
                            <button className="px-3 py-1.5 text-sm hover:bg-cream transition-colors text-earth" onClick={() => ngo_updateQty(tree.id, -1)}><Minus className="w-3 h-3" /></button>
                            <span className="px-3 py-1.5 text-sm font-bold border-x border-sand/50 min-w-[40px] text-center text-forest">{ngo_quantities[tree.id] || 1}</span>
                            <button className="px-3 py-1.5 text-sm hover:bg-cream transition-colors text-earth" onClick={() => ngo_updateQty(tree.id, 1)}><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="ml-auto font-black text-lg text-forest heading-serif">
                            ₹{(tree.price * 12) * (ngo_quantities[tree.id] || 1)}
                          </span>
                        </div>

                        <div className="mt-auto flex flex-col gap-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => ngo_handleAddToCart(tree)}
                            disabled={ngo_addedId === tree.id}
                            className={`w-full font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                              ngo_addedId === tree.id
                                ? "bg-emerald text-white cursor-not-allowed"
                                : "bg-forest text-white hover:bg-gradient-gold shadow-md hover:shadow-lg"
                            }`}
                          >
                            {ngo_addedId === tree.id ? (
                              <><Check className="w-4 h-4" /> Added to Cart</>
                            ) : (
                              <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                            )}
                          </motion.button>
                          <button
                            onClick={() => setNgoSelectedTree(tree.name)}
                            className="w-full font-semibold py-2.5 rounded-xl bg-surface border border-sand/50 text-forest hover:bg-cream transition-colors text-sm flex items-center justify-center gap-2"
                          >
                            <Info className="w-4 h-4 text-earth" /> More Info
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </div>

      <TreeInfoPopup 
        isOpen={!!ngo_selectedTree} 
        treeName={ngo_selectedTree} 
        onClose={() => setNgoSelectedTree(null)} 
      />
    </div>
  );
}

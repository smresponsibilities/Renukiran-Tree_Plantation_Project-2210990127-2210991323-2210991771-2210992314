"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Leaf, Globe, FileText, Building2, LogOut, MapPin, DollarSign, Lock, Inbox, AlertTriangle } from "lucide-react";

// admin at /admin route who would have thought 
export default function AdminPanel() {
  const [ngo_activeTab, setNgoActiveTab] = useState("trees");
  const [ngo_data, setNgoData] = useState<any>({ trees: [], projects: [], orders: [], partners: [] });
  const ngo_router = useRouter();

  const [ngo_adminError, setNgoAdminError] = useState("");

  useEffect(() => {
    ngo_fetchData();
  }, [ngo_activeTab]);

  const ngo_fetchData = async () => {
    setNgoAdminError("");
    try {
      const ngo_res = await fetch(`/api/admin/${ngo_activeTab}`, { cache: "no-store" });
      if (!ngo_res.ok) {
        const ngo_text = await ngo_res.text();
        setNgoAdminError(`ERROR at even admin: ${ngo_res.status} - ${ngo_text.substring(0, 100)}`);
        return;
      }
      const ngo_json = await ngo_res.json();
      if (ngo_json.error) {
        setNgoAdminError(ngo_json.error);
        toast.error(ngo_json.error);
      }
      setNgoData((prev: any) => ({ ...prev, [ngo_activeTab]: ngo_json.data || [] }));
    } catch(e: any) {
      setNgoAdminError(e.message);
      toast.error(e.message);
    }
  };

  const ngo_handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logout successful! Thank you for managing the platform.");
    ngo_router.push("/login");
  };

  const [ngo_newTree, setNgoNewTree] = useState({ name: "", price: "", type: "", img: "" });
  const ngo_handleAddTree = async (e: React.FormEvent) => {
    e.preventDefault();
    const ngo_res = await fetch("/api/admin/trees", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ngo_newTree) 
    });
    if (ngo_res.ok) {
      toast.success("Creation successful");
    } else {
      toast.error("Failed to add tree hawww");
    }
    setNgoNewTree({ name: "", price: "", type: "", img: "" });
    ngo_fetchData();
  };

  const [ngo_newProject, setNgoNewProject] = useState({ title: "", description: "", location: "", targetTrees: "" });
  const ngo_handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setNgoAdminError("");
    const ngo_res = await fetch("/api/admin/projects", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...ngo_newProject, targetTrees: Number(ngo_newProject.targetTrees) || 100 }) 
    });
    const ngo_json = await ngo_res.json();
    if (!ngo_res.ok || ngo_json.error) {
      setNgoAdminError(ngo_json.error || "POST Failed");
      toast.error(ngo_json.error || "Failed to add project oopsie");
      return;
    }
    toast.success("Project Created");
    setNgoNewProject({ title: "", description: "", location: "", targetTrees: "" });
    ngo_fetchData();
  };

  const [ngo_newPartner, setNgoNewPartner] = useState({ companyName: "", logoUrl: "", treesSponsored: "", description: "" });
  const ngo_handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setNgoAdminError("");
    const ngo_res = await fetch("/api/admin/partners", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...ngo_newPartner, treesSponsored: Number(ngo_newPartner.treesSponsored) || 0 }) 
    });
    const ngo_json = await ngo_res.json();
    if (!ngo_res.ok || ngo_json.error) {
      setNgoAdminError(ngo_json.error || "POST Failed");
      toast.error(ngo_json.error || "Failed to add partner awww");
      return;
    }
    toast.success("Partnership Created");
    setNgoNewPartner({ companyName: "", logoUrl: "", treesSponsored: "", description: "" });
    ngo_fetchData();
  };

  const ngo_handleUpdateProjectTrees = async (projectId: string, amount: number) => {
    if (!amount || isNaN(amount) || amount <= 0) return;
    const ngo_res = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, action: "addTrees", amount })
    });
    if (ngo_res.ok) {
      toast.success(`Update Successful! Thank you for plating this many ${amount} trees to the project.`);
    } else {
      toast.error("Failed to add trees to project unfortunately");
    }
    ngo_fetchData();
  };

  const ngo_handleDeleteItem = async (type: "trees" | "projects" | "partners", id: string) => {
    if (confirm(`Are you sure you want to delete this ${type === "trees" ? "tree" : type === "projects" ? "project" : "partner"}?`)) {
      const ngo_res = await fetch(`/api/admin/${type}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (ngo_res.ok) {
        toast.success("Deletion successful");
      } else {
        toast.error("Failed to delete item lol");
      }
      ngo_fetchData();
    }
  };

  const ngo_validateOrder = async (orderId: string) => {
    const ngo_res = await fetch("/api/admin/orders", { 
      method: "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, validated: true }) 
    });
    if (ngo_res.ok) {
      toast.success("Validation successful");
    } else {
      toast.error("Failed to validate order");
    }
    ngo_fetchData();
  };

  return (
    <div className="flex bg-cream min-h-screen">
      <aside className="w-64 bg-forest text-white flex flex-col pt-[88px] px-4 shadow-xl z-[40]">
        <h2 className="text-xl font-serif font-bold mb-8 px-2 tracking-wide text-sand">Administrator Panel</h2>
        <nav className="flex flex-col gap-2 flex-1">
          <button onClick={() => setNgoActiveTab("trees")} className={`text-left px-5 py-3.5 rounded-xl transition-all font-medium flex items-center gap-3 ${ngo_activeTab === 'trees' ? 'bg-primary text-white shadow-md' : 'text-sand hover:bg-white/10'}`}>
            <Leaf className="w-5 h-5" /> Manage Trees
          </button>
          <button onClick={() => setNgoActiveTab("projects")} className={`text-left px-5 py-3.5 rounded-xl transition-all font-medium flex items-center gap-3 ${ngo_activeTab === 'projects' ? 'bg-primary text-white shadow-md' : 'text-sand hover:bg-white/10'}`}>
            <Globe className="w-5 h-5" /> CSR Projects
          </button>
          <button onClick={() => setNgoActiveTab("orders")} className={`text-left px-5 py-3.5 rounded-xl transition-all font-medium flex items-center gap-3 ${ngo_activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'text-sand hover:bg-white/10'}`}>
            <FileText className="w-5 h-5" /> Validations
          </button>
          <button onClick={() => setNgoActiveTab("partners")} className={`text-left px-5 py-3.5 rounded-xl transition-all font-medium flex items-center gap-3 ${ngo_activeTab === 'partners' ? 'bg-primary text-white shadow-md' : 'text-sand hover:bg-white/10'}`}>
            <Building2 className="w-5 h-5" /> CSR Partners
          </button>
        </nav>
        <button onClick={ngo_handleLogout} className="mb-8 px-5 py-3.5 hover:ring-2 ring-red-500/50 bg-red-500/20 text-red-100 font-bold rounded-xl transition-all flex items-center gap-2">
          <LogOut className="w-4 h-4" /> Secure Logout
        </button>
      </aside>

      <main className="flex-1 p-10 pt-32 overflow-y-auto">
        <h1 className="text-4xl font-serif font-bold text-forest mb-1 capitalize border-b border-sand pb-4">{ngo_activeTab} Management</h1>
        <p className="text-earth text-sm font-medium mb-6">Make dynamic changes directly to the MongoDB backend clusters payload.</p>
        
        {ngo_adminError && (
          <div className="bg-red-50 text-red-500 font-bold p-4 mb-8 rounded-xl border border-red-200 shadow-sm">
            <AlertTriangle className="w-4 h-4" /> Error Occurred: {ngo_adminError}
          </div>
        )}
        
        {ngo_activeTab === "trees" && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <form onSubmit={ngo_handleAddTree} className="bg-white p-7 rounded-[2rem] shadow-xl shadow-forest/5 border border-sand w-full lg:w-1/3 flex flex-col gap-4">
              <h3 className="font-bold text-forest text-lg border-b border-sand pb-3 mb-1">Add New Tree Listing</h3>
              <input placeholder="Ex: Alphonso Mango Tree" required value={ngo_newTree.name} onChange={e => setNgoNewTree({...ngo_newTree, name: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <input placeholder="Monthly Price (INR)" type="number" required value={ngo_newTree.price} onChange={e => setNgoNewTree({...ngo_newTree, price: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <input placeholder="Type (e.g., Fruit Bearing)" required value={ngo_newTree.type} onChange={e => setNgoNewTree({...ngo_newTree, type: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <input placeholder="Image URL (e.g., /amla.jpg)" required value={ngo_newTree.img} onChange={e => setNgoNewTree({...ngo_newTree, img: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <button className="bg-forest mt-2 text-white font-bold py-3.5 rounded-xl hover:bg-primary transition-colors shadow-md">Deploy to Marketplace</button>
            </form>
            <div className="w-full lg:w-2/3 flex flex-col gap-3">
              {ngo_data.trees.map((t: any) => (
                <div key={t._id} className="bg-white p-4 pr-6 rounded-2xl border border-sand flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-center gap-5">
                    <img src={t.img} className="w-16 h-16 rounded-xl object-cover border border-sand shadow-inner" />
                    <div>
                      <p className="font-bold text-forest text-lg">{t.name}</p>
                      <p className="text-[13px] font-semibold text-primary">{t.type} <span className="text-earth mx-2">•</span> <span className="text-bark">₹{t.price} / mo</span></p>
                    </div>
                  </div>
                  <button onClick={() => ngo_handleDeleteItem("trees", t._id)} className="text-[10px] uppercase font-bold text-red-500 px-3 py-1 bg-red-50 rounded-md hover:bg-red-500 hover:text-white transition-colors border border-red-100 shadow-sm">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {ngo_activeTab === "projects" && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <form onSubmit={ngo_handleAddProject} className="bg-white p-7 rounded-[2rem] shadow-xl shadow-forest/5 border border-sand w-full lg:w-1/3 flex flex-col gap-4">
              <h3 className="font-bold text-forest text-lg border-b border-sand pb-3 mb-1">Create CSR Project</h3>
              <input placeholder="Project Title" required value={ngo_newProject.title} onChange={e => setNgoNewProject({...ngo_newProject, title: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <input placeholder="Location Region" required value={ngo_newProject.location} onChange={e => setNgoNewProject({...ngo_newProject, location: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <input placeholder="Target Number of Trees" type="number" required value={ngo_newProject.targetTrees} onChange={e => setNgoNewProject({...ngo_newProject, targetTrees: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <textarea placeholder="Detailed Description" required value={ngo_newProject.description} onChange={e => setNgoNewProject({...ngo_newProject, description: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream h-28 resize-none" />
              <button className="bg-forest mt-2 text-white font-bold py-3.5 rounded-xl hover:bg-primary transition-colors shadow-md">Establish Project</button>
            </form>
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {ngo_data.projects.map((p: any) => (
                <div key={p._id} className="bg-white p-6 justify-between rounded-3xl border border-sand shadow-sm hover:-translate-y-1 transition-transform cursor-default flex flex-col">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-forest text-lg leading-tight w-2/3">{p.title}</p>
                      <button onClick={() => ngo_handleDeleteItem("projects", p._id)} className="text-[10px] uppercase font-bold text-red-500 px-3 py-1 bg-red-50 rounded-full hover:bg-red-500 hover:text-white transition-colors border border-red-100 shadow-sm">Delete</button>
                    </div>
                    <p className="text-xs font-semibold text-earth flex items-center gap-1 mb-3"><MapPin className="w-3 h-3 text-primary" /> {p.location}</p>
                    <p className="text-[13px] text-bark leading-relaxed mb-4">{p.description}</p>
                  </div>
                  
                  <div className="mt-auto border-t border-sand pt-4">
                    <div className="flex justify-between text-xs font-bold text-earth mb-1">
                      <span>{p.treesPlanted || 0} Trees Planted</span>
                      <span>Target: {p.targetTrees || 100}</span>
                    </div>
                    <div className="w-full bg-cream rounded-full h-2.5 mb-4 overflow-hidden border border-sand">
                      <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, ((p.treesPlanted || 0) / (p.targetTrees || 100)) * 100)}%` }}></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="number" id={`treeCount-${p._id}`} placeholder="Qty" className="w-16 border border-sand rounded-xl px-3 py-2 text-sm outline-none bg-cream focus:border-primary focus:ring-1 focus:ring-primary/20 font-bold text-forest" />
                      <button 
                        onClick={() => {
                          const ngo_input = document.getElementById(`treeCount-${p._id}`) as HTMLInputElement;
                          if (ngo_input && ngo_input.value) {
                            ngo_handleUpdateProjectTrees(p._id, parseInt(ngo_input.value));
                            ngo_input.value = "";
                          }
                        }}
                        className="bg-forest text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-primary transition-colors flex-1 shadow-md"
                      >
                        + Add Trees
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {ngo_activeTab === "orders" && (
          <div className="flex flex-col gap-4 w-full lg:w-[80%]">
             {ngo_data.orders.map((o: any) => (
                <div key={o._id} className="bg-white p-6 rounded-[2rem] border border-sand shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-primary/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <p className="font-bold text-forest text-lg">Razorpay Checkout</p>
                       <span className="font-mono text-xs bg-sand text-earth px-2 py-0.5 rounded-md">{o.razorpayOrderId}</span>
                    </div>
                    
                    <p className="text-[13px] text-bark font-medium mb-3">Trees: <span className="text-forest font-bold">{o.trees.map((t: any) => `${t.quantity}x ${t.name}`).join(', ')}</span></p>
                    
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                      <span className="text-forest flex items-center gap-1"><DollarSign className="w-4 h-4" /> ₹{o.totalAmount}</span>
                      <span className={`flex items-center gap-1 ${o.paymentStatus === 'Completed' ? 'text-green-600' : 'text-amber-500'}`}><Lock className="w-4 h-4" /> {o.paymentStatus}</span>
                    </div>
                  </div>
                  <div className="w-full md:w-auto mt-4 md:mt-0">
                    {!o.certificateValidated ? (
                      <button onClick={() => ngo_validateOrder(o._id)} className="w-full md:w-auto bg-primary hover:bg-forest text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-md shadow-primary/20 hover:scale-[1.02]">
                        Generate & Validate Certificate
                      </button>
                    ) : (
                      <span className="w-full md:w-auto flex items-center justify-center gap-2 text-primary font-bold bg-primary/10 border border-primary/20 px-8 py-3.5 rounded-2xl">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Validated
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {ngo_data.orders.length === 0 && (
                <div className="text-center py-20 bg-white border border-sand rounded-3xl">
                  <Inbox className="w-10 h-10 text-earth/30 mx-auto" />
                  <p className="font-bold text-forest mt-4">No tree orders in the database.</p>
                </div>
              )}
          </div>
        )}

        {ngo_activeTab === "partners" && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <form onSubmit={ngo_handleAddPartner} className="bg-white p-7 rounded-[2rem] shadow-xl shadow-forest/5 border border-sand w-full lg:w-1/3 flex flex-col gap-4">
              <h3 className="font-bold text-forest text-lg border-b border-sand pb-3 mb-1">Add Active Partner</h3>
              <input placeholder="Company Name" required value={ngo_newPartner.companyName} onChange={e => setNgoNewPartner({...ngo_newPartner, companyName: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <input placeholder="Logo Image URL" required value={ngo_newPartner.logoUrl} onChange={e => setNgoNewPartner({...ngo_newPartner, logoUrl: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <input placeholder="Trees Sponsored" type="number" required value={ngo_newPartner.treesSponsored} onChange={e => setNgoNewPartner({...ngo_newPartner, treesSponsored: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream" />
              <textarea placeholder="Partnership Description" value={ngo_newPartner.description} onChange={e => setNgoNewPartner({...ngo_newPartner, description: e.target.value})} className="border rounded-xl px-4 py-2.5 w-full outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-cream h-24 resize-none" />
              <button className="bg-forest mt-2 text-white font-bold py-3.5 rounded-xl hover:bg-primary transition-colors shadow-md">Certify Partnership</button>
            </form>
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {ngo_data.partners.map((p: any) => (
                <div key={p._id} className="bg-white p-6 justify-between rounded-3xl border border-sand shadow-sm hover:-translate-y-1 transition-transform cursor-default flex flex-col">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <img src={p.logoUrl} alt="logo" className="h-12 w-auto object-contain max-w-[120px] rounded" />
                      <button onClick={() => ngo_handleDeleteItem("partners", p._id)} className="text-[10px] uppercase font-bold text-red-500 px-3 py-1 bg-red-50 rounded-full hover:bg-red-500 hover:text-white transition-colors border border-red-100 shadow-sm">Delete</button>
                    </div>
                    <p className="font-black text-forest text-xl mb-1">{p.companyName}</p>
                    <p className="text-sm font-bold text-primary mb-3">{(p.treesSponsored || 0).toLocaleString()} Trees Sponsored</p>
                    <p className="text-[13px] text-bark leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

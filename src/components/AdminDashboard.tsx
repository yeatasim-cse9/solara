import React, { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useContent, LandingPageContent } from "../context/ContentContext";
import { 
  LogOut, Save, Image as ImageIcon, Plus, Trash2, Check, 
  Settings, Users, Briefcase, HelpCircle, Phone, Globe, Layers, Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminDashboardProps {
  navigate: (path: string) => void;
}

type TabType = "hero" | "about" | "services" | "specialty" | "projects" | "team" | "pricing" | "faq" | "contact";

export function AdminDashboard({ navigate }: AdminDashboardProps) {
  const { content, loading, saveContent } = useContent();
  const [formState, setFormState] = useState<LandingPageContent | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  
  // Auth state verification
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        const whitelist = ["solarainfo2024@gmail.com"];
        if (!whitelist.includes(user.email || "")) {
          signOut(auth);
          navigate("/login");
        }
      }
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (content) {
      // Deep copy to prevent mutating context state directly
      setFormState(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  if (checkingAuth || loading || !formState) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-brand/40 border-t-brand rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-mono uppercase tracking-widest text-white/50">Loading Admin Dashboard...</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    const success = await saveContent(formState);
    if (success) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  // Helper function to update top-level section fields
  const updateSectionField = (section: keyof LandingPageContent, field: string, value: any) => {
    setFormState(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [section]: {
          ...prev[section] as object,
          [field]: value
        }
      };
    });
  };

  // Tabs layout navigation items
  const menuItems: Array<{ id: TabType; label: string; icon: React.ElementType }> = [
    { id: "hero", label: "Hero Section", icon: Layers },
    { id: "about", label: "About Us", icon: Award },
    { id: "services", label: "Services List", icon: Settings },
    { id: "specialty", label: "Specialty", icon: Settings },
    { id: "projects", label: "Case Studies", icon: Briefcase },
    { id: "team", label: "Solara Squad", icon: Users },
    { id: "pricing", label: "Pricing Packages", icon: Briefcase },
    { id: "faq", label: "FAQs", icon: HelpCircle },
    { id: "contact", label: "Contact Info", icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* Header bar */}
      <header className="h-20 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 md:px-10 shrink-0 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center font-bold text-black text-sm">S</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight uppercase">Solara Control Panel</h1>
            <p className="text-xs text-white/40">Logged in as {auth.currentUser?.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/")}
            className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            Preview Site
          </button>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all"
          >
            <LogOut className="w-4 h-4 text-white/60" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative pb-24 md:pb-0">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 bg-[#080808] border-r border-white/5 p-4 md:py-8 flex flex-col gap-1 shrink-0 overflow-y-auto max-h-[300px] md:max-h-none border-b md:border-b-0">
          <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase px-3 mb-2 block">Site Sections</span>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  active 
                    ? "bg-brand text-white shadow-[0_0_15px_rgba(201,100,66,0.2)]" 
                    : "text-white/50 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-white/40'}`} />
                {item.label}
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#050505]">
          <div className="max-w-4xl mx-auto">
            
            <AnimatePresence mode="wait">
              {/* --- HERO TAB --- */}
              {activeTab === "hero" && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4 mb-6">Hero Section Details</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Hero Title</label>
                      <textarea
                        rows={3}
                        value={formState.hero.title}
                        onChange={(e) => updateSectionField("hero", "title", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-all text-sm font-semibold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Hero Subtitle</label>
                      <textarea
                        rows={4}
                        value={formState.hero.subtitle}
                        onChange={(e) => updateSectionField("hero", "subtitle", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand transition-all text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- ABOUT TAB --- */}
              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4">About Us Section</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Heading Title</label>
                      <input
                        type="text"
                        value={formState.about.heading}
                        onChange={(e) => updateSectionField("about", "heading", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Heading Highlighted Suffix</label>
                      <input
                        type="text"
                        value={formState.about.headingHighlight}
                        onChange={(e) => updateSectionField("about", "headingHighlight", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-brand focus:outline-none focus:border-brand text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50 block">Main Description (Paragraph 1)</label>
                    <textarea
                      rows={4}
                      value={formState.about.paragraph1}
                      onChange={(e) => updateSectionField("about", "paragraph1", e.target.value)}
                      className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand text-sm leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50 block">Sub-Description (Paragraph 2)</label>
                    <textarea
                      rows={4}
                      value={formState.about.paragraph2}
                      onChange={(e) => updateSectionField("about", "paragraph2", e.target.value)}
                      className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-brand text-sm leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Explore Link Text</label>
                      <input
                        type="text"
                        value={formState.about.linkText}
                        onChange={(e) => updateSectionField("about", "linkText", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">About Section Image URL</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"><ImageIcon className="w-4 h-4" /></span>
                        <input
                          type="text"
                          value={formState.about.imageUrl}
                          onChange={(e) => updateSectionField("about", "imageUrl", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {formState.about.imageUrl && (
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-white/30 block">Image Preview</span>
                      <div className="w-full max-w-sm h-48 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                        <img src={formState.about.imageUrl} alt="About Us Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}

                  {/* Stats edit */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Bento Grid Stats</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {formState.about.stats.map((stat, idx) => (
                        <div key={stat.id} className="bg-[#111] border border-white/5 rounded-2xl p-4 space-y-3">
                          <span className="text-xs font-mono text-white/30">Stat 0{idx + 1}</span>
                          <input
                            type="text"
                            value={stat.label}
                            placeholder="Label"
                            onChange={(e) => {
                              const newStats = [...formState.about.stats];
                              newStats[idx].label = e.target.value;
                              updateSectionField("about", "stats", newStats);
                            }}
                            className="w-full bg-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={stat.value}
                              placeholder="Value"
                              onChange={(e) => {
                                const newStats = [...formState.about.stats];
                                newStats[idx].value = e.target.value;
                                updateSectionField("about", "stats", newStats);
                              }}
                              className="w-full bg-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                            <input
                              type="text"
                              value={stat.suffix}
                              placeholder="Suffix"
                              onChange={(e) => {
                                const newStats = [...formState.about.stats];
                                newStats[idx].suffix = e.target.value;
                                updateSectionField("about", "stats", newStats);
                              }}
                              className="w-full bg-black border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pillars Edit */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Core Pillars</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {formState.about.pillars.map((pillar, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={pillar}
                          onChange={(e) => {
                            const newPillars = [...formState.about.pillars];
                            newPillars[idx] = e.target.value;
                            updateSectionField("about", "pillars", newPillars);
                          }}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-sm text-white"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- SERVICES TAB --- */}
              {activeTab === "services" && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4">Services List</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Services Header Subtitle</label>
                      <textarea
                        rows={3}
                        value={formState.services.subtitle}
                        onChange={(e) => updateSectionField("services", "subtitle", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand text-sm leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Individual Services</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const newServices = [...formState.services.list, {
                            id: `0${formState.services.list.length + 1}`,
                            title: "New Service",
                            desc: "Describe this service...",
                            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                          }];
                          updateSectionField("services", "list", newServices);
                        }}
                        className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase bg-brand/10 hover:bg-brand/20 border border-brand/20 text-brand px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Service
                      </button>
                    </div>

                    <div className="space-y-6">
                      {formState.services.list.map((service, idx) => (
                        <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-6 relative group">
                          {/* Trash button */}
                          <button
                            type="button"
                            onClick={() => {
                              const newServices = formState.services.list.filter((_, i) => i !== idx);
                              updateSectionField("services", "list", newServices);
                            }}
                            className="absolute top-4 right-4 text-white/20 hover:text-red-400 p-2 transition-colors rounded-lg bg-black/40 border border-white/5 opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-4 md:col-span-2">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">ID Label</label>
                                  <input
                                    type="text"
                                    value={service.id}
                                    onChange={(e) => {
                                      const newServices = [...formState.services.list];
                                      newServices[idx].id = e.target.value;
                                      updateSectionField("services", "list", newServices);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs"
                                  />
                                </div>
                                <div className="space-y-1 sm:col-span-2">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Service Title</label>
                                  <input
                                    type="text"
                                    value={service.title}
                                    onChange={(e) => {
                                      const newServices = [...formState.services.list];
                                      newServices[idx].title = e.target.value;
                                      updateSectionField("services", "list", newServices);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs font-semibold text-white"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono uppercase text-white/30">Description</label>
                                <textarea
                                  rows={2}
                                  value={service.desc}
                                  onChange={(e) => {
                                    const newServices = [...formState.services.list];
                                    newServices[idx].desc = e.target.value;
                                    updateSectionField("services", "list", newServices);
                                  }}
                                  className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs leading-relaxed"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono uppercase text-white/30">Image URL</label>
                                <input
                                  type="text"
                                  value={service.image}
                                  onChange={(e) => {
                                    const newServices = [...formState.services.list];
                                    newServices[idx].image = e.target.value;
                                    updateSectionField("services", "list", newServices);
                                  }}
                                  className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col justify-center items-center bg-black/40 border border-white/5 rounded-xl p-4">
                              <span className="text-[10px] font-mono uppercase text-white/30 mb-2">Image Preview</span>
                              {service.image ? (
                                <img src={service.image} alt="Service Preview" className="w-full h-32 object-cover rounded-lg border border-white/5" />
                              ) : (
                                <div className="w-full h-32 flex items-center justify-center border border-dashed border-white/10 rounded-lg text-white/20"><ImageIcon className="w-6 h-6" /></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- SPECIALTY TAB --- */}
              {activeTab === "specialty" && (
                <motion.div
                  key="specialty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4">Specialty & Sectors</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Heading</label>
                      <input
                        type="text"
                        value={formState.specialty.heading}
                        onChange={(e) => updateSectionField("specialty", "heading", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Specialty Paragraph 1</label>
                      <textarea
                        rows={3}
                        value={formState.specialty.subtitle1}
                        onChange={(e) => updateSectionField("specialty", "subtitle1", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand text-sm leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Specialty Paragraph 2</label>
                      <textarea
                        rows={3}
                        value={formState.specialty.subtitle2}
                        onChange={(e) => updateSectionField("specialty", "subtitle2", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-brand text-sm leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Core Focus Niche */}
                    <div className="space-y-4 bg-[#111]/40 border border-white/5 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-brand">Core Focus</h3>
                        <button
                          type="button"
                          onClick={() => {
                            const newFocus = [...formState.specialty.coreFocus, "New Niche"];
                            updateSectionField("specialty", "coreFocus", newFocus);
                          }}
                          className="text-[10px] font-bold tracking-wider uppercase bg-brand/10 hover:bg-brand/20 border border-brand/20 text-brand px-2.5 py-1.5 rounded-lg"
                        >
                          + Add Focus
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formState.specialty.coreFocus.map((focus, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={focus}
                              onChange={(e) => {
                                const newFocus = [...formState.specialty.coreFocus];
                                newFocus[idx] = e.target.value;
                                updateSectionField("specialty", "coreFocus", newFocus);
                              }}
                              className="w-full bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newFocus = formState.specialty.coreFocus.filter((_, i) => i !== idx);
                                updateSectionField("specialty", "coreFocus", newFocus);
                              }}
                              className="text-white/20 hover:text-red-400 p-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* More Sectors */}
                    <div className="space-y-4 bg-[#111]/40 border border-white/5 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">More Sectors</h3>
                        <button
                          type="button"
                          onClick={() => {
                            const newSectors = [...formState.specialty.targetSectors, "New Sector"];
                            updateSectionField("specialty", "targetSectors", newSectors);
                          }}
                          className="text-[10px] font-bold tracking-wider uppercase bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-2.5 py-1.5 rounded-lg"
                        >
                          + Add Sector
                        </button>
                      </div>

                      <div className="space-y-3">
                        {formState.specialty.targetSectors.map((sector, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={sector}
                              onChange={(e) => {
                                const newSectors = [...formState.specialty.targetSectors];
                                newSectors[idx] = e.target.value;
                                updateSectionField("specialty", "targetSectors", newSectors);
                              }}
                              className="w-full bg-black border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newSectors = formState.specialty.targetSectors.filter((_, i) => i !== idx);
                                updateSectionField("specialty", "targetSectors", newSectors);
                              }}
                              className="text-white/20 hover:text-red-400 p-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- CASE STUDIES TAB --- */}
              {activeTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4">Case Studies</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Title</label>
                      <input
                        type="text"
                        value={formState.projects.heading}
                        onChange={(e) => updateSectionField("projects", "heading", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Subtitle</label>
                      <textarea
                        rows={2}
                        value={formState.projects.subtitle}
                        onChange={(e) => updateSectionField("projects", "subtitle", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Project List</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const newProjects = [...formState.projects.list, {
                            id: `project-${formState.projects.list.length + 1}`,
                            title: "New Case Study",
                            description: "Services executed...",
                            category: "Healthcare",
                            imgSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&auto=format&fit=crop&q=60",
                            linkHref: "#",
                            iconText: "Brand Tagline"
                          }];
                          updateSectionField("projects", "list", newProjects);
                        }}
                        className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase bg-brand/10 hover:bg-brand/20 border border-brand/20 text-brand px-3 py-1.5 rounded-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Project
                      </button>
                    </div>

                    <div className="space-y-6">
                      {formState.projects.list.map((project, idx) => (
                        <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-6 relative group">
                          <button
                            type="button"
                            onClick={() => {
                              const newProjects = formState.projects.list.filter((_, i) => i !== idx);
                              updateSectionField("projects", "list", newProjects);
                            }}
                            className="absolute top-4 right-4 text-white/20 hover:text-red-400 p-2 rounded-lg bg-black/40 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3 md:col-span-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Unique ID</label>
                                  <input
                                    type="text"
                                    value={project.id}
                                    onChange={(e) => {
                                      const newProjects = [...formState.projects.list];
                                      newProjects[idx].id = e.target.value;
                                      updateSectionField("projects", "list", newProjects);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Category Type</label>
                                  <select
                                    value={project.category}
                                    onChange={(e) => {
                                      const newProjects = [...formState.projects.list];
                                      newProjects[idx].category = e.target.value;
                                      updateSectionField("projects", "list", newProjects);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                  >
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Lifestyle & Tech">Lifestyle & Tech</option>
                                    <option value="Events & Orgs">Events & Orgs</option>
                                  </select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Client / Title</label>
                                  <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => {
                                      const newProjects = [...formState.projects.list];
                                      newProjects[idx].title = e.target.value;
                                      updateSectionField("projects", "list", newProjects);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white font-bold"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Tagline / Location Tag</label>
                                  <input
                                    type="text"
                                    value={project.iconText}
                                    onChange={(e) => {
                                      const newProjects = [...formState.projects.list];
                                      newProjects[idx].iconText = e.target.value;
                                      updateSectionField("projects", "list", newProjects);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono uppercase text-white/30">Services Description</label>
                                <input
                                  type="text"
                                  value={project.description}
                                  onChange={(e) => {
                                    const newProjects = [...formState.projects.list];
                                    newProjects[idx].description = e.target.value;
                                    updateSectionField("projects", "list", newProjects);
                                  }}
                                  className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Link URL</label>
                                  <input
                                    type="text"
                                    value={project.linkHref}
                                    onChange={(e) => {
                                      const newProjects = [...formState.projects.list];
                                      newProjects[idx].linkHref = e.target.value;
                                      updateSectionField("projects", "list", newProjects);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Photo URL</label>
                                  <input
                                    type="text"
                                    value={project.imgSrc}
                                    onChange={(e) => {
                                      const newProjects = [...formState.projects.list];
                                      newProjects[idx].imgSrc = e.target.value;
                                      updateSectionField("projects", "list", newProjects);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col justify-center items-center bg-black/40 border border-white/5 rounded-xl p-4">
                              <span className="text-[10px] font-mono uppercase text-white/30 mb-2">Image Preview</span>
                              {project.imgSrc ? (
                                <img src={project.imgSrc} alt="Project Preview" className="w-full h-36 object-cover rounded-lg border border-white/5" />
                              ) : (
                                <div className="w-full h-36 flex items-center justify-center border border-dashed border-white/10 rounded-lg text-white/20"><ImageIcon className="w-6 h-6" /></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- TEAM TAB --- */}
              {activeTab === "team" && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4">Solara Squad (Team)</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Title</label>
                      <input
                        type="text"
                        value={formState.team.heading}
                        onChange={(e) => updateSectionField("team", "heading", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Subtitle</label>
                      <textarea
                        rows={2}
                        value={formState.team.subtitle}
                        onChange={(e) => updateSectionField("team", "subtitle", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Squad Members</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const newMembers = [...formState.team.list, {
                            id: `0${formState.team.list.length + 1}`,
                            title: "Squad Member",
                            tag: "Role Title",
                            description: "Professional bio...",
                            imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&auto=format&fit=crop&q=60"
                          }];
                          updateSectionField("team", "list", newMembers);
                        }}
                        className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase bg-brand/10 hover:bg-brand/20 border border-brand/20 text-brand px-3 py-1.5 rounded-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Member
                      </button>
                    </div>

                    <div className="space-y-6">
                      {formState.team.list.map((member, idx) => (
                        <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-6 relative group">
                          <button
                            type="button"
                            onClick={() => {
                              const newMembers = formState.team.list.filter((_, i) => i !== idx);
                              updateSectionField("team", "list", newMembers);
                            }}
                            className="absolute top-4 right-4 text-white/20 hover:text-red-400 p-2 rounded-lg bg-black/40 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3 md:col-span-2">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">ID Label</label>
                                  <input
                                    type="text"
                                    value={member.id}
                                    onChange={(e) => {
                                      const newMembers = [...formState.team.list];
                                      newMembers[idx].id = e.target.value;
                                      updateSectionField("team", "list", newMembers);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Full Name</label>
                                  <input
                                    type="text"
                                    value={member.title}
                                    onChange={(e) => {
                                      const newMembers = [...formState.team.list];
                                      newMembers[idx].title = e.target.value;
                                      updateSectionField("team", "list", newMembers);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white font-bold"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-mono uppercase text-white/30">Role Tag</label>
                                  <input
                                    type="text"
                                    value={member.tag}
                                    onChange={(e) => {
                                      const newMembers = [...formState.team.list];
                                      newMembers[idx].tag = e.target.value;
                                      updateSectionField("team", "list", newMembers);
                                    }}
                                    className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono uppercase text-white/30">Role Description</label>
                                <input
                                  type="text"
                                  value={member.description}
                                  onChange={(e) => {
                                    const newMembers = [...formState.team.list];
                                    newMembers[idx].description = e.target.value;
                                    updateSectionField("team", "list", newMembers);
                                  }}
                                  className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-mono uppercase text-white/30">Photo URL</label>
                                <input
                                  type="text"
                                  value={member.imageSrc}
                                  onChange={(e) => {
                                    const newMembers = [...formState.team.list];
                                    newMembers[idx].imageSrc = e.target.value;
                                    updateSectionField("team", "list", newMembers);
                                  }}
                                  className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col justify-center items-center bg-black/40 border border-white/5 rounded-xl p-4">
                              <span className="text-[10px] font-mono uppercase text-white/30 mb-2">Image Preview</span>
                              {member.imageSrc ? (
                                <img src={member.imageSrc} alt="Member Preview" className="w-full h-36 object-cover rounded-lg border border-white/5" />
                              ) : (
                                <div className="w-full h-36 flex items-center justify-center border border-dashed border-white/10 rounded-lg text-white/20"><ImageIcon className="w-6 h-6" /></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- PRICING TAB --- */}
              {activeTab === "pricing" && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4">Pricing Packages</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Title</label>
                      <input
                        type="text"
                        value={formState.pricing.heading}
                        onChange={(e) => updateSectionField("pricing", "heading", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm font-semibold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Subtitle</label>
                      <textarea
                        rows={2}
                        value={formState.pricing.subtitle}
                        onChange={(e) => updateSectionField("pricing", "subtitle", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 focus:outline-none focus:border-brand text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {formState.pricing.list.map((plan, idx) => (
                      <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono uppercase text-white/30">Package 0{idx + 1}</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`highlight-${idx}`}
                              checked={plan.highlight}
                              onChange={(e) => {
                                const newPlans = [...formState.pricing.list];
                                newPlans[idx].highlight = e.target.checked;
                                updateSectionField("pricing", "list", newPlans);
                              }}
                              className="rounded bg-black border-white/10 text-brand focus:ring-0 focus:ring-offset-0"
                            />
                            <label htmlFor={`highlight-${idx}`} className="text-xs font-mono uppercase tracking-wider text-white/50">Recommend / Highlight</label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase text-white/30">Simple Name</label>
                            <input
                              type="text"
                              value={plan.name}
                              onChange={(e) => {
                                const newPlans = [...formState.pricing.list];
                                newPlans[idx].name = e.target.value;
                                updateSectionField("pricing", "list", newPlans);
                              }}
                              className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white"
                            />
                          </div>
                          <div className="space-y-1 sm:col-span-2">
                            <label className="text-[10px] font-mono uppercase text-white/30">Full Package Header Title</label>
                            <input
                              type="text"
                              value={plan.title}
                              onChange={(e) => {
                                const newPlans = [...formState.pricing.list];
                                newPlans[idx].title = e.target.value;
                                updateSectionField("pricing", "list", newPlans);
                              }}
                              className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white font-bold"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 w-full sm:w-1/3">
                          <label className="text-[10px] font-mono uppercase text-white/30">Price (৳ Tag)</label>
                          <input
                            type="text"
                            value={plan.price}
                            onChange={(e) => {
                              const newPlans = [...formState.pricing.list];
                              newPlans[idx].price = e.target.value;
                              updateSectionField("pricing", "list", newPlans);
                            }}
                            className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white font-bold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase text-white/30">Features List (One feature per line)</label>
                          <textarea
                            rows={6}
                            value={plan.features.join("\n")}
                            onChange={(e) => {
                              const newPlans = [...formState.pricing.list];
                              newPlans[idx].features = e.target.value.split("\n");
                              updateSectionField("pricing", "list", newPlans);
                            }}
                            className="w-full bg-black border border-white/5 rounded-lg px-3 py-2 text-xs text-white leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* --- FAQ TAB --- */}
              {activeTab === "faq" && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4">FAQs (Frequently Asked Questions)</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Title</label>
                      <input
                        type="text"
                        value={formState.faq.heading}
                        onChange={(e) => updateSectionField("faq", "heading", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Header Subtitle</label>
                      <input
                        type="text"
                        value={formState.faq.subtitle}
                        onChange={(e) => updateSectionField("faq", "subtitle", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-white/60">Accordion Items</h3>
                      <button
                        type="button"
                        onClick={() => {
                          const newFaqs = [...formState.faq.list, {
                            question: "New Question?",
                            answer: "Provide dynamic answer here..."
                          }];
                          updateSectionField("faq", "list", newFaqs);
                        }}
                        className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase bg-brand/10 hover:bg-brand/20 border border-brand/20 text-brand px-3 py-1.5 rounded-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add FAQ
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formState.faq.list.map((faq, idx) => (
                        <div key={idx} className="bg-[#111] border border-white/5 rounded-2xl p-5 relative group space-y-4">
                          <button
                            type="button"
                            onClick={() => {
                              const newFaqs = formState.faq.list.filter((_, i) => i !== idx);
                              updateSectionField("faq", "list", newFaqs);
                            }}
                            className="absolute top-4 right-4 text-white/20 hover:text-red-400 p-2 rounded-lg bg-black/40 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="space-y-1 pr-10">
                            <label className="text-[10px] font-mono uppercase text-white/30">Question</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => {
                                const newFaqs = [...formState.faq.list];
                                newFaqs[idx].question = e.target.value;
                                updateSectionField("faq", "list", newFaqs);
                              }}
                              className="w-full bg-black border border-white/5 rounded-lg px-3 py-2.5 text-xs text-white font-semibold"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase text-white/30">Answer</label>
                            <textarea
                              rows={3}
                              value={faq.answer}
                              onChange={(e) => {
                                const newFaqs = [...formState.faq.list];
                                newFaqs[idx].answer = e.target.value;
                                updateSectionField("faq", "list", newFaqs);
                              }}
                              className="w-full bg-black border border-white/5 rounded-lg px-3 py-2.5 text-xs text-white leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- CONTACT TAB --- */}
              {activeTab === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold uppercase tracking-wide border-b border-white/5 pb-4 mb-6">Contact & Social Details</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Section Header Title</label>
                        <input
                          type="text"
                          value={formState.contact.heading}
                          onChange={(e) => updateSectionField("contact", "heading", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Section Header Tagline</label>
                        <input
                          type="text"
                          value={formState.contact.subtitle}
                          onChange={(e) => updateSectionField("contact", "subtitle", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase text-white/50 block">Section Description</label>
                      <textarea
                        rows={2}
                        value={formState.contact.description}
                        onChange={(e) => updateSectionField("contact", "description", e.target.value)}
                        className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Email Address</label>
                        <input
                          type="email"
                          value={formState.contact.email}
                          onChange={(e) => updateSectionField("contact", "email", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Phone/WhatsApp</label>
                        <input
                          type="text"
                          value={formState.contact.phone}
                          onChange={(e) => updateSectionField("contact", "phone", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Website URL (Home Link)</label>
                        <input
                          type="text"
                          value={formState.contact.website}
                          onChange={(e) => updateSectionField("contact", "website", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm"
                        />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 pt-4">Social Media Profile Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Facebook</label>
                        <input
                          type="text"
                          value={formState.contact.facebook}
                          onChange={(e) => updateSectionField("contact", "facebook", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Instagram</label>
                        <input
                          type="text"
                          value={formState.contact.instagram}
                          onChange={(e) => updateSectionField("contact", "instagram", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">LinkedIn</label>
                        <input
                          type="text"
                          value={formState.contact.linkedin}
                          onChange={(e) => updateSectionField("contact", "linkedin", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">Twitter / X</label>
                        <input
                          type="text"
                          value={formState.contact.twitter}
                          onChange={(e) => updateSectionField("contact", "twitter", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 text-sm"
                        />
                      </div>
                      <div className="space-y-2 col-span-1 sm:col-span-2">
                        <label className="text-xs font-mono uppercase text-white/50 block">YouTube</label>
                        <input
                          type="text"
                          value={formState.contact.youtube}
                          onChange={(e) => updateSectionField("contact", "youtube", e.target.value)}
                          className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white/80 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </main>
      </div>

      {/* Floating Save Actions Bar at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#0A0A0A] border-t border-white/5 flex items-center justify-center px-6 md:px-10 z-40">
        <div className="max-w-4xl w-full flex items-center justify-between">
          <div className="text-sm font-medium text-white/40">
            {saveStatus === "saving" && <span className="flex items-center gap-2 text-white"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>Saving changes to Firestore...</span>}
            {saveStatus === "success" && <span className="text-green-400 flex items-center gap-1.5"><Check className="w-4.5 h-4.5" /> Site published successfully!</span>}
            {saveStatus === "error" && <span className="text-red-400">Failed to publish changes. Check Firestore rules.</span>}
            {saveStatus === "idle" && <span>You have unsaved changes in your tabs.</span>}
          </div>
          
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="group inline-flex items-center gap-2 bg-brand text-white hover:bg-[#b35636] border border-brand/20 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Publish Changes
          </button>
        </div>
      </div>
    </div>
  );
}

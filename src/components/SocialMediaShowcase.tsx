import { motion } from 'motion/react';
import { ExternalLink, Github, Heart, MessageCircle, Share2, Bookmark, CheckCircle2, Layout, Zap, Users, Smartphone } from 'lucide-react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiFirebase } from 'react-icons/si';
import { Link } from 'react-router-dom';

export default function SocialMediaShowcase() {
  const features = [
    { name: 'User authentication', icon: <Users className="w-4 h-4 text-indigo-400" /> },
    { name: 'Post creation', icon: <Layout className="w-4 h-4 text-purple-400" /> },
    { name: 'Likes and comments', icon: <Heart className="w-4 h-4 text-pink-400" /> },
    { name: 'Real-time feed updates', icon: <Zap className="w-4 h-4 text-yellow-400" /> },
    { name: 'Responsive design', icon: <Smartphone className="w-4 h-4 text-cyan-400" /> },
  ];

  const techStack = [
    { name: 'React', icon: <FaReact className="w-6 h-6 text-[#61DAFB]" /> },
    { name: 'Firebase', icon: <SiFirebase className="w-6 h-6 text-[#FFCA28]" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6 text-[#06B6D4]" /> },
    { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6 text-[#339933]" /> },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-slate-950">
      {/* Optimized Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[radial-gradient(circle,_rgba(79,70,229,0.15)_0%,_transparent_70%)] will-change-[opacity]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] bg-[radial-gradient(circle,_rgba(147,51,234,0.15)_0%,_transparent_70%)] will-change-[opacity]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Featured Project
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-50 mb-6 leading-tight">
                Social Media <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Web App
                </span>
              </h2>
              
              <p className="text-lg text-slate-400 leading-relaxed">
                A modern, highly interactive social platform where users can create posts, like content, comment, and interact with a dynamic real-time feed. Built with performance and user experience in mind.
              </p>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3 bg-slate-900/50 border border-white/5 rounded-xl p-3 backdrop-blur-sm hover:bg-slate-800/50 transition-colors"
                >
                  <div className="p-2 bg-slate-800 rounded-lg shadow-inner">
                    {feature.icon}
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{feature.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Powered By</h3>
              <div className="flex flex-wrap gap-4">
                {techStack.map((tech, idx) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                    className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition-all cursor-help"
                    title={tech.name}
                  >
                    {tech.icon}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/demo/social"
                className="relative group px-8 py-4 bg-indigo-600 text-white rounded-full font-medium transition-all flex items-center gap-2 overflow-hidden hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
                <span className="relative z-10 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </span>
                <div className="absolute inset-0 rounded-full ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-slate-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 rounded-full font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side: Floating UI Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative perspective-1000"
          >
            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-32 h-32 bg-[radial-gradient(circle,_rgba(168,85,247,0.3)_0%,_transparent_70%)] z-0 will-change-transform"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-[radial-gradient(circle,_rgba(236,72,153,0.2)_0%,_transparent_70%)] z-0 will-change-transform"
            />

            {/* Browser Window Mockup */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden will-change-transform"
            >
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="mx-auto px-4 py-1 rounded-md bg-slate-800/50 text-xs text-slate-400 font-mono flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  social-app.dev
                </div>
              </div>

              {/* App Content */}
              <div className="p-6 flex flex-col gap-6">
                {/* Mock Post 1 */}
                <div className="bg-slate-800/40 border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="User" className="w-full h-full rounded-full border-2 border-slate-900 object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200">Sarah Jenkins</h4>
                        <p className="text-xs text-slate-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center cursor-pointer transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                    Just deployed my new portfolio using React and Tailwind! The developer experience is absolutely incredible. 🚀✨
                  </p>
                  
                  <div className="rounded-lg overflow-hidden mb-4 border border-white/5">
                    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=400" alt="Code" className="w-full h-40 object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="flex items-center gap-6 pt-2 border-t border-white/5">
                    <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-pink-400 transition-colors group">
                      <Heart className="w-4 h-4 group-hover:fill-pink-400" />
                      <span>248</span>
                    </button>
                    <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>42</span>
                    </button>
                    <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="ml-auto text-slate-400 hover:text-slate-200 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mock Post 2 (Partial) */}
                <div className="bg-slate-800/40 border border-white/5 rounded-xl p-4 opacity-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 p-[2px]">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt="User" className="w-full h-full rounded-full border-2 border-slate-900 object-cover" />
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-slate-700 rounded mb-1" />
                      <div className="h-3 w-16 bg-slate-700/50 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-700/50 rounded" />
                    <div className="h-3 w-4/5 bg-slate-700/50 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Missing icons for the mockup
function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MoreHorizontal(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

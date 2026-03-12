import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail, Check, Instagram } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('hnkaaksaud@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col gap-6 text-center items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm font-medium w-fit mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for work
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1]">
            Hi, I'm Saud <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Web Developer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            I build modern, responsive websites and web applications with a focus on clean code and exceptional user experiences.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all flex items-center gap-2 group shadow-lg shadow-indigo-500/25"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-transparent dark:border-white/10 text-slate-900 dark:text-slate-200 rounded-full font-medium transition-all"
            >
              Get in Touch
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <a href="https://github.com/createwithsaud" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/saud-khan-8474073b3/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/saudamnhot/?hl=en" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <button onClick={handleCopyEmail} title="Copy email address" className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {copied ? <Check className="w-6 h-6 text-emerald-500 dark:text-emerald-400" /> : <Mail className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

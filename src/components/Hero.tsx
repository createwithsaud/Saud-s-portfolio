import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col gap-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium w-fit mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for work
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-50 leading-[1.1]">
            Hi, I'm Saud <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Web Developer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            I build modern, responsive websites and web applications with a focus on clean code and exceptional user experiences.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-all flex items-center gap-2 group shadow-lg shadow-indigo-500/25"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-full font-medium transition-all"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 mt-8">
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl rotate-6 blur-xl" />
            <div className="absolute inset-0 bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=800&h=800"
                alt="Saud - Web Developer"
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

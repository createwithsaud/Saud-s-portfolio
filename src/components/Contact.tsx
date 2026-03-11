import { motion } from 'motion/react';
import { Mail, Github, Instagram, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-50">
            Get In <span className="text-purple-400">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mt-6 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-slate-200 mb-4">
                Let's talk about your project
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-md">
                I'm currently available for freelance work and open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:hello@saud.dev"
                className="flex items-center gap-4 text-slate-300 hover:text-indigo-400 transition-colors group"
              >
                <div className="bg-slate-900 p-4 rounded-xl border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-sm text-slate-500 mb-1">Email</span>
                  <span className="font-medium">hello@saud.dev</span>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 text-slate-300 hover:text-purple-400 transition-colors group"
              >
                <div className="bg-slate-900 p-4 rounded-xl border border-white/5 group-hover:border-purple-500/30 transition-colors">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-sm text-slate-500 mb-1">GitHub</span>
                  <span className="font-medium">github.com/saud</span>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 text-slate-300 hover:text-pink-400 transition-colors group"
              >
                <div className="bg-slate-900 p-4 rounded-xl border border-white/5 group-hover:border-pink-500/30 transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-sm text-slate-500 mb-1">Instagram</span>
                  <span className="font-medium">@saud.dev</span>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all group shadow-lg shadow-indigo-500/25"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

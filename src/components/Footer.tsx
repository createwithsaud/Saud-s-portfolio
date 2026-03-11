import { useState } from 'react';
import { Code2, Github, Instagram, Linkedin, Mail, Check } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('hnkaaksaud@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 group">
          <div className="bg-indigo-500/10 p-2 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
            <Code2 className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-mono font-bold text-lg tracking-tight text-slate-100">
            Saud<span className="text-indigo-400">.dev</span>
          </span>
        </div>

        <p className="text-slate-500 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Saud. All rights reserved. <br className="md:hidden" />
          <span className="text-slate-400 font-medium">Built with passion by Saud</span>
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/createwithsaud"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900 border border-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/saud-khan-8474073b3/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900 border border-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/saudamnhot/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900 border border-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <button
            onClick={handleCopyEmail}
            title="Copy email address"
            className="p-2 bg-slate-900 border border-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </footer>
  );
}

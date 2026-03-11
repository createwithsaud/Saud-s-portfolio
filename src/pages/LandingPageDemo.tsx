import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPageDemo() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Zap className="w-5 h-5" />
          </div>
          SaaSify
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-900">Back to Portfolio</Link>
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-32 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 border border-blue-100">
            ✨ Introducing SaaSify 2.0
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
            Build faster, scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">smarter.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one platform to manage your projects, collaborate with your team, and ship products at lightning speed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-colors">
              View Documentation
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-500">No credit card required. 14-day free trial.</p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 relative mx-auto max-w-4xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full bottom-0" />
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800" 
            alt="Dashboard Mockup" 
            className="rounded-2xl shadow-2xl border border-slate-200 object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Powerful features designed to help your team move faster and stay aligned.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed, so you never have to wait for pages to load.' },
              { icon: Shield, title: 'Bank-grade Security', desc: 'Your data is encrypted at rest and in transit with enterprise-grade security.' },
              { icon: Smartphone, title: 'Mobile Responsive', desc: 'Work from anywhere with our fully responsive mobile web app.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

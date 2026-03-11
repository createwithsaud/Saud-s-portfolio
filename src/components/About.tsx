import { motion } from 'motion/react';
import { MapPin, GraduationCap, Code } from 'lucide-react';

export default function About() {
  const infoCards = [
    {
      icon: <MapPin className="w-6 h-6 text-indigo-400" />,
      title: 'Location',
      desc: 'Based in the World',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
      title: 'Student Developer',
      desc: 'Passionate Learner',
    },
    {
      icon: <Code className="w-6 h-6 text-emerald-400" />,
      title: 'Full-Stack',
      desc: 'Learning & Building',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-50">
            About <span className="text-indigo-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mt-6 mx-auto md:mx-0 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-slate-400 leading-relaxed"
          >
            <p>
              I am a passionate student learning web development, focused on creating modern, intuitive, and engaging user experiences. My journey in tech started with a curiosity about how things work on the internet, and it has grown into a deep love for coding.
            </p>
            <p>
              I specialize in building clean and functional websites using the latest web technologies. I believe that good design is not just about how it looks, but how it works. I strive to write semantic, accessible, and performant code.
            </p>
            <p>
              When I'm not coding, I'm usually exploring new frameworks, contributing to open-source projects, or reading up on the latest trends in UI/UX design.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {infoCards.map((card, index) => (
              <div
                key={index}
                className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors group"
              >
                <div className="bg-slate-950 p-4 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-400">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'motion/react';
import { FileCode2, Paintbrush, FileJson, Layout, GitBranch, Github, CodeSquare } from 'lucide-react';

export default function Skills() {
  const frontendSkills = [
    { name: 'HTML', icon: <FileCode2 className="w-8 h-8 text-orange-500" /> },
    { name: 'CSS', icon: <Paintbrush className="w-8 h-8 text-blue-500" /> },
    { name: 'JavaScript', icon: <FileJson className="w-8 h-8 text-yellow-400" /> },
    { name: 'Tailwind CSS', icon: <Layout className="w-8 h-8 text-cyan-400" /> },
  ];

  const tools = [
    { name: 'Git', icon: <GitBranch className="w-8 h-8 text-orange-600" /> },
    { name: 'GitHub', icon: <Github className="w-8 h-8 text-slate-100" /> },
    { name: 'VS Code', icon: <CodeSquare className="w-8 h-8 text-blue-400" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-50">
            My <span className="text-purple-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mt-6 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-semibold text-slate-200 mb-8 flex items-center gap-3">
              <CodeSquare className="w-6 h-6 text-indigo-400" />
              Frontend Development
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {frontendSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-slate-900 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-slate-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-200 mb-8 flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-purple-400" />
              Tools & Workflow
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-slate-900 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all cursor-pointer group"
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <span className="font-medium text-slate-300 group-hover:text-white transition-colors">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

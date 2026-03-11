import { motion } from 'motion/react';
import { CodeSquare, GitBranch } from 'lucide-react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiFigma } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

export default function Skills() {
  const frontendSkills = [
    { name: 'HTML5', icon: <FaHtml5 className="w-12 h-12 text-[#E34F26]" />, shadow: 'hover:shadow-[#E34F26]/20 hover:border-[#E34F26]/50' },
    { name: 'CSS3', icon: <FaCss3Alt className="w-12 h-12 text-[#1572B6]" />, shadow: 'hover:shadow-[#1572B6]/20 hover:border-[#1572B6]/50' },
    { name: 'JavaScript', icon: <FaJs className="w-12 h-12 text-[#F7DF1E]" />, shadow: 'hover:shadow-[#F7DF1E]/20 hover:border-[#F7DF1E]/50' },
    { name: 'React', icon: <FaReact className="w-12 h-12 text-[#61DAFB]" />, shadow: 'hover:shadow-[#61DAFB]/20 hover:border-[#61DAFB]/50' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-12 h-12 text-[#06B6D4]" />, shadow: 'hover:shadow-[#06B6D4]/20 hover:border-[#06B6D4]/50' },
    { name: 'Node.js', icon: <FaNodeJs className="w-12 h-12 text-[#339933]" />, shadow: 'hover:shadow-[#339933]/20 hover:border-[#339933]/50' },
  ];

  const tools = [
    { name: 'Git', icon: <FaGitAlt className="w-12 h-12 text-[#F05032]" />, shadow: 'hover:shadow-[#F05032]/20 hover:border-[#F05032]/50' },
    { name: 'GitHub', icon: <FaGithub className="w-12 h-12 text-white" />, shadow: 'hover:shadow-white/20 hover:border-white/50' },
    { name: 'VS Code', icon: <VscVscode className="w-12 h-12 text-[#007ACC]" />, shadow: 'hover:shadow-[#007ACC]/20 hover:border-[#007ACC]/50' },
    { name: 'Figma', icon: <SiFigma className="w-12 h-12 text-[#F24E1E]" />, shadow: 'hover:shadow-[#F24E1E]/20 hover:border-[#F24E1E]/50' },
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

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-semibold text-slate-200 mb-8 flex items-center gap-3">
              <CodeSquare className="w-6 h-6 text-indigo-400" />
              Frontend & Backend
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {frontendSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-800/80 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${skill.shadow}`}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                      {skill.icon}
                    </div>
                  </motion.div>
                  <span className="font-medium text-slate-400 group-hover:text-white transition-colors duration-300 text-sm">
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
                  whileHover={{ y: -8 }}
                  className={`bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-slate-800/80 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${tool.shadow}`}
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                      {tool.icon}
                    </div>
                  </motion.div>
                  <span className="font-medium text-slate-400 group-hover:text-white transition-colors duration-300 text-sm">
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

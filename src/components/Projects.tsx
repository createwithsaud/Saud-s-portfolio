import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive personal portfolio built with React, Tailwind CSS, and Framer Motion.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=500',
      tech: ['React', 'Tailwind', 'Motion'],
      liveUrl: '/',
      githubUrl: 'https://github.com/createwithsaud/Saud-s-portfolio',
      isInternal: true,
    },
    {
      title: 'Blog Website',
      description: 'A full-featured blog platform with markdown support, categories, and a dark mode toggle.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&h=500',
      tech: ['React', 'Node.js', 'MongoDB'],
      liveUrl: '/demo/blog',
      githubUrl: 'https://github.com/createwithsaud/Saud-s-portfolio',
      isInternal: true,
    },
    {
      title: 'E-commerce UI',
      description: 'A beautiful and intuitive e-commerce user interface with product filtering and cart functionality.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800&h=500',
      tech: ['Next.js', 'Tailwind', 'Stripe'],
      liveUrl: '/demo/ecommerce',
      githubUrl: 'https://github.com/createwithsaud/Saud-s-portfolio',
      isInternal: true,
    },
    {
      title: 'Social Media App',
      description: 'A modern, highly interactive social platform where users can create posts, like content, comment, and interact with a dynamic real-time feed.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=500',
      tech: ['React', 'Firebase', 'Tailwind', 'Node.js'],
      liveUrl: '/demo/social',
      githubUrl: 'https://github.com/createwithsaud/Saud-s-portfolio',
      isInternal: true,
    },
    {
      title: 'Weather Dashboard',
      description: 'A stunning, glassmorphism-inspired weather application providing real-time forecasts, hourly updates, and environmental metrics.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800&h=500',
      tech: ['React', 'Tailwind', 'Motion'],
      liveUrl: '/demo/weather',
      githubUrl: 'https://github.com/createwithsaud/Saud-s-portfolio',
      isInternal: true,
    },
  ];

  const [filter, setFilter] = useState('All');

  const allTechs = Array.from(new Set(projects.flatMap((project) => project.tech)));
  const filterOptions = ['All', ...allTechs];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.tech.includes(filter));

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Featured <span className="text-indigo-600 dark:text-indigo-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mt-6 mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === option
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none'
              }`}
            >
              {option}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden group hover:border-indigo-500/30 transition-colors shadow-sm dark:shadow-none"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.isInternal ? (
                      <Link
                        to={project.liveUrl}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Link>
                    ) : (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

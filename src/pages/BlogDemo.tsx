import { motion } from 'motion/react';
import { Calendar, Clock, ChevronRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogDemo() {
  const posts = [
    {
      id: 1,
      title: 'The Future of React: Server Components Explained',
      excerpt: 'Dive deep into React Server Components, how they work under the hood, and why they are the biggest paradigm shift in React since Hooks.',
      category: 'Engineering',
      date: 'Oct 24, 2023',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800&h=500',
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS Grid Layouts',
      excerpt: 'Learn how to build complex, responsive grid layouts using Tailwind CSS utility classes without writing a single line of custom CSS.',
      category: 'Design',
      date: 'Oct 18, 2023',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800&h=500',
    },
    {
      id: 3,
      title: 'Building a Design System from Scratch',
      excerpt: 'A comprehensive guide to creating a scalable, maintainable design system for your next enterprise application.',
      category: 'Design',
      date: 'Oct 12, 2023',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800&h=500',
    },
    {
      id: 4,
      title: 'Why TypeScript is Essential for Large Apps',
      excerpt: 'Explore the benefits of static typing, better IDE support, and fewer runtime errors when scaling your JavaScript codebase.',
      category: 'Engineering',
      date: 'Oct 05, 2023',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800&h=500',
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-50 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight">Dev<span className="text-emerald-500">Blog</span></div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5">
              <Search className="w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-600 w-48"
              />
            </div>
            <Link to="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 group cursor-pointer"
        >
          <div className="relative h-[400px] rounded-3xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200&h=600" 
              alt="Featured" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full md:w-2/3">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-emerald-500/20">
                Featured
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight group-hover:text-emerald-400 transition-colors">
                How AI is Reshaping the Developer Experience in 2024
              </h2>
              <p className="text-zinc-400 text-lg mb-4 line-clamp-2">
                From intelligent code completion to automated refactoring, explore how generative AI tools are becoming an indispensable part of the modern developer's workflow.
              </p>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Nov 02, 2023</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10 min read</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Posts Grid */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Recent Articles</h3>
          <button className="text-emerald-400 text-sm font-medium flex items-center gap-1 hover:text-emerald-300">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative h-60 rounded-2xl overflow-hidden mb-5">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  {post.date}
                </span>
              </div>
              <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h4>
              <p className="text-zinc-400 text-sm line-clamp-2 mb-4 flex-grow">
                {post.excerpt}
              </p>
              <div className="text-xs text-zinc-500 flex items-center gap-1 mt-auto">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

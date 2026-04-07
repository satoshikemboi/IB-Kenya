import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/blogData";

const categories = ["All Posts", "Broker Reviews", "Beginners", "Tutorials", "Regulation"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = blogPosts.filter((p) => {
    const matchesCategory = activeCategory === "All Posts" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#07101E] min-h-screen pt-20">
      <Helmet>
        <title>Forex Blog Kenya | FxBrokers.co.ke</title>
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-b border-white/5">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
          Forex Blog <span className="text-[#C9A84C] italic">for Kenya</span>
        </h1>
        <p className="text-gray-400 max-w-xl mb-8">
          Expert broker reviews, M-Pesa deposit guides, and CMA regulation updates.
        </p>

        {/* Search & Filter UI */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === cat ? "bg-[#C9A84C] text-black" : "border border-white/10 text-gray-400 hover:border-[#C9A84C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Search articles..."
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#C9A84C] w-full md:w-64"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Post Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group">
            <article className="bg-[#0d1e35] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C9A84C]/30 transition-all">
              <div className="h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">{post.category}</span>
                <h3 className="text-xl text-white font-bold mt-2 mb-3 group-hover:text-[#C9A84C] transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6">{post.excerpt}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-4">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
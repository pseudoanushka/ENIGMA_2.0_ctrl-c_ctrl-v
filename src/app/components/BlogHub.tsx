import { motion } from 'motion/react';
import { BookOpen, TrendingUp, Clock, ArrowRight, Bookmark } from 'lucide-react';

export function BlogHub() {
  const categories = ['All', 'Prevention', 'Research', 'Lifestyle', 'Treatment', 'Nutrition'];

  const articles = [
    {
      id: 1,
      title: '10 Early Warning Signs of Cancer You Should Never Ignore',
      category: 'Prevention',
      readTime: '5 min read',
      date: 'Feb 24, 2026',
      image: 'cancer-awareness',
      excerpt: 'Learn about the subtle symptoms that could indicate early-stage cancer and when to see a doctor.'
    },
    {
      id: 2,
      title: 'Latest Breakthroughs in Immunotherapy Treatment',
      category: 'Research',
      readTime: '8 min read',
      date: 'Feb 22, 2026',
      image: 'medical-research',
      excerpt: 'Discover how new immunotherapy techniques are revolutionizing cancer treatment with remarkable success rates.'
    },
    {
      id: 3,
      title: 'The Anti-Cancer Diet: Foods That Fight Cancer',
      category: 'Nutrition',
      readTime: '6 min read',
      date: 'Feb 20, 2026',
      image: 'healthy-food',
      excerpt: 'Evidence-based guide to foods that have been scientifically proven to reduce cancer risk.'
    },
    {
      id: 4,
      title: 'Exercise and Cancer Prevention: What Science Says',
      category: 'Lifestyle',
      readTime: '7 min read',
      date: 'Feb 18, 2026',
      image: 'exercise-fitness',
      excerpt: 'How regular physical activity can significantly reduce your cancer risk and improve outcomes.'
    },
    {
      id: 5,
      title: 'Understanding Genetic Testing for Cancer Risk',
      category: 'Prevention',
      readTime: '10 min read',
      date: 'Feb 15, 2026',
      image: 'dna-testing',
      excerpt: 'A comprehensive guide to genetic testing, BRCA genes, and what results mean for you.'
    },
    {
      id: 6,
      title: 'Managing Stress During Cancer Treatment',
      category: 'Treatment',
      readTime: '5 min read',
      date: 'Feb 12, 2026',
      image: 'mindfulness-meditation',
      excerpt: 'Practical strategies and techniques for reducing stress and anxiety during cancer treatment.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Education Hub</h2>
        <p className="text-muted-foreground">Stay informed with the latest cancer research and health tips</p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all whitespace-nowrap"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">
            Featured Article
          </span>
          <h3 className="text-3xl font-bold mt-4 mb-3">
            AI in Cancer Detection: The Future is Here
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl">
            Explore how artificial intelligence is transforming early cancer detection with unprecedented accuracy rates.
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">12 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Research</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-primary rounded-xl hover:shadow-xl transition-all flex items-center gap-2 font-semibold">
            Read Article
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-primary/30" />
              </div>
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
                <Bookmark className="w-5 h-5 text-primary" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">{article.date}</span>
                <button className="text-sm text-secondary hover:underline flex items-center gap-1">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="bg-card rounded-2xl p-8 border border-border">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our weekly newsletter for the latest cancer research and health tips
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

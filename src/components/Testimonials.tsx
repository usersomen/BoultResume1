import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Emily Johnson',
    role: 'Senior UX Designer',
    company: 'Google',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'This platform transformed my job search. Within 2 weeks of redesigning my resume, I landed interviews at 3 top tech companies and received an offer from my dream employer.',
    rating: 5,
    highlight: 'Landed at Google'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Software Engineer',
    company: 'Spotify',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'The AI suggestions helped me quantify achievements I would have otherwise left out. My resume now clearly showcases my impact, not just my responsibilities.',
    rating: 5,
    highlight: '4 interviews in a week'
  },
  {
    name: 'Sarah Chen',
    role: 'Marketing Manager',
    company: 'Adobe',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: 'As someone switching careers, I was struggling to position my experience. The AI tool helped me translate my skills to a new industry. Worth every penny!',
    rating: 5,
    highlight: 'Career transition success'
  },
];

const stats = [
  { value: '93%', label: 'Success rate', description: 'of our users report getting more interviews' },
  { value: '2.7x', label: 'More callbacks', description: 'compared to their previous resumes' },
  { value: '14 days', label: 'Average time', description: 'to land a new position using our platform' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#4ECCA3]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-[#4ECCA3]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.03]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-[#4ECCA3]/20 mx-auto"
          >
            <Star className="w-4 h-4 text-[#4ECCA3]" />
            <span className="text-[#4ECCA3] font-semibold">Success Stories</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            People are landing their dream jobs
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Thousands of job seekers have improved their career prospects with our AI-powered resume builder
          </motion.p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#4ECCA3]/20 flex items-center justify-center">
                <Quote className="w-4 h-4 text-[#4ECCA3]" />
              </div>
              
              {/* Highlight tag */}
              <div className="absolute -top-3 right-6 px-4 py-1 bg-[#4ECCA3] text-white text-sm font-medium rounded-full">
                {testimonial.highlight}
              </div>
              
              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-2xl bg-gray-800 p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.05]" />
          
          {/* Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4ECCA3] to-[#5FDDB4]" />
          
          {/* Content */}
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                Our impact in numbers
              </h3>
              
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  x: 5,
                }}
                className="flex items-center gap-2 text-[#4ECCA3] font-medium"
              >
                See all success stories
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-4 justify-center md:justify-start">
                    <TrendingUp className="w-5 h-5 text-[#4ECCA3] hidden md:block" />
                    <span className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{stat.label}</h4>
                  <p className="text-gray-300">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
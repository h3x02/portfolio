import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../utils/translations';
import { ExternalLink, Code, Shield, Swords } from 'lucide-react';

const Projects: React.FC = () => {
  const { language, isRTL } = useLanguage();

  const projects = [
    {
      titleKey: 'h3x3dTitle',
      descKey: 'h3x3dDesc',
      link: 'https://h3x02.github.io/h3x-3d/',
      color: 'from-blue-500 to-purple-600',
      icon: Code,
      tech: ['React', 'Framer', 'Jest', 'GSAP']
    },
    {
      titleKey: 'bimerzTitle',
      descKey: 'bimerzDesc',
      link: 'http://bimerz.ir',
      color: 'from-green-500 to-teal-600',
      icon: Shield,
      tech: ['Radix UI', 'TypeScript', 'Express', 'Security', 'Helmet']
    },
    {
      titleKey: 'suduxTitle',
      descKey: 'suduxDesc',
      link: 'http://sudux.ir',
      color: 'from-violet-500 to-blue-600',
      icon: Swords,
      tech: ['Radix UI', 'TypeScript', 'Axum', 'Gsap', 'Framer', 'Postgre']
    }
  ];

  return (
    <section id="projects" className={`py-20 bg-gradient-to-br from-slate-900 to-slate-800 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className='text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold text-white'>
            پروژه ها
          </h2>
          <p className={`text-gray-400 text-lg mt-4 ${language === 'fa' ? 'font-estedad' : 'font-inter'}`}>
            {language === 'fa' ? 'پروژه‌های اخیر و برجسته من' : 'My recent and featured projects'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`relative bg-gradient-to-r ${project.color} rounded-2xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-white/20 rounded-lg mr-4 rtl:ml-4 rtl:mr-0">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className={`text-xl font-bold ${language === 'fa' ? 'font-estedad' : 'font-inter'}`}>
                        {translations[project.titleKey as keyof typeof translations][language]}
                      </h3>
                    </div>

                    <p className={`mb-6 text-white/90 leading-relaxed ${language === 'fa' ? 'font-estedad' : 'font-inter'}`}>
                      {translations[project.descKey as keyof typeof translations][language]}
                    </p>

                    <div className="mb-6">
                      <h4 className={`text-sm font-semibold text-white/80 mb-2 ${language === 'fa' ? 'font-estedad' : 'font-inter'}`}>
                        {language === 'fa' ? 'تکنولوژی‌ها:' : 'Technologies:'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/20 rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={project.link}
                      target='blank'
                      className="inline-flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium bg-black text-white px-4 py-2 rounded-lg border border-gray-800 hover:bg-gray-900 hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
                    >
                      <span>{language === 'fa' ? 'مشاهده وب‌سایت' : 'View Website'}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <Code className="h-12 w-12 mx-auto mb-4 text-white/80" />
            <h3 className={`text-2xl font-bold mb-4 ${language === 'fa' ? 'font-estedad' : 'font-inter'}`}>
              شاقول
            </h3>
            <p className={`text-white/90 mb-6 max-w-2xl mx-auto ${language === 'fa' ? 'font-estedad' : 'font-inter'}`}>
              {language === 'fa'
                ? 'پروژه جدید من که به زودی منتشر خواهد شد'
                : 'My upcoming project that will be released soon'
              }
            </p>
            <div className="inline-flex items-center justify-center px-8 py-3 font-medium bg-black text-white rounded-lg border border-gray-800">
              {language === 'fa' ? 'به زودی' : 'Coming Soon'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
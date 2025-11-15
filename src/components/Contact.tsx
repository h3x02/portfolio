import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {

  const contactMethods = [
    {
      icon: Mail,
      label: 'ایمیل',
      value: 'itssheesh0.com',
      href: 'mailto:itssheesh0@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      label: 'تلفن',
      value: '09104056429',
      href: 'tel:+989104056429',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageCircle,
      label: 'واتس اپ',
      value: 'پیام دهید',
      href: 'https://wa.me/989104056429',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="contact" className={`py-20 bg-gradient-to-br from-slate-900 to-slate-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className='text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold text-white'>
            تماس با من
          </h2>
          <p className={`text-gray-400 text-lg mt-4 'font-estedad'`}>
            آماده همکاری هستم
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <p className="text-lg text-gray-300 mb-8 leading-relaxed font-estedad">
              اگر به دنبال همکاری برای توسعه یا بهبود وب‌سایت خود هستید، خوشحال می‌شوم در کنارتان باشم.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <a
                    href={method.href}
                    className="block w-full p-6 text-center bg-black text-white rounded-lg border border-gray-800 hover:bg-gray-900 hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${method.color} mb-4`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 font-estedad`}>
                      {method.label}
                    </h3>
                    <p className={`text-gray-400 text-sm font-estedad`}>
                      {method.value}
                    </p>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10">
                <Send className="h-16 w-16 mx-auto mb-6 text-white/80" />
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 'font-estedad'`}>
                  بیایید پروژه شما را شروع کنیم!
                </h3>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg font-estedad">
                  بیایید قدم اول را برداریم و چیزی بسازیم که به آن افتخار کنیم.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
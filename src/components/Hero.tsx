import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import TextType from './bit/TextType';
import Antigravity from './Antigravity';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { language } = useLanguage();

  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const [titleCycleDone, setTitleCycleDone] = useState(false);

  useEffect(() => {
    setShowName(true);
  }, []);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[#120F17]`}
    >
      <div className="absolute inset-0">
        <Antigravity
          count={300}
          magnetRadius={10}
          ringRadius={10}
          waveSpeed={0.7}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.1}
          color="#F43F5E"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Name */}
        {showName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <TextType
              text={['سلام من محمدامین سیدی هستم']}
              typingSpeed={60}
              deletingSpeed={50}
              pauseDuration={0}
              loop={false}
              showCursor={true}
              hideCursorWhileTyping={true}
              cursorCharacter="|"
              cursorClassName="text-white"
              className="text-2xl md:text-3xl text-white font-estedad mx-4"
              onSentenceComplete={() => setShowTitle(true)}
            />
          </motion.div>
        )}

        {/* Title + dynamic typing */}
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center items-center"
          >
            <span
              className={`text-xl mx-2 md:text-2xl text-purple-200 mr-4 ${language === 'fa' ? 'font-estedad' : 'font-inter'
                } font-light`}
            >
              توسعه‌دهنده
            </span>

            <TextType
              text={['فرانت‌اند', 'بک‌اند']}
              typingSpeed={150}
              deletingSpeed={250}
              pauseDuration={1000}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-white"
              className={`text-2xl md:text-3xl text-white ${language === 'fa' ? 'font-estedad' : 'font-inter'
                } font-bold`}
              onSentenceComplete={() => {
                if (!titleCycleDone) {
                  setTitleCycleDone(true);
                  setTimeout(() => setShowExperience(true), 800);
                }
              }}
            />
          </motion.div>
        )}

        {/* Experience */}
        {showExperience && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <TextType
              text={[
                '۵ سال تجربه در توسعه وب | متخصص در ساخت وب‌سایت‌های مدرن و کاربردی',
              ]}
              typingSpeed={60}
              deletingSpeed={50}
              pauseDuration={0}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-white"
              className="text-lg text-white max-w-2xl mx-auto leading-relaxed font-estedad"
              onSentenceComplete={() => setShowButtons(true)}
            />

            {!showButtons && setTimeout(() => setShowButtons(true), 5000)}
          </motion.div>
        )}

        {/* Buttons */}
        {showButtons && (
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            {/* Start Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-8 py-3 text-white font-medium font-estedad bg-black rounded-lg border border-gray-800 hover:bg-gray-900 hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
              >
                تماس با من
              </a>

            </motion.div>

            {/* Projects Button */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center px-8 py-3 text-white font-medium font-estedad bg-black rounded-lg border border-gray-800 hover:bg-gray-900 hover:border-gray-700 transition-all duration-300 hover:shadow-lg"
              >
                مشاهده پروژه‌ها
              </a>
            </motion.div>
          </motion.div>
        )}

      </div>

      {/* Bouncing Scroll Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

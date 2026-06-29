import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Timeline: React.FC<{ isRTL: boolean; language: string }> = ({ isRTL, language }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end end'],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '110%']);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const timelineItems = [
        {
            year: '2020',
            title: language === 'fa' ? 'شروع توسعه وب' : 'Start Web Development',
            desc: language === 'fa' ? 'HTML، CSS و JavaScript' : 'HTML, CSS, JS',
        },
        {
            year: '2023',
            title: language === 'fa' ? 'بوت‌کمپ فرانت‌اند کوئرا' : 'Quera Frontend Bootcamp',
            desc: language === 'fa' ? 'React، Context، Redux، Git' : 'React, Context, Redux, Git',
        },
        {
            year: '2024',
            title: 'H3x3d',
            desc: 'Framer Motion, Jest, Tailwind, GSAP',
        },
        {
            year: '2025',
            title: 'Bimerz.ir',
            desc: 'RadixUI, Axios, Moment, Rechart, Express, Sonner, Helmet',
        },
        {
            year: '2026',
            title: 'Sudux.ir',
            desc: 'Radix UI, TypeScript, Axum, Gsap, Framer, Postgre'
        },
    ];

    return (
        <div ref={ref} className="relative max-w-4xl mx-auto mt-16">
            {/* Scroll-linked timeline line */}
            {isClient && (
                <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
                    style={{ height: lineHeight }}
                />
            )}


            {/* Timeline cards */}
            <div className="space-y-16">
                {timelineItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className={`flex flex-col md:flex-row md:items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ amount: 0.1 }}
                    >
                        {/* Card */}
                        <div
                            className={`w-full md:w-1/2 ${index % 2 === 0
                                    ? isRTL
                                        ? 'md:text-right md:pr-8'
                                        : 'md:text-left md:pl-8'
                                    : isRTL
                                        ? 'md:text-left md:pl-8'
                                        : 'md:text-right md:pr-8'
                                }`}
                        >
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-transform duration-300">
                                <h4
                                    className={`text-lg font-semibold text-gray-900 ${language === 'fa' ? 'font-estedad' : 'font-inter'
                                        }`}
                                >
                                    {item.title}
                                </h4>
                                <p
                                    className={`text-gray-600 text-sm ${language === 'fa' ? 'font-estedad' : 'font-inter'
                                        }`}
                                >
                                    {item.desc}
                                </p>
                            </div>
                        </div>

                        {/* Dot and Year */}
                        <div className="flex flex-col items-center mb-4 md:mb-0 md:mx-4">
                            <div className="w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                            <span
                                className={`text-sm text-gray-500 mt-1 ${language === 'fa' ? 'font-estedad' : 'font-inter'
                                    }`}
                            >
                                {item.year}
                            </span>
                        </div>

                        {/* Spacer */}
                        <div className="hidden md:block md:w-1/2" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;

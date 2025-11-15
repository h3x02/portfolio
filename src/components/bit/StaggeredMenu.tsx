import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MenuItem {
    label: string;
    ariaLabel: string;
    link: string;
    onClick?: () => void;
}

interface StaggeredMenuProps {
    colors?: string[];
    items?: MenuItem[];
    position?: 'left' | 'right';
    isFixed?: boolean;
    open: boolean;
    onMenuClose?: () => void;
    showHeader?: boolean;
    displaySocials?: boolean;
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    colors = ['#1e1e2e', '#312e81'],
    items = [],
    position = 'right',
    open = false,
    onMenuClose,
    showHeader = false,
    displaySocials = false
}) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLAnchorElement[]>([]);

    /** 🌀 Initialize GSAP context */
    useEffect(() => {
        if (!panelRef.current) return;

        // Panel initial position
        gsap.set(panelRef.current, {
            xPercent: position === 'right' ? 100 : -100,
            opacity: 0
        });

        gsap.set(bgRef.current, { opacity: 0 });

        itemsRef.current.forEach((el) => {
            gsap.set(el, { opacity: 0, y: 40 });
        });
    }, [position]);

    /** ✨ Animation Function (defined BEFORE useEffect calls) */
    const animateMenu = (isOpen: boolean) => {
        if (!panelRef.current) return;

        if (isOpen) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.to(bgRef.current, { opacity: 1, duration: 0.4 })
                .to(panelRef.current, {
                    xPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                }, '-=0.2')
                .to(
                    itemsRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.08,
                        duration: 0.6,
                    },
                    '-=0.2'
                );
        } else {
            const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
            tl.to(itemsRef.current, {
                opacity: 0,
                y: 40,
                stagger: 0.05,
                duration: 0.3,
            })
                .to(panelRef.current, {
                    xPercent: position === 'right' ? 100 : -100,
                    opacity: 0,
                    duration: 0.5,
                }, '-=0.1')
                .to(bgRef.current, { opacity: 0, duration: 0.3 }, '-=0.3');
        }
    };

    /** 🎬 Animate when `open` changes */
    useEffect(() => {
        animateMenu(open);
    }, [open]);

    /** 🖱️ Close menu on background click */
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === bgRef.current && onMenuClose) {
            onMenuClose();
        }
    };

    return (
        <>
            {/* BACKGROUND OVERLAY */}
            <div
                ref={bgRef}
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                onClick={handleBackgroundClick}
            ></div>

            {/* MENU PANEL */}
            <div
                ref={panelRef}
                className={`fixed top-0 ${position}-0 h-full w-full sm:w-[420px] bg-gradient-to-b from-[${colors[0]}] to-[${colors[1]}] z-[9999] flex flex-col justify-center px-10`}
            >
                {showHeader && (
                    <div className="absolute top-6 left-6 text-gray-300 text-lg font-semibold">
                        Menu
                    </div>
                )}

                {/* MENU ITEMS */}
                <div className="flex flex-col gap-8">
                    {items.map((it, idx) => (
                        <a
                            key={idx}
                            ref={(el) => {
                                if (el) itemsRef.current[idx] = el;
                            }}
                            href={it.link}
                            aria-label={it.ariaLabel}
                            onClick={() => {
                                if (it.onClick) it.onClick();
                                if (onMenuClose) onMenuClose();
                            }}
                            className="text-white text-4xl sm:text-5xl font-bold tracking-tight uppercase hover:text-purple-400 transition-colors duration-200"
                        >
                            {it.label}
                        </a>
                    ))}
                </div>

                {/* OPTIONAL SOCIALS */}
                {displaySocials && (
                    <div className="absolute bottom-10 left-10 flex gap-5">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            Instagram
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            GitHub
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default StaggeredMenu;

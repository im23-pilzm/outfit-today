"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Header() {
    const pathname = usePathname();
    const underlineRef = useRef(null);
    const navRef = useRef(null);
    
    const navItems = [
        { href: '/outfits', label: 'Outfits' },
        { href: '/wardrobe', label: 'Kleiderschrank' },
        { href: '/profile', label: 'Profil' },
    ];

    useEffect(() => {
        const activeLink = navRef.current?.querySelector('.active-nav-link');
        if (activeLink && underlineRef.current) {
            const { width, left } = activeLink.getBoundingClientRect();
            const navLeft = navRef.current.getBoundingClientRect().left;
            underlineRef.current.style.width = `${width}px`;
            underlineRef.current.style.transform = `translateX(${left - navLeft}px)`;
        }
    }, [pathname]);

    return (
        <>
            <motion.header
                className="fixed top-0 w-full bg-[#FAF9F6] text-[#4C2B08] py-4 z-50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <nav className="flex justify-between items-center px-20 mx-auto">
                    <div className="flex justify-center items-center">
                        <Image
                            src="/hanger.png"
                            alt="HangerIcon"
                            height={31}
                            width={31}
                        />
                        <Link href="/outfits" className="nav-link ml-4 font-semibold text-[#4C2B08]">
                            OutfitToday
                        </Link>
                    </div>
                    <div className="flex gap-8 relative" ref={navRef}>
                        <div 
                            ref={underlineRef}
                            className="sliding-underline"
                        />
                        {navItems.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`
                                    nav-link
                                    relative
                                    text-[#4C2B08]
                                    transition-all
                                    duration-300
                                    py-1
                                    ${pathname === href ? 'active-nav-link' : ''}
                                `}
                                onMouseEnter={(e) => {
                                    const { width, left } = e.currentTarget.getBoundingClientRect();
                                    const navLeft = navRef.current.getBoundingClientRect().left;
                                    underlineRef.current.style.width = `${width}px`;
                                    underlineRef.current.style.transform = `translateX(${left - navLeft}px)`;
                                }}
                                onMouseLeave={() => {
                                    const activeLink = navRef.current.querySelector('.active-nav-link');
                                    if (activeLink) {
                                        const { width, left } = activeLink.getBoundingClientRect();
                                        const navLeft = navRef.current.getBoundingClientRect().left;
                                        underlineRef.current.style.width = `${width}px`;
                                        underlineRef.current.style.transform = `translateX(${left - navLeft}px)`;
                                    }
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </motion.header>
            <style jsx global>{`
                .nav-link {
                    position: relative;
                    display: inline-block;
                }

                .sliding-underline {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 2px;
                    background: #4C2B08;
                    transition: transform 0.3s ease, width 0.3s ease;
                }
            `}</style>
        </>
    );
}
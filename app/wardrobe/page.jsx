"use client"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WardrobePage() {
    return (
        <>
            <div className="flex justify-center items-center gap-4 w-full h-screen px-4">
                <motion.div className="w-1/2 flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/wardrobe/myWardrobe" className="border-3 border-[#4C2B08] transition-colors duration-200 rounded-lg h-[744px] w-[523px] flex flex-col justify-center items-center">
                            <Image
                                src="/wardrobe.png"
                                alt="HangerIcon"
                                width={1000}
                                height={0}
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '1000px'
                                }}
                            />
                            <p className="text-5xl text-[#4C2B08] text-center font-semibold mt-20">Mein <br />Kleiderschrank</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                fill="#4C2B08"
                                className="bi bi-arrow-right transition-transform duration-200 group-hover:translate-x-2 mt-5"
                                viewBox="0 0 16 16"
                            >
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>
                <motion.div className="w-1/2 flex items-center justify-center">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="/wardrobe/createOutfit" className="border-3 border-[#4C2B08] transition-colors duration-200 rounded-lg h-[744px] w-[523px] flex flex-col justify-center items-center">
                            <Image
                                src="/tshirt.png"
                                alt="HangerIcon"
                                width={1000}
                                height={0}
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    maxWidth: '1000px'
                                }}
                            />
                            <p className="text-5xl text-[#4C2B08] text-center font-semibold mt-20">Outfit erstellen</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                fill="#4C2B08"
                                className="bi bi-arrow-right transition-transform duration-200 group-hover:translate-x-2 mt-5"
                                viewBox="0 0 16 16"
                            >
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
"use client"
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WardrobePage() {
    return (
        <>
        <div className="flex justify-center items-center gap-4 w-full h-screen px-4">
            <motion.div className="w-1/2 flex items-center justify-center">
                <div className="border-3 border-[#4C2B08] rounded-lg h-160 w-100">

                </div>
            </motion.div>
            <motion.div className="w-1/2 flex items-center justify-center">
                <div className="border-3 border-[#4C2B08] rounded-lg h-160 w-100">

                </div>
            </motion.div>
        </div>

        </>
    );
}
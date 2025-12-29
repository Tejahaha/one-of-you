"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { Users } from "lucide-react";

export default function EntryScreen() {
    const { dispatch } = useGame();

    return (
        <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 md:p-12 lg:p-16 bg-neutral-950 pattern-dots relative overflow-hidden">
            {/* Corner decorations - non-interactive */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-neutral-700 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-neutral-700 pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-neutral-700 pointer-events-none" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-neutral-700 pointer-events-none" />

            {/* Top accent bar */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-4 py-2 sm:py-4 relative z-10">
                <div className="h-[2px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent to-neutral-700" />
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" />
                <div className="h-[2px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent to-neutral-700" />
            </div>

            {/* Center content */}
            <div className="flex-1 flex flex-col items-center justify-center max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={spring}
                    className="text-center"
                >
                    {/* Tagline */}
                    <p className="text-xs sm:text-sm md:text-base font-bold text-neutral-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                        A Game of Suspicion
                    </p>

                    {/* Title - scales from mobile to desktop */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight uppercase leading-[0.9] text-white">
                        One
                        <br />
                        <span className="text-yellow-500">Of</span>
                        <br />
                        You
                    </h1>

                    {/* Decorative line */}
                    <div className="mt-4 sm:mt-6 lg:mt-8 flex items-center justify-center gap-2">
                        <div className="w-6 sm:w-8 lg:w-12 h-1 bg-neutral-700" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-500 rotate-45" />
                        <div className="w-6 sm:w-8 lg:w-12 h-1 bg-neutral-700" />
                    </div>
                </motion.div>
            </div>

            {/* Button container with max width */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.1 }}
                className="w-full max-w-md lg:max-w-lg relative z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "START_SETUP" })}
                    className="w-full bg-white text-black text-lg sm:text-xl md:text-2xl font-bold py-4 sm:py-5 md:py-6 border-4 border-white uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none active:translate-x-1 active:translate-y-1 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                    Start Game
                </motion.button>
            </motion.div>
        </div>
    );
}

"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { Users, Sparkles } from "lucide-react";

export default function EntryScreen() {
    const { dispatch } = useGame();

    return (
        <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 md:p-12 lg:p-16 bg-neutral-950 pattern-dots relative overflow-hidden noise">
            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Corner decorations - enhanced with glow */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-yellow-500/30 pointer-events-none" />

            {/* Top accent bar */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-4 py-2 sm:py-4 relative z-10">
                <div className="h-[2px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent via-yellow-500/50 to-yellow-500/30" />
                <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                </div>
                <div className="h-[2px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent via-yellow-500/50 to-yellow-500/30" />
            </div>

            {/* Center content */}
            <div className="flex-1 flex flex-col items-center justify-center max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={spring}
                    className="text-center"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/80 border border-neutral-700 rounded-full mb-4 sm:mb-6">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                        <p className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-[0.2em]">
                            A Game of Suspicion
                        </p>
                    </div>

                    {/* Title - with glow effect */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight uppercase leading-[0.9] text-white text-glow-white">
                        One
                        <br />
                        <span className="text-yellow-500 text-glow-yellow">Of</span>
                        <br />
                        You
                    </h1>

                    {/* Decorative element */}
                    <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center justify-center gap-3">
                        <div className="w-8 sm:w-12 lg:w-16 h-[2px] bg-gradient-to-r from-transparent to-neutral-600" />
                        <div className="w-3 h-3 bg-yellow-500 rotate-45 glow-yellow-subtle" />
                        <div className="w-8 sm:w-12 lg:w-16 h-[2px] bg-gradient-to-l from-transparent to-neutral-600" />
                    </div>

                    {/* Tagline */}
                    <p className="mt-6 text-neutral-500 text-sm sm:text-base max-w-xs mx-auto">
                        Find the imposter among your friends before it's too late.
                    </p>
                </motion.div>
            </div>

            {/* Button container */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.1 }}
                className="w-full max-w-md lg:max-w-lg relative z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "START_SETUP" })}
                    className="w-full bg-yellow-500 text-black text-lg sm:text-xl md:text-2xl font-black py-5 sm:py-6 md:py-7 border-4 border-yellow-500 uppercase glow-yellow hover:bg-yellow-400 hover:border-yellow-400 transition-all cursor-pointer btn-glow"
                >
                    Start Game
                </motion.button>
                <p className="text-center text-neutral-600 text-xs mt-3 uppercase tracking-wider">
                    3+ players required
                </p>
            </motion.div>
        </div>
    );
}

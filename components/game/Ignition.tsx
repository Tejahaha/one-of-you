"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mic } from "lucide-react";
import { spring, springHeavy } from "@/lib/motion";

export default function Ignition() {
    const { state, dispatch } = useGame();

    if (state.startingPlayerIndex === null) return null;

    const startingPlayer = state.players[state.startingPlayerIndex];

    return (
        <div className="flex flex-col items-center justify-center h-full bg-yellow-500 p-4 sm:p-6 md:p-8 lg:p-12 text-black relative overflow-hidden noise">
            {/* Background pattern */}
            <div className="absolute inset-0 pattern-lines opacity-1 pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-black/20 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-black/20 pointer-events-none" />

            <div className="relative text-center space-y-4 sm:space-y-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto z-10 px-4">
                {/* Icon */}
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
                    <div className="h-[2px] w-6 sm:w-8 lg:w-12 bg-black/20" />
                    <div className="p-2 sm:p-3 bg-black/10 rounded-full">
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-black/60" />
                    </div>
                    <div className="h-[2px] w-6 sm:w-8 lg:w-12 bg-black/20" />
                </div>

                <p className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide">First Speaker</p>

                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={springHeavy}
                    className="bg-neutral-950 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-tight text-white break-words hyphens-auto">
                        {startingPlayer}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest"
                >
                    Starts the discussion
                </motion.p>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.4 }}
                className="relative mt-8 sm:mt-12 lg:mt-16 w-full max-w-xs sm:max-w-sm md:max-w-md z-10 px-4"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "BEGIN_DISCUSSION" })}
                    className="w-full px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-black text-white text-base sm:text-lg md:text-xl font-black uppercase flex items-center justify-center gap-2 sm:gap-3 rounded-xl shadow-xl hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                    Let&apos;s Go <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}

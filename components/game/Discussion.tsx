"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { AlertTriangle, MessageSquare, Radio } from "lucide-react";
import { spring } from "@/lib/motion";

export default function Discussion() {
    const { dispatch } = useGame();

    return (
        <div className="flex flex-col items-center justify-between h-full bg-neutral-950 text-white p-4 sm:p-6 md:p-8 lg:p-12 relative noise">
            {/* Background pattern */}
            <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Content */}
            <div className="relative flex-1 flex flex-col items-center justify-center text-center max-w-md lg:max-w-lg mx-auto z-10 px-4">
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-neutral-900 border-2 border-neutral-800 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-500" />
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                    <Radio className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" />
                    <p className="text-xs sm:text-sm font-bold text-red-500 uppercase tracking-wider">
                        Discussion Active
                    </p>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white mb-2">
                    Talk It Out
                </h1>
                <p className="text-neutral-500 text-xs sm:text-sm max-w-xs">
                    Discuss clues, question each other, and find the imposter among you.
                </p>

                {/* Decorative element */}
                <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-8 lg:w-12 h-[2px] bg-gradient-to-r from-transparent to-neutral-700" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neutral-700 rotate-45" />
                    <div className="w-6 sm:w-8 lg:w-12 h-[2px] bg-gradient-to-l from-transparent to-neutral-700" />
                </div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.2 }}
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg z-10 px-4"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "REVEAL_IMPOSTER" })}
                    className="w-full py-4 sm:py-5 md:py-6 bg-red-600 text-white text-base sm:text-lg md:text-xl font-black uppercase flex items-center justify-center gap-2 glow-red hover:bg-red-500 transition-all cursor-pointer rounded-xl"
                >
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" /> Reveal Imposter
                </motion.button>
                <p className="text-center text-neutral-600 text-xs mt-3 uppercase tracking-wider">
                    When everyone is ready to vote
                </p>
            </motion.div>
        </div>
    );
}

"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { AlertTriangle, MessageSquare } from "lucide-react";
import { spring } from "@/lib/motion";

export default function Discussion() {
    const { dispatch } = useGame();

    return (
        <div className="flex flex-col items-center justify-between h-full bg-neutral-950 text-white p-6 sm:p-8 md:p-12 lg:p-16 relative">
            {/* Background pattern - non-interactive */}
            <div className="absolute inset-0 pattern-dots opacity-30 pointer-events-none" />

            {/* Top border accent - non-interactive */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent pointer-events-none" />

            {/* Content */}
            <div className="relative flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto z-10">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-neutral-700 flex items-center justify-center mb-4 sm:mb-6">
                    <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-neutral-500" />
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-xs sm:text-sm font-bold text-red-500 uppercase tracking-wider">
                        Live
                    </p>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white mb-2">
                    Discussion
                </h1>
                <p className="text-neutral-500 text-xs sm:text-sm max-w-xs">
                    Talk, question, and find the one who doesn't belong.
                </p>

                {/* Decorative element */}
                <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3">
                    <div className="w-6 sm:w-8 h-[2px] bg-neutral-800" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border-2 border-neutral-700 rotate-45" />
                    <div className="w-6 sm:w-8 h-[2px] bg-neutral-800" />
                </div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.2 }}
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "REVEAL_IMPOSTER" })}
                    className="w-full py-4 sm:py-5 bg-red-600 text-white text-lg sm:text-xl font-black uppercase border-4 border-red-600 flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)] active:shadow-none active:translate-x-1 active:translate-y-1 hover:bg-red-700 transition-colors cursor-pointer"
                >
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" /> Reveal Imposter
                </motion.button>
            </motion.div>
        </div>
    );
}

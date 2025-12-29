"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { spring, springHeavy } from "@/lib/motion";

export default function Ignition() {
    const { state, dispatch } = useGame();

    if (state.startingPlayerIndex === null) return null;

    const startingPlayer = state.players[state.startingPlayerIndex];

    return (
        <div className="flex flex-col items-center justify-center h-full bg-yellow-500 p-6 sm:p-8 md:p-12 lg:p-16 text-black relative overflow-hidden">
            {/* Background pattern - non-interactive */}
            <div className="absolute inset-0 pattern-lines opacity-30 pointer-events-none" />

            {/* Corner decorations - non-interactive */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-black/20 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-black/20 pointer-events-none" />

            <div className="relative text-center space-y-4 sm:space-y-6 max-w-lg lg:max-w-xl mx-auto z-10">
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
                    <div className="h-[2px] w-6 sm:w-8 bg-black/30" />
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-black/50" />
                    <div className="h-[2px] w-6 sm:w-8 bg-black/30" />
                </div>

                <p className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide">First Speaker</p>

                <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={springHeavy}
                    className="bg-neutral-950 border-4 border-neutral-950 p-6 sm:p-8 md:p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none text-white">
                        {startingPlayer}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm sm:text-base font-bold uppercase tracking-widest"
                >
                    Starts the discussion
                </motion.p>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.4 }}
                className="relative mt-10 sm:mt-16 w-full max-w-xs sm:max-w-sm md:max-w-md z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "BEGIN_DISCUSSION" })}
                    className="w-full px-8 sm:px-10 py-4 sm:py-5 bg-black text-white text-lg sm:text-xl font-black uppercase flex items-center justify-center gap-2 sm:gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] active:shadow-none active:translate-x-1 active:translate-y-1 hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                    Let&apos;s Go <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}

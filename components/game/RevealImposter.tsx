"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { RotateCcw, Home, Skull } from "lucide-react";
import { springHeavy, spring } from "@/lib/motion";

export default function RevealImposter() {
    const { state, dispatch } = useGame();

    if (state.imposterIndex === null) return null;

    const imposterName = state.players[state.imposterIndex];
    const word = state.commonWord;

    return (
        <div className="flex flex-col items-center justify-between h-full bg-neutral-950 text-white p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Background pattern - non-interactive */}
            <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />

            {/* Top red accent - non-interactive */}
            <div className="absolute top-0 left-0 right-0 h-1 sm:h-2 bg-red-600 pointer-events-none" />

            {/* Corner decorations - non-interactive */}
            <div className="absolute top-6 left-4 sm:top-8 sm:left-6 lg:top-10 lg:left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-red-600/30 pointer-events-none" />
            <div className="absolute top-6 right-4 sm:top-8 sm:right-6 lg:top-10 lg:right-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-red-600/30 pointer-events-none" />

            <div className="relative flex-1 flex flex-col items-center justify-center w-full space-y-6 sm:space-y-8 max-w-lg lg:max-w-xl mx-auto z-10">
                {/* Verdict label */}
                <div className="flex items-center gap-2">
                    <div className="h-[2px] w-4 sm:w-6 bg-neutral-700" />
                    <p className="text-xs sm:text-sm font-black uppercase text-neutral-500 tracking-widest">
                        Verdict
                    </p>
                    <div className="h-[2px] w-4 sm:w-6 bg-neutral-700" />
                </div>

                {/* Imposter reveal */}
                <div className="text-center space-y-3 sm:space-y-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-600 flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]">
                        <Skull className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    <p className="text-xs sm:text-sm font-bold uppercase text-neutral-500 tracking-widest">
                        The Imposter was
                    </p>

                    <motion.h1
                        initial={{ scale: 0.85, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={springHeavy}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-red-500 leading-none"
                    >
                        {imposterName}
                    </motion.h1>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="w-full max-w-[200px] sm:max-w-xs h-[2px] bg-neutral-800"
                />

                {/* Word reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center space-y-2"
                >
                    <p className="text-xs sm:text-sm font-bold uppercase text-neutral-500 tracking-widest">
                        The Word was
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-yellow-500">{word}</h2>
                </motion.div>
            </div>

            {/* Buttons */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.8 }}
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md space-y-2 sm:space-y-3 z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "PLAY_AGAIN" })}
                    className="w-full py-4 sm:py-5 bg-white text-black text-lg sm:text-xl font-black uppercase border-4 border-white flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none active:translate-x-1 active:translate-y-1 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> Play Again
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dispatch({ type: "RESET" })}
                    className="w-full py-2.5 sm:py-3 bg-transparent text-neutral-500 text-xs sm:text-sm font-bold uppercase border-2 border-neutral-700 flex items-center justify-center gap-2 active:text-white active:border-neutral-500 hover:text-neutral-300 hover:border-neutral-500 transition-colors cursor-pointer"
                >
                    <Home className="w-3 h-3 sm:w-4 sm:h-4" /> New Game
                </motion.button>
            </motion.div>
        </div>
    );
}

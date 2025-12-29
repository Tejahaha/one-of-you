"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { RotateCcw, Home, Skull, Swords } from "lucide-react";
import { springHeavy, spring } from "@/lib/motion";

export default function RevealImposter() {
    const { state, dispatch } = useGame();

    if (state.imposterIndex === null) return null;

    const imposterName = state.players[state.imposterIndex];
    const word = state.commonWord;

    return (
        <div className="flex flex-col items-center justify-between h-full bg-neutral-950 text-white p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden noise">
            {/* Background pattern */}
            <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />

            {/* Top red accent */}
            <div className="absolute top-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-6 left-4 sm:top-8 sm:left-6 lg:top-10 lg:left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-red-600/30 pointer-events-none" />
            <div className="absolute top-6 right-4 sm:top-8 sm:right-6 lg:top-10 lg:right-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-red-600/30 pointer-events-none" />

            <div className="relative flex-1 flex flex-col items-center justify-center w-full space-y-6 sm:space-y-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto z-10 px-4">
                {/* Verdict label */}
                <div className="flex items-center gap-2">
                    <div className="h-[2px] w-4 sm:w-6 lg:w-8 bg-neutral-700" />
                    <div className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                        <p className="text-xs sm:text-sm font-black uppercase text-red-500 tracking-widest flex items-center gap-2">
                            <Swords className="w-3 h-3 sm:w-4 sm:h-4" /> Verdict
                        </p>
                    </div>
                    <div className="h-[2px] w-4 sm:w-6 lg:w-8 bg-neutral-700" />
                </div>

                {/* Imposter reveal */}
                <div className="text-center space-y-3 sm:space-y-4 w-full">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-600 flex items-center justify-center mx-auto rounded-2xl glow-red">
                        <Skull className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>

                    <p className="text-xs sm:text-sm font-bold uppercase text-neutral-500 tracking-widest">
                        The Imposter was
                    </p>

                    <motion.h1
                        initial={{ scale: 0.85, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        transition={springHeavy}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase text-red-500 leading-none text-glow-red break-words hyphens-auto"
                    >
                        {imposterName}
                    </motion.h1>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-xs h-[2px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent"
                />

                {/* Word reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center space-y-2 px-4 py-4 sm:py-6 bg-neutral-900/50 border border-neutral-800 rounded-xl w-full max-w-xs sm:max-w-sm"
                >
                    <p className="text-xs sm:text-sm font-bold uppercase text-neutral-500 tracking-widest">
                        The Secret Word was
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-yellow-500 text-glow-yellow break-words">{word}</h2>
                </motion.div>
            </div>

            {/* Buttons */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.8 }}
                className="relative w-full max-w-xs sm:max-w-sm md:max-w-md space-y-2 sm:space-y-3 z-10 px-4"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "PLAY_AGAIN" })}
                    className="w-full py-4 sm:py-5 bg-white text-black text-base sm:text-lg md:text-xl font-black uppercase flex items-center justify-center gap-2 glow-white hover:bg-neutral-100 transition-colors cursor-pointer rounded-xl"
                >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> Play Again
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dispatch({ type: "RESET" })}
                    className="w-full py-2.5 sm:py-3 bg-transparent text-neutral-500 text-xs sm:text-sm font-bold uppercase border border-neutral-700 flex items-center justify-center gap-2 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer rounded-xl"
                >
                    <Home className="w-3 h-3 sm:w-4 sm:h-4" /> New Game
                </motion.button>
            </motion.div>
        </div>
    );
}

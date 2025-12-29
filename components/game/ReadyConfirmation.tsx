"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { Zap, Users, CheckCircle } from "lucide-react";
import { spring } from "@/lib/motion";

export default function ReadyConfirmation() {
    const { dispatch } = useGame();

    return (
        <div className="flex flex-col items-center justify-center h-full bg-neutral-950 p-4 sm:p-6 md:p-8 lg:p-12 text-center relative overflow-hidden noise">
            {/* Background pattern */}
            <div className="absolute inset-0 pattern-cross pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-yellow-500/20 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-yellow-500/20 pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-yellow-500/20 pointer-events-none" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-yellow-500/20 pointer-events-none" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={spring}
                className="relative mb-8 sm:mb-12 z-10 px-4"
            >
                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-4 sm:mb-6 rounded-2xl glow-yellow">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-white">
                    All Players
                    <br />
                    <span className="text-yellow-500 text-glow-yellow">Ready</span>
                </h1>

                {/* Decorative line */}
                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
                    <div className="w-8 sm:w-10 lg:w-12 h-[2px] bg-gradient-to-r from-transparent to-neutral-600" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rotate-45 glow-yellow-subtle" />
                    <div className="w-8 sm:w-10 lg:w-12 h-[2px] bg-gradient-to-l from-transparent to-neutral-600" />
                </div>

                <p className="mt-4 sm:mt-6 text-neutral-500 text-sm sm:text-base max-w-xs mx-auto">
                    Everyone has seen their role. Time to begin!
                </p>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.1 }}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md relative z-10 px-4"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "START_GAME" })}
                    className="w-full px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-yellow-500 text-black text-lg sm:text-xl md:text-2xl font-black uppercase glow-yellow hover:bg-yellow-400 transition-all cursor-pointer btn-glow flex items-center justify-center gap-2 sm:gap-3 rounded-xl"
                >
                    Begin <Zap className="w-6 h-6 sm:w-7 sm:h-7 fill-black" />
                </motion.button>
            </motion.div>
        </div>
    );
}

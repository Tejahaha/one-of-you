"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion } from "framer-motion";
import { Zap, Users } from "lucide-react";
import { spring } from "@/lib/motion";

export default function ReadyConfirmation() {
    const { dispatch } = useGame();

    return (
        <div className="flex flex-col items-center justify-center h-full bg-neutral-950 p-6 sm:p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            {/* Background pattern - non-interactive */}
            <div className="absolute inset-0 pattern-cross pointer-events-none" />

            {/* Corner decorations - non-interactive */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-neutral-800 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-neutral-800 pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-neutral-800 pointer-events-none" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-neutral-800 pointer-events-none" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={spring}
                className="relative mb-8 sm:mb-12 z-10"
            >
                {/* Icon */}
                <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-yellow-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                    <Users className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-white">
                    All Players
                    <br />
                    <span className="text-yellow-500">Ready</span>
                </h1>

                {/* Decorative line */}
                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2">
                    <div className="w-8 sm:w-10 lg:w-12 h-1 bg-neutral-700" />
                    <div className="w-2 h-2 bg-yellow-500 rotate-45" />
                    <div className="w-8 sm:w-10 lg:w-12 h-1 bg-neutral-700" />
                </div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.1 }}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md relative z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "START_GAME" })}
                    className="w-full px-8 sm:px-10 py-5 sm:py-6 bg-white text-black text-xl sm:text-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 sm:gap-3 hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                    Begin <Zap className="w-6 h-6 sm:w-7 sm:h-7 fill-yellow-500 text-yellow-500" />
                </motion.button>
            </motion.div>
        </div>
    );
}

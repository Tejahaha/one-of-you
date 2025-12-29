"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion, useAnimationControls } from "framer-motion";
import { spring, heroFloatIn } from "@/lib/motion";
import { Users, Sparkles, Eye, Zap, CircleHelp, Skull, Search, Shield, UserX } from "lucide-react";
import { useEffect } from "react";

export default function EntryScreen() {
    const { dispatch } = useGame();

    const controls1 = useAnimationControls();
    const controls2 = useAnimationControls();

    // Play animation every time user enters homepage
    useEffect(() => {
        // Reset to initial state first, then animate
        controls1.set("initial");
        controls2.set("initial");

        // Small delay to ensure initial state is set
        const timer = setTimeout(() => {
            controls1.start("animate");
            controls2.start("animate");
        }, 50);

        return () => clearTimeout(timer);
    }, [controls1, controls2]);

    return (
        <div className="flex flex-col items-center justify-between h-full p-6 sm:p-8 md:p-12 lg:p-16 bg-neutral-950 pattern-dots relative overflow-hidden noise">
            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-yellow-500/30 pointer-events-none" />

            {/* Scattered background icons - static, muted */}
            <div className="absolute left-[12%] top-[20%] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rotate-12 opacity-[0.08] pointer-events-none hidden md:block">
                <CircleHelp className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute right-[15%] top-[15%] w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 -rotate-15 opacity-[0.06] pointer-events-none hidden md:block">
                <Skull className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute left-[8%] top-[55%] w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11 rotate-[-20deg] opacity-[0.07] pointer-events-none hidden lg:block">
                <Search className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute right-[10%] bottom-[45%] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rotate-[25deg] opacity-[0.05] pointer-events-none hidden lg:block">
                <Shield className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute left-[20%] bottom-[35%] w-6 h-6 sm:w-8 sm:h-8 rotate-[-10deg] opacity-[0.06] pointer-events-none hidden xl:block">
                <UserX className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute right-[22%] top-[40%] w-5 h-5 sm:w-7 sm:h-7 rotate-[15deg] opacity-[0.04] pointer-events-none hidden xl:block">
                <Eye className="w-full h-full text-yellow-500" />
            </div>

            {/* Animated background icons - same pull animation, muted colors */}
            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls1}
                custom={{ delay: 0.05, rotate: 15, finalY: -120 }}
                className="absolute left-[18%] bottom-[20%] w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 z-0 pointer-events-none hidden md:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/60 bg-neutral-900/40 flex items-center justify-center">
                    <CircleHelp className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls2}
                custom={{ delay: 0.08, rotate: -12, finalY: -80 }}
                className="absolute right-[20%] bottom-[15%] w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 z-0 pointer-events-none hidden md:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/50 bg-neutral-900/30 flex items-center justify-center">
                    <Skull className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls1}
                custom={{ delay: 0.1, rotate: 20, finalY: -180 }}
                className="absolute left-[25%] bottom-[30%] w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 z-0 pointer-events-none hidden lg:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/40 bg-neutral-900/25 flex items-center justify-center">
                    <Search className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls2}
                custom={{ delay: 0.15, rotate: -8, finalY: -100 }}
                className="absolute right-[28%] bottom-[25%] w-6 h-6 sm:w-9 sm:h-9 lg:w-11 lg:h-11 z-0 pointer-events-none hidden lg:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/35 bg-neutral-900/20 flex items-center justify-center">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls1}
                custom={{ delay: 0.18, rotate: 10, finalY: -150 }}
                className="absolute left-[35%] bottom-[12%] w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 z-0 pointer-events-none hidden xl:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/30 bg-neutral-900/15 flex items-center justify-center">
                    <UserX className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-neutral-600" />
                </div>
            </motion.div>

            {/* LEFT ICON CARD — Suspicion/Eye */}
            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls1}
                custom={{
                    delay: 0,
                    rotate: -8,
                    finalY: -250,
                }}
                className="absolute left-4 sm:left-8 lg:left-16 xl:left-24 bottom-16 sm:bottom-12 lg:bottom-8 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] xl:w-[240px] z-0"
                style={{ transformOrigin: "center bottom" }}
            >
                <div className="relative aspect-square">
                    {/* Glow behind card */}
                    <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-3xl" />

                    {/* Card */}
                    <div className="relative w-full h-full border-4 border-yellow-500 bg-neutral-950 flex flex-col items-center justify-center shadow-2xl">
                        {/* Large icon */}
                        <Eye className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-500 stroke-[1.5]" />

                        {/* Label */}
                        <div className="absolute bottom-2 sm:bottom-3 left-2 right-2 sm:left-3 sm:right-3 text-center">
                            <p className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] text-yellow-500 font-black">
                                Suspicion
                            </p>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-2 right-2 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500" />
                    </div>
                </div>
            </motion.div>

            {/* RIGHT ICON CARD — Reveal/Zap */}
            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls2}
                custom={{
                    delay: 0.12,
                    rotate: 6,
                    finalY: -60,
                }}
                className="absolute right-4 sm:right-8 lg:right-16 xl:right-24 bottom-24 sm:bottom-20 lg:bottom-16 w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px] xl:w-[240px] z-0"
                style={{ transformOrigin: "center bottom" }}
            >
                <div className="relative aspect-square">
                    {/* Glow behind card */}
                    <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-3xl" />

                    {/* Card */}
                    <div className="relative w-full h-full border-4 border-yellow-500 bg-neutral-950 flex flex-col items-center justify-center shadow-2xl">
                        {/* Large icon */}
                        <Zap className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-yellow-500 stroke-[1.5] fill-yellow-500/20" />

                        {/* Label */}
                        <div className="absolute bottom-2 sm:bottom-3 left-2 right-2 sm:left-3 sm:right-3 text-center">
                            <p className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] text-yellow-500 font-black">
                                Reveal
                            </p>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-2 left-2 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500" />
                    </div>
                </div>
            </motion.div>



            {/* Top accent bar */}
            <div className="w-full flex items-center justify-center gap-3 sm:gap-4 py-2 sm:py-4 relative z-10">
                <div className="h-[2px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent via-yellow-500/50 to-yellow-500/30" />
                <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                </div>
                <div className="h-[2px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent via-yellow-500/50 to-yellow-500/30" />
            </div>

            {/* Center text */}
            <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ...spring, delay: 0.4 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/80 border border-neutral-700 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em]">
                            A Game of Suspicion
                        </p>
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.9] text-white">
                        One
                        <br />
                        <span className="text-yellow-500">Of</span>
                        <br />
                        You
                    </h1>

                    <p className="mt-6 text-neutral-500 text-sm sm:text-base max-w-xs mx-auto">
                        Find the imposter among your friends before it&apos;s too late.
                    </p>
                </motion.div>
            </div>

            {/* CTA */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.5 }}
                className="w-full max-w-lg relative z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "START_SETUP" })}
                    className="w-full bg-yellow-500 text-black text-xl md:text-2xl font-black py-6 border-4 border-yellow-500 uppercase hover:bg-yellow-400 hover:border-yellow-400 transition-all cursor-pointer"
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

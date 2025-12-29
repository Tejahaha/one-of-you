"use client";

import { useGame } from "@/lib/game/GameContext";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { spring, heroFloatIn } from "@/lib/motion";
import { Users, Sparkles, Eye, Zap, CircleHelp, Skull, Search, Shield, UserX, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function EntryScreen() {
    const { dispatch } = useGame();
    const [showInstructions, setShowInstructions] = useState(false);

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
        <div className="flex flex-col items-center justify-between h-full p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-neutral-950 pattern-dots relative overflow-hidden noise">
            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-yellow-500/5 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] pointer-events-none" />



            {/* Corner decorations */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 border-l-2 sm:border-l-3 lg:border-l-4 border-t-2 sm:border-t-3 lg:border-t-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 border-r-2 sm:border-r-3 lg:border-r-4 border-t-2 sm:border-t-3 lg:border-t-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 border-l-2 sm:border-l-3 lg:border-l-4 border-b-2 sm:border-b-3 lg:border-b-4 border-yellow-500/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 border-r-2 sm:border-r-3 lg:border-r-4 border-b-2 sm:border-b-3 lg:border-b-4 border-yellow-500/30 pointer-events-none" />

            {/* Scattered background icons - static, muted */}
            <div className="absolute left-[12%] top-[20%] w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rotate-12 opacity-[0.08] pointer-events-none hidden md:block">
                <CircleHelp className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute right-[15%] top-[15%] w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 -rotate-15 opacity-[0.06] pointer-events-none hidden md:block">
                <Skull className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute left-[8%] top-[55%] w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 xl:w-11 xl:h-11 rotate-[-20deg] opacity-[0.07] pointer-events-none hidden lg:block">
                <Search className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute right-[10%] bottom-[45%] w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rotate-[25deg] opacity-[0.05] pointer-events-none hidden lg:block">
                <Shield className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute left-[20%] bottom-[35%] w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rotate-[-10deg] opacity-[0.06] pointer-events-none hidden xl:block">
                <UserX className="w-full h-full text-yellow-500" />
            </div>
            <div className="absolute right-[22%] top-[40%] w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 rotate-[15deg] opacity-[0.04] pointer-events-none hidden xl:block">
                <Eye className="w-full h-full text-yellow-500" />
            </div>

            {/* Animated background icons - same pull animation, muted colors */}
            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls1}
                custom={{ delay: 0.05, rotate: 15, finalY: -120 }}
                className="absolute left-[18%] bottom-[20%] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 z-0 pointer-events-none hidden md:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/60 bg-neutral-900/40 flex items-center justify-center">
                    <CircleHelp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls2}
                custom={{ delay: 0.08, rotate: -12, finalY: -80 }}
                className="absolute right-[20%] bottom-[15%] w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 z-0 pointer-events-none hidden md:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/50 bg-neutral-900/30 flex items-center justify-center">
                    <Skull className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls1}
                custom={{ delay: 0.1, rotate: 20, finalY: -180 }}
                className="absolute left-[25%] bottom-[30%] w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 z-0 pointer-events-none hidden lg:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/40 bg-neutral-900/25 flex items-center justify-center">
                    <Search className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls2}
                custom={{ delay: 0.15, rotate: -8, finalY: -100 }}
                className="absolute right-[28%] bottom-[25%] w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-11 xl:h-11 z-0 pointer-events-none hidden lg:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/35 bg-neutral-900/20 flex items-center justify-center">
                    <Shield className="w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-neutral-600" />
                </div>
            </motion.div>

            <motion.div
                variants={heroFloatIn}
                initial="initial"
                animate={controls1}
                custom={{ delay: 0.18, rotate: 10, finalY: -150 }}
                className="absolute left-[35%] bottom-[12%] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-9 xl:h-9 z-0 pointer-events-none hidden xl:flex items-center justify-center"
            >
                <div className="w-full h-full border-2 border-neutral-700/30 bg-neutral-900/15 flex items-center justify-center">
                    <UserX className="w-2 h-2 sm:w-2 sm:h-2 md:w-2 md:h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 text-neutral-600" />
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
                className="absolute left-2 sm:left-4 md:left-8 lg:left-16 xl:left-24 bottom-12 sm:bottom-16 lg:bottom-12 w-[70px] sm:w-[100px] md:w-[130px] lg:w-[180px] xl:w-[220px] 2xl:w-[260px] z-0"
                style={{ transformOrigin: "center bottom" }}
            >
                <div className="relative aspect-square">
                    {/* Glow behind card */}
                    <div className="absolute inset-0 bg-yellow-500/20 blur-2xl sm:blur-3xl rounded-3xl" />

                    {/* Card */}
                    <div className="relative w-full h-full border-2 sm:border-3 lg:border-4 border-yellow-500 bg-neutral-950 flex flex-col items-center justify-center shadow-2xl">
                        {/* Large icon */}
                        <Eye className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-yellow-500 stroke-[1.5]" />

                        {/* Label */}
                        <div className="absolute bottom-1 sm:bottom-2 lg:bottom-3 left-1 right-1 sm:left-2 sm:right-2 lg:left-3 lg:right-3 text-center">
                            <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-yellow-500 font-black">
                                Suspicion
                            </p>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-yellow-500" />
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
                className="absolute right-2 sm:right-4 md:right-8 lg:right-16 xl:right-24 bottom-20 sm:bottom-24 lg:bottom-20 w-[70px] sm:w-[100px] md:w-[130px] lg:w-[180px] xl:w-[220px] 2xl:w-[260px] z-0"
                style={{ transformOrigin: "center bottom" }}
            >
                <div className="relative aspect-square">
                    {/* Glow behind card */}
                    <div className="absolute inset-0 bg-yellow-500/20 blur-2xl sm:blur-3xl rounded-3xl" />

                    {/* Card */}
                    <div className="relative w-full h-full border-2 sm:border-3 lg:border-4 border-yellow-500 bg-neutral-950 flex flex-col items-center justify-center shadow-2xl">
                        {/* Large icon */}
                        <Zap className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-yellow-500 stroke-[1.5] fill-yellow-500/20" />

                        {/* Label */}
                        <div className="absolute bottom-1 sm:bottom-2 lg:bottom-3 left-1 right-1 sm:left-2 sm:right-2 lg:left-3 lg:right-3 text-center">
                            <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-yellow-500 font-black">
                                Reveal
                            </p>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-yellow-500" />
                    </div>
                </div>
            </motion.div>

            {/* Top accent bar */}
            <div className="w-full flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 py-1 sm:py-2 lg:py-4 relative z-10">
                <div className="h-[1px] sm:h-[2px] flex-1 max-w-[40px] sm:max-w-[60px] lg:max-w-[100px] bg-gradient-to-r from-transparent via-yellow-500/50 to-yellow-500/30" />
                <div className="p-1.5 sm:p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-500" />
                </div>
                <div className="h-[1px] sm:h-[2px] flex-1 max-w-[40px] sm:max-w-[60px] lg:max-w-[100px] bg-gradient-to-l from-transparent via-yellow-500/50 to-yellow-500/30" />
            </div>

            {/* Center text */}
            <div className="flex-1 flex flex-col items-center justify-center max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto w-full relative z-10 px-2">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ ...spring, delay: 0.4 }}
                    className="text-center"
                >
                    <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-3 sm:mb-4 lg:mb-6">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-neutral-900/80 border border-neutral-700 rounded-full">
                            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-yellow-500" />
                            <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-neutral-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                                A Game of Suspicion
                            </p>
                        </div>

                        {/* INFO BUTTON - Next to badge with subtle pulse */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, ...spring }}
                            onClick={() => setShowInstructions(true)}
                            className="relative p-2 sm:p-2.5 bg-neutral-900/80 border border-yellow-500/40 rounded-full hover:border-yellow-500 hover:bg-neutral-800 transition-all group cursor-pointer animate-pulse-glow"
                            aria-label="How to play"
                        >
                            <Info className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
                        </motion.button>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black uppercase leading-[0.85] sm:leading-[0.9] text-white">
                        One
                        <br />
                        <span className="text-yellow-500">Of</span>
                        <br />
                        You
                    </h1>

                    <p className="mt-3 sm:mt-4 lg:mt-6 text-neutral-500 text-xs sm:text-sm lg:text-base max-w-[200px] sm:max-w-xs mx-auto">
                        Find the imposter among your friends before it&apos;s too late.
                    </p>
                </motion.div>
            </div>

            {/* CTA */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.5 }}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10"
            >
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => dispatch({ type: "START_SETUP" })}
                    className="w-full bg-yellow-500 text-black text-base sm:text-lg md:text-xl lg:text-2xl font-black py-4 sm:py-5 lg:py-6 border-2 sm:border-3 lg:border-4 border-yellow-500 uppercase hover:bg-yellow-400 hover:border-yellow-400 transition-all cursor-pointer"
                >
                    Start Game
                </motion.button>
                <p className="text-center text-neutral-600 text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-wider">
                    3+ players required
                </p>
            </motion.div>

            {/* INSTRUCTIONS MODAL */}
            <AnimatePresence>
                {showInstructions && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
                        onClick={() => setShowInstructions(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={spring}
                            className="bg-neutral-900 border-2 border-yellow-500/30 rounded-xl max-w-sm sm:max-w-md lg:max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-4 sm:p-5 flex items-center justify-between">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="p-1.5 sm:p-2 bg-yellow-500/10 rounded-lg">
                                        <Info className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-black text-white uppercase">How to Play</h2>
                                </div>
                                <button
                                    onClick={() => setShowInstructions(false)}
                                    className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-neutral-400" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5">
                                {/* Step 1 */}
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base font-black text-black">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm sm:text-base mb-1">Add Players</h3>
                                        <p className="text-neutral-400 text-xs sm:text-sm">Add at least 3 players. Each player will take turns viewing their card privately.</p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base font-black text-black">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm sm:text-base mb-1">Reveal Your Role</h3>
                                        <p className="text-neutral-400 text-xs sm:text-sm">Hold the card to see if you&apos;re the <span className="text-yellow-500 font-bold">Imposter</span> or a regular player with the secret word.</p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base font-black text-black">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm sm:text-base mb-1">Discuss & Describe</h3>
                                        <p className="text-neutral-400 text-xs sm:text-sm">Take turns describing the word without saying it directly. The imposter must blend in!</p>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base font-black text-black">4</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm sm:text-base mb-1">Vote & Reveal</h3>
                                        <p className="text-neutral-400 text-xs sm:text-sm">After discussion, vote on who you think is the imposter. Reveal to see if you were right!</p>
                                    </div>
                                </div>

                                {/* Tip */}
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 sm:p-4 mt-4">
                                    <p className="text-yellow-500 text-xs sm:text-sm font-medium">
                                        💡 <span className="font-bold">Pro Tip:</span> Be vague enough to catch the imposter, but specific enough to prove you know the word!
                                    </p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="border-t border-neutral-800 p-4 sm:p-5">
                                <button
                                    onClick={() => setShowInstructions(false)}
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3 sm:py-4 uppercase text-sm sm:text-base transition-colors rounded-lg cursor-pointer"
                                >
                                    Got it!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

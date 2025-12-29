"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useGame } from "@/lib/game/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Hand, User } from "lucide-react";
import { spring } from "@/lib/motion";

const LONG_PRESS_DURATION = 1000;

export default function CardReveal() {
    const { state, dispatch } = useGame();
    const [pressProgress, setPressProgress] = useState(0);
    const [isPressed, setIsPressed] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [canInteract, setCanInteract] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    const currentIndex = state.currentPlayerIndex;
    const currentPlayer = state.players[currentIndex];
    const isImposter = state.imposterIndex === currentIndex;
    const word = state.commonWord;
    const isAlreadyRevealed = state.revealedCards[currentIndex];

    // Reset local state when currentIndex changes
    useEffect(() => {
        setShowContent(false);
        setPressProgress(0);
        setIsPressed(false);
        setCanInteract(true);
    }, [currentIndex]);

    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startPress = useCallback(() => {
        if (!canInteract || isAlreadyRevealed) return;

        setIsPressed(true);
        startTimeRef.current = Date.now();

        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const progress = Math.min(elapsed / LONG_PRESS_DURATION, 1);
            setPressProgress(progress);

            if (progress >= 1) {
                clearTimer();
                setShowContent(true);
                dispatch({ type: "REVEAL_CARD", index: currentIndex });
            }
        }, 16);
    }, [canInteract, isAlreadyRevealed, dispatch, currentIndex, clearTimer]);

    const endPress = useCallback(() => {
        clearTimer();
        setIsPressed(false);

        // If content was shown, pass to next
        if (showContent) {
            setCanInteract(false);
            setShowContent(false);

            // Delay to allow flip animation
            setTimeout(() => {
                dispatch({ type: "PASS_CARD", index: currentIndex });
            }, 300);
        } else {
            // Not fully revealed, reset progress
            setPressProgress(0);
        }
    }, [showContent, dispatch, currentIndex, clearTimer]);

    // Cleanup on unmount
    useEffect(() => {
        return () => clearTimer();
    }, [clearTimer]);

    return (
        <div className="flex flex-col h-full bg-neutral-950 overflow-hidden relative">
            {/* Background pattern */}
            <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none" />

            {/* Instructions Banner */}
            <div className="relative bg-yellow-500 p-2 sm:p-3 text-center border-b-4 border-yellow-600 z-10">
                <p className="text-xs sm:text-sm font-black uppercase text-black flex items-center justify-center gap-2">
                    <Hand className="w-3 h-3 sm:w-4 sm:h-4" />
                    Hold to see • Release to pass
                </p>
            </div>

            {/* Header */}
            <header className="relative p-3 sm:p-4 lg:p-6 border-b-4 border-neutral-800 z-10">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center flex-shrink-0">
                            <span className="text-base sm:text-lg font-black text-yellow-500">{currentIndex + 1}</span>
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-black uppercase text-white">
                                {currentPlayer}
                            </h2>
                            <p className="text-xs sm:text-sm font-bold text-neutral-500 uppercase tracking-wide">
                                Player {currentIndex + 1} of {state.players.length}
                            </p>
                        </div>
                    </div>
                    <div className="px-2 sm:px-3 py-1 bg-neutral-800 border-2 border-neutral-700">
                        <p className="text-xs font-black text-neutral-400 uppercase">
                            {showContent ? "👁️ Viewing" : "🔒 Hidden"}
                        </p>
                    </div>
                </div>
            </header>

            {/* Carousel Container */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={spring}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                    >
                        {/* The Card */}
                        <div
                            className="relative bg-neutral-900 border-4 border-neutral-700 overflow-hidden touch-none select-none cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
                            onTouchStart={startPress}
                            onTouchEnd={endPress}
                            onTouchCancel={endPress}
                            onMouseDown={startPress}
                            onMouseUp={endPress}
                            onMouseLeave={endPress}
                        >
                            {/* Corner accents */}
                            <div className="absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-t-2 border-yellow-500/30 pointer-events-none" />
                            <div className="absolute top-2 right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-t-2 border-yellow-500/30 pointer-events-none" />
                            <div className="absolute bottom-2 left-2 w-3 h-3 sm:w-4 sm:h-4 border-l-2 border-b-2 border-yellow-500/30 pointer-events-none" />
                            <div className="absolute bottom-2 right-2 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-b-2 border-yellow-500/30 pointer-events-none" />

                            {/* Progress bar */}
                            <div className="h-1.5 sm:h-2 bg-neutral-800">
                                <div
                                    className="h-full bg-yellow-500 transition-all duration-75"
                                    style={{ width: `${pressProgress * 100}%` }}
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                                {/* Player Name */}
                                <div className="text-center mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-dashed border-neutral-700">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-neutral-800 border-2 border-neutral-700 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                                        <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-neutral-500" />
                                    </div>
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white">
                                        {currentPlayer}
                                    </h1>
                                </div>

                                {/* Role Area */}
                                <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center">
                                    {showContent ? (
                                        // REVEALED - Show role
                                        <motion.div
                                            key="revealed"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-center w-full"
                                        >
                                            <div className="border-4 border-white p-4 sm:p-5 md:p-6 bg-neutral-800">
                                                {isImposter ? (
                                                    <>
                                                        <p className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-wider">
                                                            You are the
                                                        </p>
                                                        <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mt-1 text-red-500">
                                                            Imposter
                                                        </p>
                                                        <p className="text-xs text-neutral-500 mt-2">
                                                            You don't know the word
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-wider">
                                                            The word is
                                                        </p>
                                                        <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mt-1 text-yellow-500">
                                                            {word}
                                                        </p>
                                                        <p className="text-xs text-neutral-500 mt-2">
                                                            Find the imposter
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        // HIDDEN - Hold instruction
                                        <div className="text-center">
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-dashed border-neutral-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-500" />
                                            </div>
                                            <p className="text-sm sm:text-base font-black text-neutral-400 uppercase">
                                                {isPressed ? "Keep Holding..." : "Hold to Reveal"}
                                            </p>
                                            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                                                {isPressed
                                                    ? `${Math.round(pressProgress * 100)}%`
                                                    : "Press for 1 second"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Release instruction */}
                            {showContent && (
                                <div className="bg-white text-black py-2 sm:py-3 text-center">
                                    <p className="text-xs sm:text-sm font-bold uppercase">
                                        Release to continue →
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="relative p-3 sm:p-4 border-t-4 border-neutral-800 bg-neutral-900/50 z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-center gap-1.5 sm:gap-2 mb-2">
                        {state.players.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 sm:w-3 sm:h-3 border-2 transition-all ${state.passedCards[i]
                                        ? "bg-white border-white"
                                        : i === currentIndex
                                            ? "bg-yellow-500 border-yellow-500 scale-125"
                                            : "bg-transparent border-neutral-600"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-neutral-500 text-center uppercase font-bold tracking-wide">
                        {state.passedCards.filter(Boolean).length} of {state.players.length} complete
                    </p>
                </div>
            </div>
        </div>
    );
}

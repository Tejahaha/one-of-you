"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useGame } from "@/lib/game/GameContext";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Hand, User, Lock, Unlock } from "lucide-react";
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

        // If not yet revealed, just reset progress
        if (!showContent) {
            setPressProgress(0);
        }
        // If revealed, content stays visible - user must click button to pass
    }, [showContent, clearTimer]);

    useEffect(() => {
        return () => clearTimer();
    }, [clearTimer]);

    return (
        <div className="flex flex-col h-full bg-neutral-950 overflow-hidden relative noise">
            {/* Ambient glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Background pattern */}
            <div className="absolute inset-0 pattern-dots opacity-50 pointer-events-none" />

            {/* Instructions Banner */}
            <div className={`relative p-3 sm:p-4 text-center z-10 ${showContent ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600'}`}>
                <p className="text-sm sm:text-base font-black uppercase text-black flex items-center justify-center gap-2">
                    {showContent ? (
                        <>
                            <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
                            Card Revealed • Memorize your role
                        </>
                    ) : (
                        <>
                            <Hand className="w-4 h-4 sm:w-5 sm:h-5" />
                            Hold card to reveal your role
                        </>
                    )}
                </p>
            </div>

            {/* Header */}
            <header className="relative p-4 sm:p-5 lg:p-6 border-b border-neutral-800 z-10 bg-neutral-950/80 backdrop-blur-sm">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0 rounded-lg glow-yellow-subtle">
                            <span className="text-xl sm:text-2xl font-black text-black">{currentIndex + 1}</span>
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase text-white">
                                {currentPlayer}
                            </h2>
                            <p className="text-xs sm:text-sm font-bold text-neutral-500 uppercase tracking-wider">
                                Player {currentIndex + 1} of {state.players.length}
                            </p>
                        </div>
                    </div>
                    <div className={`px-3 py-2 rounded-lg flex items-center gap-2 ${showContent ? 'bg-green-500/20 border border-green-500/30' : 'bg-neutral-800 border border-neutral-700'}`}>
                        {showContent ? <Unlock className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-neutral-500" />}
                        <p className="text-xs font-black uppercase hidden sm:block">
                            {showContent ? <span className="text-green-400">Revealed</span> : <span className="text-neutral-500">Hidden</span>}
                        </p>
                    </div>
                </div>
            </header>

            {/* Carousel Container */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ x: 300, opacity: 0, scale: 0.9 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -300, opacity: 0, scale: 0.9 }}
                        transition={spring}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                    >
                        {/* The Card */}
                        <div
                            className={`relative overflow-hidden touch-none select-none cursor-pointer rounded-2xl transition-all duration-200 ${showContent
                                ? 'card-elevated-yellow'
                                : isPressed
                                    ? 'card-elevated border-yellow-500/50'
                                    : 'card-elevated'
                                }`}
                            style={{
                                boxShadow: showContent
                                    ? '0 0 60px rgba(234,179,8,0.3), 0 25px 50px -12px rgba(0,0,0,0.5)'
                                    : isPressed
                                        ? '0 0 40px rgba(234,179,8,0.2), 0 25px 50px -12px rgba(0,0,0,0.5)'
                                        : '0 25px 50px -12px rgba(0,0,0,0.5)'
                            }}
                            onTouchStart={startPress}
                            onTouchEnd={endPress}
                            onTouchCancel={endPress}
                            onMouseDown={startPress}
                            onMouseUp={endPress}
                            onMouseLeave={endPress}
                        >
                            {/* Progress bar */}
                            <div className="h-2 sm:h-3 bg-neutral-800 overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-75"
                                    style={{ width: `${pressProgress * 100}%` }}
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-6 sm:p-8 md:p-10">
                                {/* Player Avatar */}
                                <div className="text-center mb-6 pb-6 border-b border-neutral-700/50">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-neutral-800 border-2 border-neutral-700 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-500" />
                                    </div>
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white">
                                        {currentPlayer}
                                    </h1>
                                </div>

                                {/* Role Area */}
                                <div className="min-h-[140px] sm:min-h-[160px] flex items-center justify-center">
                                    {showContent ? (
                                        <motion.div
                                            key="revealed"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-center w-full"
                                        >
                                            {/* Both cards look identical from distance - only border color differs */}
                                            <div className={`p-5 sm:p-6 rounded-xl bg-yellow-500/10 border-2 ${isImposter ? 'border-red-500/50' : 'border-yellow-500/30'}`}>
                                                {isImposter ? (
                                                    <>
                                                        <p className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                                            You are the
                                                        </p>
                                                        <p className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-yellow-500">
                                                            Imposter
                                                        </p>
                                                        <p className="text-xs sm:text-sm text-neutral-500 mt-3">
                                                            You don't know the word. Blend in!
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">
                                                            The secret word is
                                                        </p>
                                                        <p className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-yellow-500 text-glow-yellow">
                                                            {word}
                                                        </p>
                                                        <p className="text-xs sm:text-sm text-neutral-500 mt-3">
                                                            Find the imposter!
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="text-center">
                                            <div className={`w-16 h-16 sm:w-20 sm:h-20 border-4 border-dashed rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${isPressed ? 'border-yellow-500/50' : 'border-neutral-700'}`}>
                                                <Eye className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${isPressed ? 'text-yellow-500' : 'text-neutral-600'}`} />
                                            </div>
                                            <p className={`text-base sm:text-lg font-black uppercase transition-colors ${isPressed ? 'text-yellow-500' : 'text-neutral-500'}`}>
                                                {isPressed ? "Keep Holding..." : "Hold to Reveal"}
                                            </p>
                                            <p className="text-sm text-neutral-600 mt-1">
                                                {isPressed
                                                    ? <span className="text-yellow-500 font-bold">{Math.round(pressProgress * 100)}%</span>
                                                    : "Press and hold for 1 second"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pass to next player button */}
                            {showContent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-neutral-900 border-t-2 border-yellow-500 py-4 px-6"
                                >
                                    <button
                                        onClick={() => {
                                            setCanInteract(false);
                                            dispatch({ type: "PASS_CARD", index: currentIndex });
                                        }}
                                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 sm:py-4 font-black uppercase text-sm sm:text-base transition-colors cursor-pointer"
                                    >
                                        Got it! Pass to Next Player →
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="relative p-4 sm:p-5 border-t border-neutral-800 bg-neutral-900/80 backdrop-blur-sm z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-center gap-2 sm:gap-3 mb-3">
                        {state.players.map((_, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${state.passedCards[i]
                                    ? "bg-green-500 glow-yellow-subtle"
                                    : i === currentIndex
                                        ? "bg-yellow-500 scale-125 animate-pulse-glow"
                                        : "bg-neutral-700"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 text-center uppercase font-bold tracking-wider">
                        {state.passedCards.filter(Boolean).length} of {state.players.length} complete
                    </p>
                </div>
            </div>
        </div>
    );
}

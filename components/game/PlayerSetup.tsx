"use client";

import { useState, useRef } from "react";
import { useGame } from "@/lib/game/GameContext";
import { useSavedPlayers } from "@/lib/game/useSavedPlayers";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Play, UserPlus, Trash2, Users, Crown, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { spring, playerCardMotion, shakeX } from "@/lib/motion";

export default function PlayerSetup() {
    const { state, dispatch } = useGame();
    const { savedPlayers, isLoaded, savePlayer, clearAll } = useSavedPlayers();
    const [inputValue, setInputValue] = useState("");
    const [isShaking, setIsShaking] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const availableSavedPlayers = savedPlayers.filter(
        (p) => !state.players.some((current) => current.toLowerCase() === p.toLowerCase())
    );

    const handleAddPlayer = (name?: string) => {
        const playerName = name || inputValue.trim();
        if (!playerName || state.players.some((p) => p.toLowerCase() === playerName.toLowerCase())) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 300);
            inputRef.current?.focus();
            return;
        }
        const upperName = playerName.toUpperCase();
        dispatch({ type: "ADD_PLAYER", name: upperName });
        savePlayer(upperName);
        setInputValue("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleAddPlayer();
    };

    const handleStartGame = () => {
        if (state.players.length < 3) return;
        dispatch({ type: "LOCK_GAME" });
        setTimeout(() => dispatch({ type: "ASSIGN_ROLES" }), 400);
    };

    const isLocked = state.phase === "LOCKED";
    const canStart = state.players.length >= 3 && !isLocked;

    return (
        <div className="flex flex-col h-full bg-neutral-950 pattern-grid relative noise">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

            {/* Header */}
            <header className="p-4 sm:p-6 lg:p-8 border-b-2 border-neutral-800 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-yellow-500 flex items-center justify-center flex-shrink-0 glow-yellow-subtle">
                            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white">
                                Add Players
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={cn(
                                    "text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full",
                                    state.players.length >= 3
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-neutral-800 text-neutral-500 border border-neutral-700"
                                )}>
                                    {state.players.length} / 3+ players
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Back button */}
            <div className="px-4 sm:px-6 lg:px-8 pt-2">
                <button
                    onClick={() => dispatch({ type: "RESET" })}
                    className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-yellow-500 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>
            </div>

            {/* Content - Scrollable area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10">
                <div className="max-w-2xl mx-auto w-full">
                    {/* Saved Players Toggle */}
                    {!isLocked && isLoaded && availableSavedPlayers.length > 0 && (
                        <button
                            onClick={() => setShowSaved(!showSaved)}
                            className="mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-400 hover:text-yellow-500 transition-colors"
                        >
                            <UserPlus className="w-4 h-4" />
                            {showSaved ? "Hide" : "Show"} saved ({availableSavedPlayers.length})
                        </button>
                    )}

                    {/* Saved Players */}
                    <AnimatePresence>
                        {!isLocked && showSaved && availableSavedPlayers.length > 0 && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mb-4 p-4 bg-neutral-900/80 border border-neutral-800 rounded-lg overflow-hidden backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Quick Add</span>
                                    <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors">
                                        <Trash2 className="w-3 h-3" /> Clear all
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                                    {availableSavedPlayers.map((name) => (
                                        <motion.button
                                            key={name}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAddPlayer(name)}
                                            className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 text-xs sm:text-sm font-bold text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all rounded"
                                        >
                                            + {name}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Player List - Compact mode for 6+ players */}
                    {state.players.length === 0 ? (
                        <div className="text-center py-12 sm:py-16">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-600" />
                            </div>
                            <p className="text-neutral-500 text-sm font-medium mb-1">
                                No players yet
                            </p>
                            <p className="text-neutral-600 text-xs">
                                Add at least 3 players to start
                            </p>
                        </div>
                    ) : state.players.length >= 6 ? (
                        /* Compact flex-wrap layout for many players */
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                                    Players ({state.players.length})
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <AnimatePresence mode="popLayout">
                                    {state.players.map((player, index) => (
                                        <motion.div
                                            layout
                                            key={`${player}-${index}`}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg group",
                                                index === 0
                                                    ? "bg-yellow-500/20 border border-yellow-500/30"
                                                    : "bg-neutral-800 border border-neutral-700"
                                            )}
                                        >
                                            <span className={cn(
                                                "text-xs font-black",
                                                index === 0 ? "text-yellow-500" : "text-neutral-500"
                                            )}>
                                                {index === 0 ? <Crown className="w-3 h-3" /> : `#${index + 1}`}
                                            </span>
                                            <span className="text-sm font-bold text-white">{player}</span>
                                            {!isLocked && (
                                                <button
                                                    onClick={() => dispatch({ type: "REMOVE_PLAYER", index })}
                                                    className="opacity-50 group-hover:opacity-100 hover:text-red-500 transition-all ml-1"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        /* Standard card layout for fewer players */
                        <div className="space-y-2 mb-4">
                            <AnimatePresence mode="popLayout">
                                {state.players.map((player, index) => (
                                    <motion.div
                                        layout
                                        key={`${player}-${index}`}
                                        variants={playerCardMotion}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex items-center justify-between card-elevated p-3 sm:p-4 relative overflow-hidden group"
                                    >
                                        {/* Number badge */}
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 font-black text-sm sm:text-base rounded",
                                                index === 0 ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30" : "bg-neutral-800 text-neutral-500 border border-neutral-700"
                                            )}>
                                                {index === 0 ? <Crown className="w-4 h-4" /> : index + 1}
                                            </div>
                                            <span className="text-base sm:text-lg font-bold text-white">{player}</span>
                                        </div>
                                        {!isLocked && (
                                            <motion.button
                                                whileTap={{ scale: 0.85 }}
                                                onClick={() => dispatch({ type: "REMOVE_PLAYER", index })}
                                                className="p-2 hover:bg-red-500/20 rounded-full transition-colors opacity-50 group-hover:opacity-100"
                                            >
                                                <X className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 hover:text-red-500 transition-colors" />
                                            </motion.button>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Footer - Input & Start Button */}
            <div className="sticky bottom-0 bg-neutral-950/95 backdrop-blur-sm border-t border-neutral-800 p-4 sm:p-6 z-20">
                <div className="max-w-2xl mx-auto space-y-3">
                    {/* Input */}
                    {!isLocked && (
                        <motion.div
                            animate={isShaking ? shakeX : {}}
                            className="flex gap-2"
                        >
                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="ENTER NAME"
                                className={cn(
                                    "flex-1 bg-neutral-900/80 border-2 p-3 sm:p-4 text-base sm:text-lg font-bold placeholder:text-neutral-600 focus:outline-none uppercase text-white transition-all rounded-lg backdrop-blur-sm",
                                    isShaking
                                        ? "border-red-500 bg-red-950/30"
                                        : "border-neutral-700 focus:border-yellow-500 focus:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                                )}
                                autoFocus
                            />
                            <motion.button
                                whileTap={{ scale: 0.92 }}
                                onClick={() => handleAddPlayer()}
                                className="bg-yellow-500 text-black p-3 sm:p-4 border-2 border-yellow-500 hover:bg-yellow-400 transition-colors rounded-lg"
                            >
                                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Start Button */}
                    <motion.button
                        whileTap={canStart ? { scale: 0.97 } : {}}
                        onClick={handleStartGame}
                        disabled={!canStart}
                        className={cn(
                            "w-full py-4 sm:py-5 text-lg sm:text-xl font-black uppercase flex items-center justify-center gap-2 transition-all rounded-lg",
                            canStart
                                ? "bg-white text-black glow-white hover:bg-neutral-100 cursor-pointer"
                                : "bg-neutral-800/50 text-neutral-600 border border-neutral-700 cursor-not-allowed"
                        )}
                    >
                        {isLocked ? "Locking..." : "Start Game"} <Play className="fill-current w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

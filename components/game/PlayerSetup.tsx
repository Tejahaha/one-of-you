"use client";

import { useState, useRef } from "react";
import { useGame } from "@/lib/game/GameContext";
import { useSavedPlayers } from "@/lib/game/useSavedPlayers";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Play, UserPlus, Trash2, Users } from "lucide-react";
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
        <div className="flex flex-col h-full bg-neutral-950 pattern-grid relative">
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-500 to-transparent" />

            {/* Header */}
            <header className="p-4 sm:p-6 lg:p-8 border-b-4 border-neutral-800">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white">
                                Add Players
                            </h2>
                            <p className="text-neutral-500 font-bold text-xs sm:text-sm uppercase tracking-wide">
                                Minimum 3 • {state.players.length} added
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content - centered container */}
            <div className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 lg:p-8">
                <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
                    {/* Saved Players Toggle */}
                    {!isLocked && isLoaded && availableSavedPlayers.length > 0 && (
                        <button
                            onClick={() => setShowSaved(!showSaved)}
                            className="mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-400 active:text-white"
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
                                className="mb-4 p-3 bg-neutral-900/50 border-2 border-neutral-800 overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-neutral-500 uppercase">Tap to add</span>
                                    <button onClick={clearAll} className="text-xs text-red-500 flex items-center gap-1">
                                        <Trash2 className="w-3 h-3" /> Clear
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {availableSavedPlayers.map((name) => (
                                        <motion.button
                                            key={name}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAddPlayer(name)}
                                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-neutral-800 border-2 border-neutral-600 text-xs sm:text-sm font-bold text-white active:bg-yellow-500 active:text-black active:border-yellow-500"
                                        >
                                            {name}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Player List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pb-4">
                        {state.players.length === 0 && (
                            <div className="text-center py-8 sm:py-12">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-dashed border-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                </div>
                                <p className="text-neutral-600 text-xs sm:text-sm font-medium">
                                    No players yet
                                </p>
                            </div>
                        )}
                        <AnimatePresence mode="popLayout">
                            {state.players.map((player, index) => (
                                <motion.div
                                    layout
                                    key={`${player}-${index}`}
                                    variants={playerCardMotion}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="flex items-center justify-between bg-neutral-900 border-2 sm:border-[3px] border-neutral-700 p-3 sm:p-4 relative overflow-hidden"
                                >
                                    {/* Number badge */}
                                    <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 bg-neutral-800 flex items-center justify-center border-r-2 border-neutral-700">
                                        <span className="text-xs sm:text-sm font-black text-neutral-500">{index + 1}</span>
                                    </div>
                                    <span className="text-base sm:text-lg font-bold truncate text-white pl-8 sm:pl-10">{player}</span>
                                    {!isLocked && (
                                        <motion.button
                                            whileTap={{ scale: 0.85 }}
                                            onClick={() => dispatch({ type: "REMOVE_PLAYER", index })}
                                            className="p-1 hover:bg-red-500/20 rounded"
                                        >
                                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 hover:text-red-500" />
                                        </motion.button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Input */}
                    {!isLocked && (
                        <motion.div
                            animate={isShaking ? shakeX : {}}
                            className="flex gap-2 mb-4"
                        >
                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="ENTER NAME"
                                className={cn(
                                    "flex-1 bg-neutral-900 border-2 sm:border-[3px] p-3 sm:p-4 text-base sm:text-lg font-bold placeholder:text-neutral-600 focus:outline-none focus:border-yellow-500 uppercase text-white transition-colors",
                                    isShaking ? "border-red-500 bg-red-950/30" : "border-neutral-700"
                                )}
                                autoFocus
                            />
                            <motion.button
                                whileTap={{ scale: 0.92 }}
                                onClick={() => handleAddPlayer()}
                                className="bg-yellow-500 text-black p-3 sm:p-4 border-2 sm:border-[3px] border-yellow-500 hover:bg-yellow-400"
                            >
                                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Lock In */}
                    <motion.button
                        whileTap={canStart ? { scale: 0.97 } : {}}
                        onClick={handleStartGame}
                        disabled={!canStart}
                        className={cn(
                            "w-full py-4 sm:py-5 text-lg sm:text-xl font-black uppercase border-4 flex items-center justify-center gap-2 relative overflow-hidden",
                            canStart
                                ? "bg-white text-black border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:shadow-none active:translate-x-1 active:translate-y-1"
                                : "bg-neutral-800 text-neutral-600 border-neutral-700 cursor-not-allowed"
                        )}
                    >
                        {isLocked ? "Locking..." : "Start Game"} <Play className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

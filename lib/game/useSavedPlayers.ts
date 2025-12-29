"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "impostwho_saved_players";
const MAX_SAVED_PLAYERS = 100;

export function useSavedPlayers() {
    const [savedPlayers, setSavedPlayers] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setSavedPlayers(parsed);
                }
            }
        } catch (e) {
            console.warn("Failed to load saved players:", e);
        }
        setIsLoaded(true);
    }, []);

    // Save a new player name
    const savePlayer = (name: string) => {
        const upperName = name.toUpperCase();
        setSavedPlayers((prev) => {
            // Don't add duplicates
            if (prev.includes(upperName)) return prev;
            // Add to beginning, limit to max
            const updated = [upperName, ...prev].slice(0, MAX_SAVED_PLAYERS);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                console.warn("Failed to save player:", e);
            }
            return updated;
        });
    };

    // Remove a player from saved list
    const removePlayer = (name: string) => {
        const upperName = name.toUpperCase();
        setSavedPlayers((prev) => {
            const updated = prev.filter((p) => p !== upperName);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                console.warn("Failed to update saved players:", e);
            }
            return updated;
        });
    };

    // Clear all saved players
    const clearAll = () => {
        setSavedPlayers([]);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn("Failed to clear saved players:", e);
        }
    };

    return {
        savedPlayers,
        isLoaded,
        savePlayer,
        removePlayer,
        clearAll,
    };
}

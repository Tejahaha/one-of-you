"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { getRandomWord } from "./words";

// --- Types ---

export type GamePhase =
    | "ENTRY"
    | "SETUP"
    | "LOCKED"
    | "CARD_REVEAL"      // New: card-based reveal phase
    | "CONFIRM_READY"
    | "IGNITION"
    | "DISCUSSION"
    | "REVEAL_END";

interface GameState {
    phase: GamePhase;
    players: string[];
    imposterIndex: number | null;
    commonWord: string | null;
    currentPlayerIndex: number;
    startingPlayerIndex: number | null;
    // Card reveal tracking
    revealedCards: boolean[];      // Which cards have been revealed
    passedCards: boolean[];        // Which cards have been passed
}

type Action =
    | { type: "START_SETUP" }
    | { type: "ADD_PLAYER"; name: string }
    | { type: "REMOVE_PLAYER"; index: number }
    | { type: "LOCK_GAME" }
    | { type: "ASSIGN_ROLES" }
    | { type: "REVEAL_CARD"; index: number }      // Player reveals their card
    | { type: "PASS_CARD"; index: number }        // Player passes after reveal
    | { type: "START_GAME" }
    | { type: "BEGIN_DISCUSSION" }
    | { type: "REVEAL_IMPOSTER" }
    | { type: "PLAY_AGAIN" }
    | { type: "RESET" };

// --- Initial State ---

const initialState: GameState = {
    phase: "ENTRY",
    players: [],
    imposterIndex: null,
    commonWord: null,
    currentPlayerIndex: 0,
    startingPlayerIndex: null,
    revealedCards: [],
    passedCards: [],
};

// --- Reducer ---

function gameReducer(state: GameState, action: Action): GameState {
    switch (action.type) {
        case "START_SETUP":
            return { ...state, phase: "SETUP", players: [] };

        case "ADD_PLAYER":
            if (state.players.includes(action.name)) return state;
            return { ...state, players: [...state.players, action.name] };

        case "REMOVE_PLAYER":
            return {
                ...state,
                players: state.players.filter((_, i) => i !== action.index),
            };

        case "LOCK_GAME":
            if (state.players.length < 3) return state;
            return { ...state, phase: "LOCKED" };

        case "ASSIGN_ROLES": {
            const imposterIdx = Math.floor(Math.random() * state.players.length);
            const startIdx = Math.floor(Math.random() * state.players.length);
            const word = getRandomWord();
            return {
                ...state,
                phase: "CARD_REVEAL",
                imposterIndex: imposterIdx,
                commonWord: word,
                startingPlayerIndex: startIdx,
                currentPlayerIndex: 0,
                revealedCards: new Array(state.players.length).fill(false),
                passedCards: new Array(state.players.length).fill(false),
            };
        }

        case "REVEAL_CARD": {
            // Mark card as revealed
            const newRevealed = [...state.revealedCards];
            newRevealed[action.index] = true;
            return { ...state, revealedCards: newRevealed };
        }

        case "PASS_CARD": {
            // Mark card as passed
            const newPassed = [...state.passedCards];
            newPassed[action.index] = true;

            // Check if all cards passed
            const allPassed = newPassed.every((p) => p);
            if (allPassed) {
                return { ...state, passedCards: newPassed, phase: "CONFIRM_READY" };
            }

            // Move to next player
            return {
                ...state,
                passedCards: newPassed,
                currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
            };
        }

        case "START_GAME":
            return { ...state, phase: "IGNITION" };

        case "BEGIN_DISCUSSION":
            return { ...state, phase: "DISCUSSION" };

        case "REVEAL_IMPOSTER":
            return { ...state, phase: "REVEAL_END" };

        case "PLAY_AGAIN":
            return {
                ...initialState,
                phase: "SETUP",
                players: state.players,
            };

        case "RESET":
            return initialState;

        default:
            return state;
    }
}

// --- Context ---

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<Action>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}

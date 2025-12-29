"use client";

import React from "react";
import { useGame } from "@/lib/game/GameContext";
import { AnimatePresence, motion } from "framer-motion";
import EntryScreen from "./EntryScreen";
import PlayerSetup from "./PlayerSetup";
import CardReveal from "./CardReveal";
import ReadyConfirmation from "./ReadyConfirmation";
import Ignition from "./Ignition";
import Discussion from "./Discussion";
import RevealImposter from "./RevealImposter";

export default function GameOrchestrator() {
    const { state } = useGame();

    const renderPhase = () => {
        switch (state.phase) {
            case "ENTRY":
                return <EntryScreen key="entry" />;
            case "SETUP":
            case "LOCKED":
                return <PlayerSetup key="setup" />;
            case "CARD_REVEAL":
                return <CardReveal key="card-reveal" />;
            case "CONFIRM_READY":
                return <ReadyConfirmation key="ready" />;
            case "IGNITION":
                return <Ignition key="ignition" />;
            case "DISCUSSION":
                return <Discussion key="discussion" />;
            case "REVEAL_END":
                return <RevealImposter key="end" />;
            default:
                return null;
        }
    };

    return (
        <main className="h-screen w-full bg-neutral-950 text-white overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={state.phase}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35
                    }}
                    className="h-full w-full"
                >
                    {renderPhase()}
                </motion.div>
            </AnimatePresence>
        </main>
    );
}

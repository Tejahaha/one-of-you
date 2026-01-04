export const WORD_LIST = [
  // Everyday Objects
  "Umbrella",
  "Backpack",
  "Mirror",
  "Suitcase",
  "Flashlight",
  "Key",
  "Notebook",
  "Headphones",
  "Chair",
  "Window",

  // Places & Structures
  "Bridge",
  "Castle",
  "Playground",
  "Airport",
  "Bakery",
  "School",
  "Hospital",
  "Stadium",
  "Lighthouse",
  "Museum",

  // Nature & Weather
  "Rainbow",
  "Thunderstorm",
  "Waterfall",
  "Desert",
  "Forest",
  "Island",
  "Snowflake",
  "Hurricane",
  "Cactus",
  "River",

  // Animals (Very Safe for Deduction Games)
  "Elephant",
  "Penguin",
  "Dolphin",
  "Kangaroo",
  "Owl",
  "Tiger",
  "Horse",
  "Octopus",
  "Parrot",
  "Turtle",

  // Fun / Fantasy-Leaning (but still describable)
  "Treasure",
  "Knight",
  "Wizard",
  "Pirate",
  "Alien",
  "Mermaid",
  "Castle",
  "Crown",
  "Map",
  "Compass",

  // Actions / Concepts (Use sparingly)
  "Celebration",
  "Journey",
  "Adventure",
  "Discovery",
  "Victory",
];


export function getRandomWord() {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

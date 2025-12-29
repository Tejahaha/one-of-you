export const WORD_LIST = [
    "Bicycle", "Camera", "Guitar", "Sunshine", "Pizza",
    "Robot", "Ocean", "Telescope", "Garden", "Library",
    "Mountain", "Coffee", "Spaceship", "Fireworks", "Dragon",
    "Clock", "Pyramid", "Volcano", "Violin", "Tornado"
];

export function getRandomWord() {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

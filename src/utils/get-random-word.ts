export function getRandomWord(words:string[]){
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}
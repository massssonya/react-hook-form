import { GameField } from "../component/game-field"
import {WORDS} from "../constants"
import { getRandomWord } from "../utils/getRandomWord"

const ANSWER = getRandomWord(WORDS)
const COUNTER_ATTEMPTS = 6

export const Game = () => {
     
    return (
        <div>
            <GameField answer={ANSWER} counterAttempts={COUNTER_ATTEMPTS} />
        </div>
    )
}
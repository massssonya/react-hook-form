enum GameActionsKind {
    ENTER_WORD = 'ENTER_WORD'
}

export type IGameAction = {
    type: GameActionsKind;
    payload: string;
}

export interface IGameState {
    answer: string;
    counterAttempts: number;
    attempts: [] | string[];
    currentStep: number
}

type TInitGameState = (answer: string, counterAttempts: number) => IGameState

const initGameState: TInitGameState = (answer, counterAttempts) => ({
    answer: answer,
    counterAttempts: counterAttempts,
    attempts: new Array,
    currentStep: 0
})

const gameStateReducer = (state: IGameState, action: IGameAction) => {
    const {type, payload} = action
    switch (type) {
        //ДОЛЖНО БЫТЬ ПОСЛЕ ПРОВЕРОК
        case GameActionsKind.ENTER_WORD: {
            return {
                ...state,
                attempts: [...state.attempts, payload],
                currentStep: state.currentStep + 1
            }
        }
        default:
            return state
    }
}

export {initGameState, gameStateReducer, GameActionsKind}
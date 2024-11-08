
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, KeyboardEvent } from 'react';
import clsx from 'clsx';

import { GameCell } from "./game-cell"
import { IGameState } from "../../types"
import {WORDS} from "../../constants"

const schema =
    z.object({
        input1: z.string().max(1).min(1).regex(/^[a-zA-Zа-яА-Я]+$/),
        input2: z.string().max(1).min(1).regex(/^[a-zA-Zа-яА-Я]+$/),
        input3: z.string().max(1).min(1).regex(/^[a-zA-Zа-яА-Я]+$/),
        input4: z.string().max(1).min(1).regex(/^[a-zA-Zа-яА-Я]+$/),
        input5: z.string().max(1).min(1).regex(/^[a-zA-Zа-яА-Я]+$/),
    })

type Schema = z.TypeOf<typeof schema>
type KeySchema = keyof Schema

const initForm = {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
}

function stringToObj(str: string | undefined): Schema {
    const result = initForm
    if (str) {
        for (let i = 0; i < str.length; i++) {
            result[`input${i + 1}` as KeySchema] = str[i]
        }
    }
    return result
}

export const GameForm = (
    {
        symbols,
        indexForm,
        activeForm,
        gameState,
        sendWord,
        saveGameState
    }:
        {
            symbols: string[];
            indexForm: number;
            activeForm: boolean;
            gameState: IGameState;
            sendWord: (text: string) => void;
            saveGameState: (state: IGameState) => void
        }) => {
    const { attempts, currentStep } = gameState
    const defaultValues = stringToObj(attempts[indexForm]?.word)
    const { register, handleSubmit, setFocus, setValue,  } = useForm<Schema>({
        resolver: zodResolver(schema),
        mode: "all"
    })


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const currentCell = `input${index + 1}` as KeySchema
        const isLetter = /^[a-zA-Zа-яА-Я]$/.test(e.key)

        switch (e.key) {
            case "Enter":
                handleSubmit(submit)()
                return
            case 'Backspace':
                const prevCell = `input${index}` as KeySchema
                setValue(currentCell, "")
                setFocus(prevCell)
                return
            default:
                const nextCell = `input${index + 2}` as KeySchema
                isLetter && setValue(currentCell, e.key)
                setFocus(isLetter ? nextCell : currentCell)
                return
        }
    }

    const submit = (data: Schema) => {
        const word = Object.values(data).join("")
        if(!WORDS.includes(word)) return
        saveGameState(gameState)
        sendWord(word)
    }

    useEffect(() => {
        setFocus('input1')
    }, [currentStep])

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className={clsx("flex flex-row justify-evenly py-2", (activeForm && !gameState.isWin) ? "bg-slate-400" : "")} >
            {symbols.map((_, index) => (
                <GameCell
                    key={`input${indexForm}_${index + 1}`}
                    {...register(`input${index + 1}` as KeySchema, {
                        value: indexForm < currentStep ? defaultValues[`input${index + 1}` as KeySchema] : ""
                    })}
                    type='text'
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={!activeForm || gameState.isWin}
                    className="w-12 h-12 text-center text-3xl uppercase  "
                    maxLength={1}
                    status={!activeForm ? attempts[indexForm]?.status[index] : "default"}
                />
            ))}
            <input type='submit' className='hidden' />
        </form>

    )
} 
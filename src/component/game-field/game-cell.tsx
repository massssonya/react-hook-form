import clsx from 'clsx';
import { forwardRef } from 'react';

import { styleSymbol } from './styles';

interface InputProps
    extends React.PropsWithRef<JSX.IntrinsicElements['input']> {
    placeholder?: string;
    status: string
}


export const GameCell = forwardRef<HTMLInputElement, InputProps>((
    {
        placeholder,
        type = "text",
        status,
        className,
        ...rest
    },
    ref,
) => {
    return (
        <input
            type={type}
            {...rest}
            ref={ref}
            className={clsx("w-12 h-12 text-center text-3xl uppercase outline-none focus:border", styleSymbol[status])}
            maxLength={1}
        />
    )
})
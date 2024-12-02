import clsx from "clsx";
import {
	forwardRef,
	createRef,
	useEffect,
	useImperativeHandle,
	PropsWithRef
} from "react";
import { gsap } from "gsap";

import { styleSymbol } from "./styles";
import { useAnimate } from "./services";

interface InputProps
	extends PropsWithRef<JSX.IntrinsicElements["input"]> {
	placeholder: string;
	status: string;
	index: number;
}

const animateStatus = ["onSite", "inWord", "noSymbol"];

export const GameCell = forwardRef<HTMLInputElement, InputProps>(
	({ placeholder, type = "text", status, className, index, ...rest }, ref) => {
		
		const inputRef = createRef<HTMLInputElement>();
		useImperativeHandle(ref, () => inputRef.current!);
		const { inputAnimate } = useAnimate()
		useEffect(() => {
			const input = inputRef.current;
			if (animateStatus.includes(status)) {
				gsap.to(input, {
					duration: 1.5,
					rotateY: 360,
					delay: index * 0.1
				});
			}
			return () => {
				gsap.killTweensOf(input);
				if (status === "default") {
					gsap.set(input, {
						rotateY: 0,
					})
				} else {
					gsap.set(input, {
						rotateY: 360,
					})
				}
			}
		}, [status, placeholder]);

		return (
			<input
				type={type}
				{...rest}
				ref={ref}
				placeholder={placeholder}
				className={clsx(
					"w-12 h-12 text-center text-3xl uppercase outline-none focus:border-2",
					styleSymbol[status],
					inputAnimate,
					className
				)}
				maxLength={1}
			/>
		);
	}
);
import clsx from "clsx";
import { PropsWithRef, ReactNode, createRef, forwardRef, useImperativeHandle } from "react";

interface ButtonProps
	extends PropsWithRef<JSX.IntrinsicElements["button"]> {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}

export const UIButton = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	className,
	onClick,
	...rest
}, ref) => {
	const btnRef = createRef<HTMLButtonElement>();
	useImperativeHandle(ref, () => btnRef.current!);

	return (
		<button
			ref={btnRef}
			className={clsx("py-2 px-4 border bg-black rounded-md transition-all duration-300 hover:border-violet-800", className)}
			onClick={onClick}
			{...rest}>
			{children}
		</button>
	);
});

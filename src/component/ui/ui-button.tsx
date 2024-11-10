import clsx from "clsx";
import { ReactNode } from "react";

export const UIButton = ({
	children,
	className,
	onClick
}: {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
}) => {
	return (
		<button className={clsx("py-2 px-4 border", className)} onClick={onClick}>
			{children}
		</button>
	);
};

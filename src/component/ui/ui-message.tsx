import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface IStyleMsg {
    [key: string]: string
}

const styleMsg:IStyleMsg = {
	default: "bg-black/50",
	error: "bg-red-500/50",
}

export const UIMessage = ({
	message,
	msgType = "default",
	className
}: {
	message: string;
	msgType?: string;
	className?: string;
}) => {
	const msgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const msg = msgRef.current;
		if (msg) {gsap.fromTo(
				msg,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 }
			);
			gsap.to(msg, { y: -20, opacity: 0, duration: 1, delay: 3 });
			
		}
		return () => {
			gsap.killTweensOf(msg);
		};
	});

	return (
		<div
			ref={msgRef}
			className={clsx(
				"flex items-center justify-center py-2 px-4 rounded",
				styleMsg[msgType],
				className
			)}
		>
			{message}
		</div>
	);
};

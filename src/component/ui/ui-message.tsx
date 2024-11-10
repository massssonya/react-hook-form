import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const UIMessage = ({
	message,
	className
}: {
	message: string;
	className?: string;
}) => {
	const msgRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const msg = msgRef.current;
		if (msg) {
			gsap.fromTo(
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
				className
			)}
		>
			{message}
		</div>
	);
};

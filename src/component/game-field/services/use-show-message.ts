import { useState } from "react";

export const useShowMessage = (time: number) => {
	const [showMessage, setShowMessage] = useState(false);

	const show = () => {
		setShowMessage(true);
		setTimeout(() => {
			setShowMessage(false);
		}, time * 1000);
	};

	return { showMessage, show };
};

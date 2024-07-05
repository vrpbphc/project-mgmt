import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackgroundWrappper = ({ children }) => {
    const location = useLocation();
    useEffect(() => {
        if (["/", "/register"].includes(location.pathname)) document.body.style.backgroundColor = "#76f58a";
        else document.body.style.backgroundColor = "#f3f8f9";
    }, [location]);
	return (
		<>
            {children}
        </>
	);
}

export default BackgroundWrappper;
import { useEffect } from "react";

const useValidImg = (url, setValidImg) => {
    useEffect(() => {
        if (!!url) {
            const img = new Image();
            img.src = url;
            img.onload = () => setValidImg(url);
        }

    }, [url, setValidImg])
};

export default useValidImg;
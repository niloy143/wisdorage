import { useEffect } from "react";

const useImage = (imgFile, setImgURL) => {
    useEffect(() => {
        if (imgFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imgFile);
            fileReader.onload = e => {
                const { result } = e.target;
                result && setImgURL(result);
            }
        }
    }, [imgFile, setImgURL])
}

export default useImage;
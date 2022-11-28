const { useEffect } = require("react")

const useTitle = (title, singleTitle) => {
    useEffect(() => {
        document.title = singleTitle || `${title} - Wisdorage`;
    }, [title, singleTitle])
}

export default useTitle;
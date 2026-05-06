import React, { useEffect, useRef, useState } from "react"

const useCloseComponent = (ref) => {

    const [openElement, setOpenElement] = useState(false);

    useEffect(() => {
        function handler(e) {
            if (ref.current) {
                if (!ref.current.contains(e.target)) {
                    setOpenElement(false)
                }
            }
        }

        document.addEventListener('click', handler)

        return () => document.removeEventListener('click', handler)

    })
    return [openElement, setOpenElement]
}

export default useCloseComponent;
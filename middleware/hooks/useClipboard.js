import { useState, useCallback } from 'react';

function useClipboard() {
    const [isCopied, setIsCopied] = useState(false);

    const writeToClipboard = useCallback((text) => {
        const handleCopy = (event) => {
            event.clipboardData.setData('text/plain', text);
            event.preventDefault();
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        };

        document.addEventListener('copy', handleCopy);
        document.execCommand('copy');
        document.removeEventListener('copy', handleCopy);
    }, []);

    return { isCopied, writeToClipboard };
}

export default useClipboard;



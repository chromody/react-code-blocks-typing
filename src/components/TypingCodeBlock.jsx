import { useState, useEffect } from "react";
import { CodeBlock, dracula } from 'react-code-blocks';

async function typingCodeBlockThemeRetriever(theme) {
    try {
        const module = await import(`./../themes/${theme}.ts`);
        return module.default;
    } catch (err) {
        console.log("Error: ", err)
        return dracula;
    }
}

export function TypingCodeBlock({text, language, theme, showLineNumbers, typingSpeed}) {
    const [displayedText, setDisplayedText] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [codeTheme, setCodeTheme] = useState(null);
    
    useEffect(() => {
        typingCodeBlockThemeRetriever(theme).then((res) => {
            setCodeTheme(res);
        })
    }, [])

    useEffect(() => {
        if (charIndex < text.length) {
        const typingInterval = setInterval(() => {
            setDisplayedText((prevText) => prevText + text[charIndex]);
            setCharIndex((prevIndex) => prevIndex + 1);
        }, typingSpeed); // Typing speed by milliseconds
    
        // Cleanup interval on component unmount
        return () => clearInterval(typingInterval);
        }
    }, [text, charIndex]); // Trigger when charIndexchanges

    if (!codeTheme) {
        return null;
    }

    return (
        <>
            <CodeBlock
            text={displayedText}
            language={language}
            showLineNumbers={showLineNumbers}
            theme={codeTheme}
            />
        </>
    );
}

export function typingCodeBlockTimer(text, typingSpeed) {
    return new Promise((resolve) => {
        let displayedText = '';
        let charIndex = 0;

        const interval = setInterval(() => {
            displayedText += text[charIndex];
            charIndex++;

            if (charIndex >= text.length) {
                clearInterval(interval);
                resolve(true); // Done typing
            }
        }, typingSpeed);
    });
}

export default TypingCodeBlock;
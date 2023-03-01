import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useThemeDetector from '@/hooks.ts/useThemeDetector';
import '@/styles/globals.css';

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark'
    }
});

export default function App({ Component, pageProps }: AppProps) {
    const isDarkTheme = useThemeDetector();
    const [activeTheme, setActiveTheme] = useState(darkTheme);

    useEffect(() => {
        setActiveTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme]);

    return (
        <>
            <ThemeProvider theme={activeTheme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

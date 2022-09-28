import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

export type ThemeMode = 'dark' | 'light';

export const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}>({
  theme: 'dark',
  setTheme(theme) {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const current = localStorage.getItem('theme');

    if (current === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

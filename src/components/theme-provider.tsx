import { setThemeServerFn } from "@/lib/theme";
import { useRouter } from "@tanstack/react-router";
import { createContext, PropsWithChildren, use } from "react";

export type Theme = "light" | "dark";

type ThemeProviderState = { theme: Theme; setTheme: (val: Theme) => void };

const ThemeProviderContext = createContext<ThemeProviderState | null>(null);

export function ThemeProvider({
  children,
  theme,
}: PropsWithChildren<{ theme: Theme }>) {
  const router = useRouter();

  const setTheme = async (val: Theme) => {
    await setThemeServerFn({ data: val });
    router.invalidate();
  };

  return (
    <ThemeProviderContext value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext>
  );
}

export const useTheme = () => {
  const context = use(ThemeProviderContext);
  if (!context) throw new Error("useTheme called outside of ThemeProvider!");
  return context;
};

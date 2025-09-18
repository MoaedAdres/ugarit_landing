import { useTheme } from "next-themes"
function useCurrentThemeIsDark() {
    const { theme } = useTheme()
    return theme === "dark"

}
export default useCurrentThemeIsDark
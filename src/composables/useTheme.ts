import { ref, watchEffect } from "vue";
const isDarkMode = ref(false); // reactive

export function useDarkMode() {
  const userDataTheme = localStorage.getItem("dark-mode");
  if (userDataTheme) {
    userDataTheme === "light"
      ? (isDarkMode.value = false)
      : (isDarkMode.value = true);
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const monitorOsPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (!userDataTheme) {
        isDarkMode.value = monitorOsPreference;
      } else {
        isDarkMode.value = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
      }
    });
  watchEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode.value ? "dark" : "light"
    );
  });
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
  }

  return {
    isDarkMode,
    toggleDarkMode,
  };
}

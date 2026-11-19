const RESET_AFTER_MS = 2000;

/** Copies the command and says so on the button; a refused clipboard shows "Copy failed" with the reason as its title. */
export const copyInstallCommand = async (button: HTMLButtonElement, command: string) => {
  const label = button.dataset.label ?? "Copy";
  try {
    await navigator.clipboard.writeText(command);
    button.textContent = "Copied";
    button.title = "";
  } catch (error) {
    button.textContent = "Copy failed";
    button.title = String(error);
  }
  window.setTimeout(() => {
    button.textContent = label;
  }, RESET_AFTER_MS);
};

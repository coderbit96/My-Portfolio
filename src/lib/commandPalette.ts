export function toggleCommandPalette() {
  window.dispatchEvent(new Event("command-palette:toggle"));
}

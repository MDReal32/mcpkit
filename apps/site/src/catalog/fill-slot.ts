export const fillSlot = (root: ParentNode, slot: string, text: string) => {
  const element = root.querySelector(`[data-slot="${slot}"]`);
  if (!element) {
    throw new Error(`the server card template has no "${slot}" slot`);
  }
  element.textContent = text;
};

export const createHTML = (
  type: string,
  className: string,
  content?: string,
  id?: string,
): HTMLElement => {
  const element = document.createElement(type);
  element.className = className;
  if (content !== undefined) {
    if (type === 'img') {
      (element as HTMLImageElement).src = content;
    } else {
      element.textContent = content;
    }
    id !== undefined && (element.id = id);
  }
  return element;
};

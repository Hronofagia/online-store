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

export const createInput = (
  className: string,
  placeholder?: string,
): HTMLInputElement => {
  const element = document.createElement('input');
  element.className = className;
  element.placeholder = placeholder ?? '';
  return element;
};

export const createOption = (
  text: string,
  selected?: boolean,
): HTMLOptionElement => {
  const element = document.createElement('option');
  element.text = text;
  element.selected = selected ?? false;
  return element;
};

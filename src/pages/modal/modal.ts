import { createModalWindow } from './modal-body';

export class ModalWindow {
  render(): void {
    createModalWindow();
  }
}

export const modalWindow = new ModalWindow();

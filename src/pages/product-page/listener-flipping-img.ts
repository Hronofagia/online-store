export function changeMainImg(event: Event): void {
  if ((event.target as HTMLElement).closest('.item-img') !== null) {
    const currantImg = (event.target as HTMLElement).closest(
      '.item-img',
    ) as HTMLImageElement;
    const currantSRC = currantImg?.getAttribute('src');
    const mainIMG = document.querySelector(
      '.item-main-imag',
    ) as HTMLImageElement;
    mainIMG.setAttribute('src', `${currantSRC as string}`);
  }
}

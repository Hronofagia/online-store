import { showCards } from '../../pages/catalog/catalog';
import { createHTML, createSliderInput } from '../../utils/createHTML';
import './double-slider.sass';

export const createSlider = (
  storeValues: { min: string; max: string },
  setValue: (key: 'min' | 'max', value: string) => void,
  defaultMin: string,
  defaultMax: string,
): [HTMLElement, () => void] => {
  const sliderContainer = createHTML('div', 'slider_container');
  const formControl = createHTML('div', 'form_control');
  sliderContainer.append(formControl);
  const formMinControlContainer = createHTML('div', 'form_control_container');
  formControl.append(formMinControlContainer);
  const formMinControlContainerTitle = createHTML(
    'div',
    'form_control_container__title',
    'Min',
  );
  formMinControlContainer.append(formMinControlContainerTitle);
  const fromInput = createSliderInput(
    'form_control_container__input',
    'number',
    storeValues.min,
    defaultMin,
    defaultMax,
  );
  formMinControlContainer.append(fromInput);
  const formMaxControlContainer = createHTML('div', 'form_control_container');
  formControl.append(formMaxControlContainer);
  const formMaxControlContainerTitle = createHTML(
    'div',
    'form_control_container__title',
    'Max',
  );
  formMaxControlContainer.append(formMaxControlContainerTitle);
  const toInput = createSliderInput(
    'form_control_container__input',
    'number',
    storeValues.max,
    defaultMin,
    defaultMax,
  );
  formMaxControlContainer.append(toInput);

  const rangeContainer = createHTML('div', 'range_container');
  sliderContainer.append(rangeContainer);
  const slidersControl = createHTML('div', 'sliders_control');
  rangeContainer.append(slidersControl);
  const fromSlider = createSliderInput(
    'from_slider',
    'range',
    storeValues.min,
    defaultMin,
    defaultMax,
  );

  const toSlider = createSliderInput(
    'to_slider',
    'range',
    storeValues.max,
    defaultMin,
    defaultMax,
  );

  slidersControl.append(fromSlider);
  slidersControl.append(toSlider);

  function controlFromInput(): void {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = `${to}`;
      fromInput.value = `${to}`;
      setValue('min', `${to}`);
    } else {
      fromSlider.value = `${from}`;
      setValue('min', `${from}`);
    }
    showCards();
  }

  function controlToInput(): void {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = `${to}`;
      toInput.value = `${to}`;
      setValue('max', `${to}`);
    } else {
      toInput.value = `${from}`;
      setValue('max', `${from}`);
    }
    showCards();
  }

  function controlFromSlider(): void {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = `${to}`;
      fromInput.value = `${to}`;
      setValue('min', `${to}`);
    } else {
      fromInput.value = `${from}`;
      setValue('min', `${from}`);
    }
    showCards();
  }

  function controlToSlider(): void {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = `${to}`;
      toInput.value = `${to}`;
      setValue('max', `${to}`);
    } else {
      toInput.value = `${from}`;
      toSlider.value = `${from}`;
      setValue('max', `${from}`);
    }
    showCards();
  }

  function getParsed(
    currentFrom: HTMLInputElement,
    currentTo: HTMLInputElement,
  ): number[] {
    const from = +currentFrom.value;
    const to = +currentTo.value;
    return [from, to];
  }

  function fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement,
  ): void {
    const rangeDistance = +to.max - +to.min;
    const fromPosition = +from.value - +to.min;
    const toPosition = +to.value - +to.min;
    controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
    ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget: HTMLInputElement): void {
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = '2';
    } else {
      toSlider.style.zIndex = '0';
    }
  }

  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);

  fromSlider.addEventListener('input', () => {
    controlFromSlider();
  });
  toSlider.addEventListener('input', () => {
    controlToSlider();
  });
  fromInput.addEventListener('input', () => {
    controlFromInput();
  });
  toInput.addEventListener('input', () => {
    controlToInput();
  });

  const reset = (): void => {
    fromInput.value = defaultMin;
    fromSlider.value = defaultMin;
    toInput.value = defaultMax;
    toSlider.value = defaultMax;
    controlFromSlider();
  };

  return [sliderContainer, reset];
};

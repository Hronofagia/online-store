export const addQueryParam = (key: string, value: string): void => {
  const url = new URL(window.location.href);
  if (value === '') {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  window.history.pushState({}, '', url.toString());
};

export const resetAllParams = (): void => {
  const url = new URL(window.location.href);
  url.search = '';
  window.history.pushState({}, '', url.toString());
};

export const getQueryParam = (key: string): string | null => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key) ?? null;
};

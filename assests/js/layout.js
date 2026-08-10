export const loadComponents = async (className, file) => {
  try {
    const resp = await fetch(file);

    if (!resp.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    const html = await resp.text();

    const element = document.querySelector(`.${className}`);

    if (!element) {
      throw new Error(`.${className} element not found`);
    }

    element.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
};

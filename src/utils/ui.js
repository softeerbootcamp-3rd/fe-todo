export function createComponent(constructor, initialData) {
  const element = document.createElement("div");
  const destroy = constructor(element, initialData);
  return { element, destroy, mounted: false };
}

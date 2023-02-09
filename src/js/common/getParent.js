export function getParent(child, parentSelector, maxParent) {
  let targetElement = child;

  do {
    if (targetElement.matches(parentSelector)) {
      return targetElement;
    }
    targetElement = targetElement.parentNode;
  } while (targetElement && targetElement !== maxParent);

  return null;
}

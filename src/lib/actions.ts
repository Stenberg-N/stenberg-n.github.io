export const handleClickOutside = (
  node: HTMLElement,
  options: {
    requirements: Array<string | null>;
    onOutsideClick: () => void;
  }
) => {
  const { requirements, onOutsideClick } = options;
  const handleClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (node && !node.contains(target) && requirements.some(r => r !== null)) onOutsideClick();
  };

  document.addEventListener('click', handleClick, true);
  return { destroy: () => document.removeEventListener('click', handleClick, true) };
};

export const handleHorizontalScroll = (
  node: HTMLElement,
  options?: {
    multiplier: number
  }
) => {
  const scrollMultiplier = options?.multiplier ?? 1;
  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    node.scrollLeft += event.deltaY * scrollMultiplier;
  };

  node.addEventListener('wheel', handleScroll, { passive: false });
  return { destroy: () => node.removeEventListener('wheel', handleScroll) };
};
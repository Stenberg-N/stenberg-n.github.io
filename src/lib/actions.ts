import { get } from "svelte/store";

import { viewport } from "./viewport";
import type { ViewPort } from "./types";

export const handleClickOutside = (
  node: HTMLElement,
  options: {
    onOutsideClick: () => void;
    additionalIgnorableElements?: (HTMLElement | null)[];
  }
) => {
  const { onOutsideClick } = options;
  const ignorableElements = options.additionalIgnorableElements ?? null;

  const handleClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (node && !node.contains(target) && !ignorableElements?.some((el) => el?.contains(target))) onOutsideClick();
  };

  document.addEventListener('click', handleClick, true);
  return { destroy: () => document.removeEventListener('click', handleClick, true) };
};

export const handleHorizontalScroll = (
  node: HTMLElement,
  options?: {
    multiplier?: number;
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

/**
 * 
 * @param node The element to attach the action to, which acts as the drag handle for the element.
 * @param options The element to be moved is the `parentElement`.
 * @returns onMove returns `top` and `left`, which can be set to the corresponding CSS properties.
 */
export const dragElement = (
  node: HTMLElement,
  options: {
    parentElement: HTMLElement | null;
    onMove: (top: number, left: number) => void;
  }
) => {
  let opts = options;
  let parentDims: DOMRect | null = null;
  let vp: ViewPort | null = null;

  let raf: number | null = null;
  let latestPositions: { x: number, y: number } = { x: 0, y: 0};

  const calcMove = () => {
    if (!parentDims) return;
    raf = null;

    const left = latestPositions.x - (parentDims.width / 2);
    const top = latestPositions.y - 30;
    opts.onMove(top, left);
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (!opts.parentElement) return;

    parentDims = opts.parentElement.getBoundingClientRect();
    vp = get(viewport);

    node.setPointerCapture(e.pointerId);
    node.style.cursor = 'grabbing';
    node.addEventListener('pointerup', handlePointerUp);
    node.addEventListener('pointermove', handlePointerMove);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!opts.parentElement || !parentDims) return;

    latestPositions = { x: e.clientX, y: e.clientY };

    if (
      vp && (
        vp.width <= (latestPositions.x + (parentDims.width / 2)) ||
        latestPositions.x <= parentDims.width / 2 ||
        latestPositions.y <= (vp.width <= 750 ? 160 : 110) ||
        latestPositions.y >= vp.height - 40
      )
    ) return;

    if (!raf) raf = requestAnimationFrame(() => calcMove());
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (node.hasPointerCapture(e.pointerId)) node.releasePointerCapture(e.pointerId);

    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }

    node.style.cursor = 'grab';

    node.removeEventListener('pointerup', handlePointerUp);
    node.removeEventListener('pointermove', handlePointerMove);
  };

  node.addEventListener('pointerdown', handlePointerDown);

  return {
    update: (newOptions: typeof options) => {
      opts = newOptions;
    },
    destroy: () => {
      if (raf) cancelAnimationFrame(raf);
      node.removeEventListener('pointerdown', handlePointerDown);
      node.removeEventListener('pointermove', handlePointerMove);
      node.removeEventListener('pointerup', handlePointerUp);
    }
  }
};
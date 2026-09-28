import { get, writable } from "svelte/store";

import { viewport } from "./viewport";
import type { ViewPort } from "./types";

export const handleClickOutside = (
  node: HTMLElement,
  options: {
    onOutsideClick: () => void;
    getIgnorableEls?: () => (HTMLElement | null)[];
  }
) => {
  let opts = options;

  const handleClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (!target) return;
    if (node.contains(target)) return;

    const ignored = [...opts.getIgnorableEls?.() ?? []];

    if (ignored.some((el) => el?.contains(target))) return;

    opts.onOutsideClick();
  };

  document.addEventListener('click', handleClick, true);
  return {
    destroy: () => {
      document.removeEventListener('click', handleClick, true)
    },
    update: (newOptions: typeof options) => {
      opts = newOptions;
    }
  };
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

export const isElDragged = writable<boolean>(false);
/**
 * 
 * @param node The element to attach the action to, which acts as the drag handle for the element.
 * @param options The element to be moved is the `parentElement`. `ignoreEl` is an element that ignores/overrides the drag event.
 * @returns onMove returns `top` and `left`, which can be set to the corresponding CSS properties.
 */
export const dragElement = (
  node: HTMLElement,
  options: {
    parentElement: HTMLElement | null;
    onMove: (top: number, left: number) => void;
    ignoreEl?: HTMLElement | null;
  }
) => {
  let opts = options;
  let parentDims: DOMRect | null = null;
  let vp: ViewPort | null = null;

  let raf: number | null = null;
  const positions: { firstX: number, x: number, firstY: number, y: number } = { firstX: 0, x: 0, firstY: 0, y: 0};

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const calcMove = () => {
    if (!parentDims || !vp) return;
    raf = null;

    const left = positions.x;
    const top = positions.y;
    opts.onMove(clamp(top, vp.width <= 750 ? 133 : 85, vp.height - parentDims.height), clamp(left, 0, vp.width - parentDims.width));
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (!opts.parentElement) return;
    e.preventDefault();
    if (opts.ignoreEl && opts.ignoreEl.contains(e.target as Node)) return;

    parentDims = opts.parentElement.getBoundingClientRect();
    vp = get(viewport);

    positions.firstX = e.clientX;
    positions.firstY = e.clientY;

    isElDragged.set(true);

    node.setPointerCapture(e.pointerId);
    node.addEventListener('pointerup', handlePointerUp);
    node.addEventListener('pointermove', handlePointerMove);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!opts.parentElement || !parentDims) return;
    e.preventDefault();

    positions.x = (e.clientX + (parentDims.left - positions.firstX));
    positions.y = (e.clientY + (parentDims.top - positions.firstY));

    if (!raf) raf = requestAnimationFrame(calcMove);
  };

  const handlePointerUp = (e: PointerEvent) => {
    e.preventDefault();
    if (node.hasPointerCapture(e.pointerId)) node.releasePointerCapture(e.pointerId);

    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }

    isElDragged.set(false);

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
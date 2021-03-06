import { Fn } from './types';

import { useDebounce } from '@/hooks/core/useDebounce';
import { addResizeListener, removeResizeListener } from '@/utils/event/resizeEvent';

interface WindowSizeOptions {
  once?: boolean;
  immediate?: boolean;
}

export function useElResize<T>(
  el: Element | typeof window,
  fn: Fn<T>,
  wait = 100,
  options?: WindowSizeOptions
) {
  let handler = () => {
    fn();
  };
  const [handleSize, cancel] = useDebounce(handler, wait, options);
  handler = handleSize;

  function start() {
    addResizeListener(el, handler);
  }
  function stop() {
    removeResizeListener(el, handler);
    cancel();
  }

  return [start, stop];
}

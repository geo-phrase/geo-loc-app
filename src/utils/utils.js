

export const AnimateTo = map => {
  let progress = false;

  return dest => {
    progress = false;

    const view = map.getView();
    const start = view.getCenter();
    const diff = [dest[0] - start[0], dest[1] - start[1]];
    const steps = 10;
    let step = 0;

    const loop = init => {
      if (init) {
        progress = true;
      }

      ++step;
      const n = 1 / steps * step;
      const e = 0.5 - Math.cos(n * Math.PI) / 2;
      const coords = [start[0] + diff[0] * e, start[1] + diff[1] * e];
      view.setCenter(coords);
      if (step < steps) {
        window.requestAnimationFrame(() => loop(false));
      }
    };
    window.requestAnimationFrame(() => loop(true));
  };
};

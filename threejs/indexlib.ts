// import { FluidShadows, FluidShadowsOptions } from './backgrounds';
import { FluidShadows, FluidShadowsOptions } from './backgrounds';

var viewport: any = document.querySelector('#viewport') as HTMLElement;

const animations = {
  fluidShadows: (opts?: FluidShadowsOptions) => {
    const item = new FluidShadows(opts);
    item.init(viewport);
    item.run();
    return item;
  }
};

const animation = animations.fluidShadows;

animation();

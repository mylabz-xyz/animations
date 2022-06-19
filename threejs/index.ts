import { FluidShadows } from './backgrounds';

var viewport: any = document.querySelector('#viewport') as HTMLElement;

const animations = {
  fluidShadows: () => {
    const item = new FluidShadows();
    item.init(viewport);
    item.run();
    return item;
  }
};

const animation = animations.fluidShadows;

animation();

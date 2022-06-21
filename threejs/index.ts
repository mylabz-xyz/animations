// import { FluidShadows, FluidShadowsOptions } from './backgrounds';
import {MusicAviator, MusicAviatorOptions} from './games'

var viewport: any = document.querySelector('#viewport') as HTMLElement;

// const animations = {
//   fluidShadows: (opts?: FluidShadowsOptions) => {
//     const item = new FluidShadows(opts);
//     item.init(viewport);
//     item.run();
//     return item;
//   }
// };


const animations = {
  musicAviator:(opts?: MusicAviatorOptions) => {
        const item = new MusicAviator(opts);
        item.init(viewport);
        item.run();
        return item;
      }
};



const animation = animations.musicAviator;

animation();

import {FluidShadows} from './backgrounds'


var viewport: any = document.querySelector('#viewport') as HTMLElement;


const animation =new FluidShadows()

animation.init(viewport)
animation.run()
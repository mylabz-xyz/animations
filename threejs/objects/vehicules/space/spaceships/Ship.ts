import { Mesh } from 'three';
import { DracoLoader } from '../../../../utils/3D/Draco';

export class Ship {
  private draco: DracoLoader = new DracoLoader();
  public mesh!: any;
  constructor() {
    return (async () => {
      await this.draco.createAsync('../../../../assets/models/vehicules/spaceships/Ship.glb');
      this.mesh = this.draco.mesh;
      return this;
    }).bind(this)();
  }
}

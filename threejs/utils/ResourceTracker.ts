import { Material, Object3D, Texture } from 'three';

export class ResourceTracker {
  private resources: Set<Object3D | Material | Texture>;

  constructor() {
    this.resources = new Set();
  }
  track(resource: Object3D | Material | Texture) {
    if (!resource) {
      return resource;
    }

    // handle children and when material is an array of materials or
    // uniform is array of textures
    if (Array.isArray(resource)) {
      resource.forEach(resource => this.track(resource));
      return resource;
    }

    if ((resource as any).dispose || resource instanceof Object3D) {
      this.resources.add(resource);
    }
    if (resource instanceof Object3D) {
      this.track((resource as any).geometry);
      this.track((resource as any).material);
      this.track((resource as any).children);
    } else if (resource instanceof Material) {
      // We have to check if there are any textures on the material
      for (const value of Object.values(resource)) {
        if (value instanceof Texture) {
          this.track(value);
        }
      }
      // We also have to check if any uniforms reference textures or arrays of textures
      if ((resource as any).uniforms) {
        for (const value of Object.values((resource as any).uniforms)) {
          if (value) {
            const uniformValue = (value as any).value;
            if (uniformValue instanceof Texture || Array.isArray(uniformValue)) {
              this.track(uniformValue as Texture);
            }
          }
        }
      }
    }
    return resource;
  }
  untrack(resource: Object3D | Material | Texture) {
    this.resources.delete(resource);
  }
  dispose() {
    for (const resource of Array.from(this.resources)) {
      if (resource instanceof Object3D) {
        if (resource.parent) {
          resource.parent.remove(resource);
        }
      }
      if ((resource as any).dispose) {
        (resource as any).dispose();
      }
    }
    this.resources.clear();
  }
}

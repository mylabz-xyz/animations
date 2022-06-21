import PlasmaBallFrag from './PlasmaBallFrag.glsl';
import PlasmaBallVertex from './PlasmaBallVertex.glsl';
import ParticleFrag from './ParticleFrag.glsl';
import ParticleVert from './ParticleVert.glsl';
export const Frag = {
	plasmaBall: PlasmaBallFrag,
	particle: ParticleFrag,
};
export const Vertex = {
	plasmaBall: PlasmaBallVertex,
	particle: ParticleVert,
};

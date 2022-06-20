export interface ThreeObject {
	update(t: number): void;
}

export interface ThreeObjectWithInteraction {
	update(t: number, tx: any, ty: any): void;
}

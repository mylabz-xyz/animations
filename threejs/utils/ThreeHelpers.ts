import { Vector3 } from 'three';

export const move = (
	speed: number,
	objectPosition: Vector3,
	targetPosition: Vector3
): Vector3 => {
	const d = objectPosition.x - targetPosition.x;
	if (objectPosition.x > targetPosition.x) {
		objectPosition.x -= Math.min(speed, d);
	}
	if (objectPosition.y > targetPosition.y) {
		objectPosition.y -= Math.min(speed, d);
	}

	return objectPosition;
};

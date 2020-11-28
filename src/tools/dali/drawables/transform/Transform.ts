import { Vec3, toZero3, toVec3, zero3, I3, toUnit3 } from "../../../../math/Vec";

export type Transform = {
    translation: Vec3,
    scale: Vec3,
    rotation: Vec3,
};

export function createTransform(
    partialTransform?: Partial<Transform>,
): Transform {
    const defaultTransform = {
        translation: zero3(),
        scale: I3(),
        rotation: zero3(),
    };

    return partialTransform
        ? {
            ...defaultTransform,
            ...partialTransform,
        }
        : defaultTransform;
}

export function reset(
    transform: Transform,
): void {
    toZero3(transform.translation);
    toUnit3(transform.scale);
    toZero3(transform.rotation);
}

export function setPosition(
    transform: Transform,
    p: Vec3,
): void {
    toVec3(transform.translation, p);
}

export function setScale(
    transform: Transform,
    s: Vec3,
): void {
    toVec3(transform.scale, s);
}

export function setRotation(
    transform: Transform,
    r: Vec3,
): void {
    toVec3(transform.rotation, r);
}
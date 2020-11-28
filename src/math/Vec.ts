
export type Vec3 = {
    x: number,
    y: number,
    z: number,
};
export function vec3(
    x: number,
    y: number,
    z: number,
): Vec3 {
    return {
        x,
        y,
        z,
    };
};

export function toVec3(
    v: Vec3,
    to: Vec3,
): void {
    v.x = to.x;
    v.y = to.y;
    v.z = to.z;
}

export function I3(): Vec3 {
    return vec3(1,1,1);
}

export function toUnit3(
    v3: Vec3,
): void {
    v3.x = 1;
    v3.y = 1;
    v3.z = 1;
}

export function zero3(): Vec3 {
    return vec3(0,0,0);
}

export function toZero3(
    v3: Vec3,
): void {
    v3.x = 0;
    v3.y = 0;
    v3.z = 0;
}

export type VecXY = {
    x: number,
    y: number,
}

export function vecXY(
    x: number,
    y: number,
): VecXY {
    return {
        x,
        y,
    };
}

export type VecXZ = {
    x: number,
    z: number,
}
export function vecXZ(
    x: number,
    z: number,
): VecXZ {
    return {
        x,
        z,
    };
}

export type Vec2 = VecXY;
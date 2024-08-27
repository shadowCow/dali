import { Vec2 } from "../../../math/Vec2";

export type Bone = {
    id: string,
    base: Vec2,
    tip: Vec2,
}

export type StickHumanSkeleton = {
    head: Bone,
    spine: Bone,
    leftArmUpper: Bone,
    leftArmLower: Bone,
    rightArmUpper: Bone,
    rightArmLower: Bone,
    leftLegUpper: Bone,
    leftLegLower: Bone,
    rightLegUpper: Bone,
    rightLegLower: Bone,
}

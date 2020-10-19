// import { Vec2 } from '../drawables/transform/Vec';

// export type Bone = {
//     id: string,
//     base: Vec2,
//     tip: Vec2,
// }

// export type StickHumanSkeleton = {
//     head: Bone,
//     spine: Bone,
//     leftArmUpper: Bone,
//     leftArmLower: Bone,
//     rightArmUpper: Bone,
//     rightArmLower: Bone,
//     leftLegUpper: Bone,
//     leftLegLower: Bone,
//     rightLegUpper: Bone,
//     rightLegLower: Bone,
// }

// export function stickHumanArmature(
//     skeleton: StickHumanSkeleton,
// ): Armature.State {
//     return {
//         root: skeleton.spine,
//         joints: [
//             Armature.jointToBone(skeleton.head),
//             Armature.jointToArmature({
//                 root: skeleton.leftArmUpper,
//                 joints: [
//                     Armature.jointToBone(skeleton.leftArmLower),
//                 ],
//             }),
//             Armature.jointToArmature({
//                 root: skeleton.rightArmUpper,
//                 joints: [
//                     Armature.jointToBone(skeleton.rightArmLower),
//                 ],
//             }),
//             Armature.jointToArmature({
//                 root: skeleton.leftLegUpper,
//                 joints: [
//                     Armature.jointToBone(skeleton.leftLegLower),
//                 ],
//             }),
//             Armature.jointToArmature({
//                 root: skeleton.rightLegUpper,
//                 joints: [
//                     Armature.jointToBone(skeleton.rightLegLower),
//                 ],
//             }),
//         ],
//     };
// }

// export namespace Armature {
//     export type State = {
//         rootId: string,
//         bones: {
//             [id: string]: Bone,
//         },
//         joints: {
//             [fromId: string]: string[], // toIds
//         }
//     }
    
//     export type Joint =
//         JointToBone |
//         JointToArmature;
    
//     export type JointToBone = {
//         kind: 'joint_to_bone',
//         bone: Bone,
//     }
//     export function jointToBone(
//         bone: Bone,
//     ): JointToBone {
//         return {
//             kind: 'joint_to_bone',
//             bone,
//         };
//     }
    
//     export type JointToArmature = {
//         kind: 'joint_to_armature',
//         armature: State,
//     }
//     export function jointToArmature(
//         armature: State,
//     ): JointToArmature {
//         return {
//             kind: 'joint_to_armature',
//             armature,
//         };
//     }

//     export type Builder = {
//         join(
//             fromBoneId: string,
//             newBoneId: string,
//             distanceFromBase: number,
//             boneLength: number,
//         ): Builder,
//         build(): State,
//     }

//     /*
//     Several things to consider...
//     (1)
//       each bone needs to derive its position from its ancestors.
//     (2)
//       each bone needs a range of motion?
//     (3)
//       each bone needs a local rotation (relative to its base point).
//     (4)
//       each bone needs a length.
//     (5)
//       we may use the bones to derive coordinates in a space.
//       we can probably keep track of a tranformation matrix if needed.
//     */
//     export function builder(
//         rootId: string,
//         rootLength: number,
//         rootAxis: 'x' | 'y',
//     ): Builder {
//         // 0,0 is the root bone base
//         const rootBone: Bone = {
//             id: rootId,
//             base: { x: 0, y: 0 },
//             tip: rootAxis === 'x'
//                 ? { x: rootLength, y: 0 }
//                 : { x: 0, y: rootLength },
//         };

//         const state: State = {
//             rootId,
//             bones: {
//                 [rootId]: rootBone,
//             },
//             joints: {},
//         };

//         const builder = {
//             join(
//                 fromBoneId: string,
//                 newBoneId: string,
//                 distanceFromBase: number,
//                 newBoneLength: number,
//                 newBoneAxis: 'x' | 'y',
//             ): Builder {
//                 const fromBone = state.bones[fromBoneId];

//                 const newBone: Bone = {
//                     id: newBoneId,
//                     base: 
//                 }

//                 return this;
//             },
//             build(): State {
//                 return state;
//             },
//         };

//         return builder;
//     }
// }
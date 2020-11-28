import { Transform, createTransform } from "./drawables/transform/Transform";
import { GeometricPrimitive2 } from "./drawables/primitives/primitiveShapes";
import { Styles } from "./drawables/styles/Styles";

export type DaliEntity =
    BranchEntity |
    LeafEntity;

export enum DaliEntityKind {
    BRANCH_ENTITY = 'BRANCH_ENTITY',
    LEAF_ENTITY = 'LEAF_ENTITY',
}

export type BaseEntity = {
    id: string,
    transform: Transform,
}

export type BranchEntity =
    BaseEntity &
    {
        kind: typeof DaliEntityKind.BRANCH_ENTITY,
        update: UpdateFn<BranchEntity>,
    };

export function branchEntity(
    id: string,
): BranchEntity {
    return {
        kind: DaliEntityKind.BRANCH_ENTITY,
        id,
        transform: createTransform(),
        update: createNoOpUpdate(),
    };
}

export type LeafEntity =
    BaseEntity &
    {
        kind: typeof DaliEntityKind.LEAF_ENTITY,
        update: UpdateFn<LeafEntity>,
        primitive: GeometricPrimitive2,
        styles: Styles,
    };

export function leafEntity(
    id: string,
    primitive: GeometricPrimitive2,
    styles: Styles,
): LeafEntity {
    return {
        kind: DaliEntityKind.LEAF_ENTITY,
        id,
        transform: createTransform(),
        update: createNoOpUpdate(),
        primitive,
        styles,
    };
}

export type UpdateFn<T> = (
    t: number,
    dt: number,
    target: T,
) => void;

export function createNoOpUpdate<T>(): UpdateFn<T> {
    return () => {};
}
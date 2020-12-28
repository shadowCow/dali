
import { DrawableGroup, PrimitiveDrawable } from "./drawables/drawable";
import { TreeNode } from "../../data_structures/Tree";


export type Updater = (
    t: number,
    dt: number,
) => UpdateAction;

export type UpdateAction =
    AddDrawable |
    RemoveDrawable |
    NoOp |
    RemoveSelf;

export enum UpdateActionKind {
    ADD_DRAWABLE = 'ADD_DRAWABLE',
    REMOVE_DRAWABLE = 'REMOVE_DRAWABLE',
    NO_OP = 'NO_OP',
    REMOVE_SELF = 'REMOVE_SELF',
}

export type AddDrawable = {
    kind: typeof UpdateActionKind.ADD_DRAWABLE,
    drawable: TreeNode<DrawableGroup, PrimitiveDrawable>,
    parentId: string,
}

export type RemoveDrawable = {
    kind: typeof UpdateActionKind.REMOVE_DRAWABLE,
    id: string,
}

export type NoOp = {
    kind: typeof UpdateActionKind.NO_OP,
}

export type RemoveSelf = {
    kind: typeof UpdateActionKind.REMOVE_SELF,
}


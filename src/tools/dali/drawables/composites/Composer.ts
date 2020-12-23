import { DrawableGroup, PrimitiveDrawable } from "../drawable";
import { TreeNode } from "../../../../data_structures/Tree";

export type Composer<Props extends {}> = (
    id: string,
    props: Props,
) => TreeNode<DrawableGroup, PrimitiveDrawable>;
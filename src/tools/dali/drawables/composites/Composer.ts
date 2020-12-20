import { Props } from "../../Props";
import { TreeNode } from "../../Tree";
import { DrawableGroup, PrimitiveDrawable } from "../drawable";

export type Composer<Props extends {}> = (
    id: string,
    props: Props,
) => TreeNode<DrawableGroup, PrimitiveDrawable>;
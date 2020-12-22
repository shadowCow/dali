import { TreeNode, branch } from "../../../../data_structures/Tree";
import { DrawableGroup, PrimitiveDrawable, drawableGroup } from "../drawable";
import { Composer } from "../composites/Composer";

export type GridProps = {
    rows: number,
    columns: number,
    cellWidth: number,
    cellHeight: number,
    drawables: Array<TreeNode<DrawableGroup, PrimitiveDrawable>>,
}

export const Grid: Composer<GridProps> = (id, props) => {

    for (let row = 0; row < props.rows; row++) {
        for (let col = 0; col < props.columns; col++) {
            let index = row * props.columns + col;

            let x = col * props.cellWidth;
            let y = row * props.cellHeight;

            let drawable = props.drawables[index];
            drawable.content.transform.translation.x = x;
            drawable.content.transform.translation.y = y;
        }
    }

    return branch(
        props.drawables,
        drawableGroup(id),
    );
};

import { Drawable, CompositeDrawable, compositeDrawable } from '../drawable';

export type GridParams = {
    rows: number,
    columns: number,
    cellWidth: number,
    cellHeight: number,
    drawables: Drawable[],
}

export function grid(
    id: string,
    params: GridParams,
): CompositeDrawable {
    for (let row = 0; row < params.rows; row++) {
        for (let col = 0; col < params.columns; col++) {
            let index = row * params.columns + col;

            let x = col * params.cellWidth;
            let y = row * params.cellHeight;

            let drawable = params.drawables[index];
            drawable.transform.translation.x = x;
            drawable.transform.translation.y = y;
        }
    }

    const composite = compositeDrawable(
        id,
        params.drawables,
    );

    return composite;
}
// import { Drawable, DrawableGroup, drawableGroup } from '../drawable';
// import { Composer } from './Composer';

// export type GridProps = {
//     rows: number,
//     columns: number,
//     cellWidth: number,
//     cellHeight: number,
//     drawables: Drawable[],
// }

// export const Grid: Composer<GridProps> = (id, props) => {
//     for (let row = 0; row < params.rows; row++) {
//         for (let col = 0; col < params.columns; col++) {
//             let index = row * params.columns + col;

//             let x = col * params.cellWidth;
//             let y = row * params.cellHeight;

//             let drawable = params.drawables[index];
//             drawable.transform.translation.x = x;
//             drawable.transform.translation.y = y;
//         }
//     }

//     const composite = drawableGroup(
//         id,
//         params.drawables,
//     );

//     return composite;
// }

// export function grid(
//     id: string,
// ): DrawableGroup {
    
// }
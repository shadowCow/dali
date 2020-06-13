import { Styles } from '../primitives/styles';
import { Transform } from '../primitives/transforms';
import { PrimitiveDrawable, primitiveDrawable } from '../drawable';
import { quadraticCurveTo, path } from '../primitives/primitiveShapes';
import { AnimatedStyles, AnimatedTransforms } from '../animation';

export function waves(
    id: string,
    x: number,
    y: number,
    waveLength: number,
    amplitude: number,
    cycleCount: number,
    styles: AnimatedStyles,
    transforms?: AnimatedTransforms[],
): PrimitiveDrawable {

    let segments = [
        quadraticCurveTo(
            x + waveLength/2,
            y + amplitude,
            x + waveLength,
            y
        ),
    ];

    for (let i = 1; i < cycleCount; i++) {
        segments.push(quadraticCurveTo(
            segments[i-1].toX + waveLength/2,
            segments[i-1].toY + amplitude,
            segments[i-1].toX + waveLength,
            segments[i-1].toY
        ));
    }

    return primitiveDrawable(
        id,
        {
            typeTag: 'path',
            primitive: path(
                x,
                y,
                segments
            ),
            animations: [],
        },
        styles,
        transforms,
    );
}

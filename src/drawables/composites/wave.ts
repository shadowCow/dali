import { Styles } from '../styles/Styles';
import { PrimitiveDrawable, primitiveDrawable } from '../drawable';
import { quadraticCurveTo, path } from '../primitives/primitiveShapes';
import { AnimatedStyles, AnimatedTransform } from '../animation/Animation';

export function waves(
    id: string,
    x: number,
    y: number,
    waveLength: number,
    amplitude: number,
    cycleCount: number,
    styles: AnimatedStyles,
    transform: AnimatedTransform,
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
            kind: 'path',
            primitive: path(
                x,
                y,
                segments
            ),
        },
        transform,
        styles,
    );
}

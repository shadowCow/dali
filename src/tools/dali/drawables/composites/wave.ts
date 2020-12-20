import { Styles } from '../styles/Styles';
import * as Transform from '../transform/Transform';
import { PrimitiveDrawable, primitiveDrawable, drawableGroup } from '../drawable';
import { quadraticCurveTo, path } from '../primitives/GeometricPrimitive2';
import { NumberProp } from '../../Props';
import { Composer } from './Composer';
import { leaf } from '../../Tree';

export type WavesProps = {
    waveLength: number,
    amplitude: number,
    cycleCount: number,
}

export const Waves: Composer<WavesProps> = (id, props) => {
    const {
        waveLength,
        amplitude,
        cycleCount,
    } = props;

    let segments = [
        quadraticCurveTo(
            waveLength/2,
            amplitude,
            waveLength,
            0,
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

    const drawable = primitiveDrawable(
        id,
        path(
            segments
        ),
    );

    return leaf(drawable);
};

import { Styles } from '../styles/Styles';
import * as Transform from '../transform/Transform';
import { PrimitiveDrawable, primitiveDrawable } from '../drawable';
import { quadraticCurveTo, path } from '../primitives/primitiveShapes';

export type WavesParams = {
    waveLength: number,
    amplitude: number,
    cycleCount: number,
}

export function wavesParams(
    waveLength: number,
    amplitude: number,
    cycleCount: number,
): WavesParams {
    return {
        waveLength,
        amplitude,
        cycleCount,
    };
}

export function waves(
    id: string,
    params: WavesParams,
): PrimitiveDrawable {

    let segments = [
        quadraticCurveTo(
            params.waveLength/2,
            params.amplitude,
            params.waveLength,
            0,
        ),
    ];

    for (let i = 1; i < params.cycleCount; i++) {
        segments.push(quadraticCurveTo(
            segments[i-1].toX + params.waveLength/2,
            segments[i-1].toY + params.amplitude,
            segments[i-1].toX + params.waveLength,
            segments[i-1].toY
        ));
    }

    return primitiveDrawable(
        id,
        path(
            segments
        ),
    );
}

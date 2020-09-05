import { CompositeDrawable, PrimitiveDrawable, at, compositeDrawable } from '../../drawable';
import { Color } from '../../styles/Color';
import { pipe, through } from '../../../util/pipe';
import { grassBlade } from './GrassBlade';


export type GrassTuftParams = {
    color: Color,
    bladeHalfWidth: number,
    minBladeHeight: number,
    maxBladeHeight: number,
}

export function grassTuft(
    id: string,
    params: GrassTuftParams,
): CompositeDrawable {
    const drawables: PrimitiveDrawable[] = [];
    const heightRange = params.maxBladeHeight - params.minBladeHeight;

    const blade1 = grassBlade(
        id + '-1',
        {
            color: params.color,
            halfWidth: params.bladeHalfWidth,
            height: params.minBladeHeight,
            tipOffset: -params.bladeHalfWidth*3,
        },
    );
    blade1.transform.translate.x = -2.5*params.bladeHalfWidth;
    
    const blade2 = grassBlade(
        id + '-2',
        {
            color: params.color,
            halfWidth: params.bladeHalfWidth,
            height: params.minBladeHeight + heightRange/2,
            tipOffset: -params.bladeHalfWidth*2,
        }
    );
    blade2.transform.translate.x = -1.5*params.bladeHalfWidth;

    const blade3 = grassBlade(
        id + '-3',
        {
            color: params.color,
            halfWidth: params.bladeHalfWidth,
            height: params.maxBladeHeight,
            tipOffset: -params.bladeHalfWidth,
        }
    );
    blade3.transform.translate.x = -0.5*params.bladeHalfWidth;

    const blade4 = grassBlade(
        id + '-4',
        {
            color: params.color,
            halfWidth: params.bladeHalfWidth,
            height: params.maxBladeHeight,
            tipOffset: params.bladeHalfWidth,
        }
    );
    blade4.transform.translate.x = .5*params.bladeHalfWidth;

    const blade5 = grassBlade(
        id + '-5',
        {
            color: params.color,
            halfWidth: params.bladeHalfWidth,
            height: params.minBladeHeight + heightRange/2,
            tipOffset: params.bladeHalfWidth*2,
        }
    );
    blade5.transform.translate.x = 1.5*params.bladeHalfWidth;

    const blade6 = grassBlade(
        id + '-6',
        {
            color: params.color,
            halfWidth: params.bladeHalfWidth,
            height: params.minBladeHeight,
            tipOffset: params.bladeHalfWidth*3,
        }
    );
    blade6.transform.translate.x = 2.5*params.bladeHalfWidth;

    drawables.push(blade1);
    drawables.push(blade2);
    drawables.push(blade3);
    drawables.push(blade4);
    drawables.push(blade5);
    drawables.push(blade6);

    return compositeDrawable(
        id,
        drawables,
    );
}
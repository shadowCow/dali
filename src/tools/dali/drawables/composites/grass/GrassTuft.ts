import { DrawableGroup, PrimitiveDrawable, drawableGroup } from '../../drawable';
import { Color } from '../../styles/Color';
import { pipe, through } from '../../../../../util/pipe';
import { GrassBlade } from './GrassBlade';
import { Composer } from '../Composer';
import { branch } from '../../../Tree';


export type GrassTuftProps = {
    color: Color,
    bladeHalfWidth: number,
    minBladeHeight: number,
    maxBladeHeight: number,
}

export const GrassTuft: Composer<GrassTuftProps> = (
    id,
    props,
) => {
    const {
        color,
        bladeHalfWidth,
        minBladeHeight,
        maxBladeHeight,
    } = props;
    
    const heightRange = maxBladeHeight - minBladeHeight;

    const blade1 = GrassBlade(
        id + '-1',
        {
            color: color,
            halfWidth: bladeHalfWidth,
            height: minBladeHeight,
            tipOffset: -bladeHalfWidth*3,
        },
    );
    blade1.content.transform.translation.x = -2.5*bladeHalfWidth;
    
    const blade2 = GrassBlade(
        id + '-2',
        {
            color: color,
            halfWidth: bladeHalfWidth,
            height: minBladeHeight + heightRange/2,
            tipOffset: -bladeHalfWidth*2,
        }
    );
    blade2.content.transform.translation.x = -1.5*bladeHalfWidth;

    const blade3 = GrassBlade(
        id + '-3',
        {
            color: color,
            halfWidth: bladeHalfWidth,
            height: maxBladeHeight,
            tipOffset: -bladeHalfWidth,
        }
    );
    blade3.content.transform.translation.x = -0.5*bladeHalfWidth;

    const blade4 = GrassBlade(
        id + '-4',
        {
            color: color,
            halfWidth: bladeHalfWidth,
            height: maxBladeHeight,
            tipOffset: bladeHalfWidth,
        }
    );
    blade4.content.transform.translation.x = .5*bladeHalfWidth;

    const blade5 = GrassBlade(
        id + '-5',
        {
            color: color,
            halfWidth: bladeHalfWidth,
            height: minBladeHeight + heightRange/2,
            tipOffset: bladeHalfWidth*2,
        }
    );
    blade5.content.transform.translation.x = 1.5*bladeHalfWidth;

    const blade6 = GrassBlade(
        id + '-6',
        {
            color: color,
            halfWidth: bladeHalfWidth,
            height: minBladeHeight,
            tipOffset: bladeHalfWidth*3,
        }
    );
    blade6.content.transform.translation.x = 2.5*bladeHalfWidth;

    const blades = [
        blade1,
        blade2,
        blade3,
        blade4,
        blade5,
        blade6,
    ];

    const g = drawableGroup(
        id,
    );

    return branch(
        blades,
        g,
    );
};

import { primitiveDrawable, Drawable, createAnimation, StaticDrawable } from './drawable';
import { fill } from './styles/Styles';
import * as Transform from './transform/Transform';
import { rect } from './primitives/primitiveShapes';

describe('generator', () => {

    test('works', () => {
        const animation = createAnimation<RectParams>(
            {x: 0, y: 0, w: 20, h: 30},
            rectGenerator,
            rectAnimator,
        );

        const frame1 = animation(0, 0);
        expect(frame1).toEqual(primitiveDrawable('1',
            rect(0,0,20,30),
            Transform.create(),
            fill(),
        ));

        const frame2 = animation(100, 100);
        expect(frame2).toEqual(primitiveDrawable('1',
            rect(5, -4, 20, 30),
            Transform.create(),
            fill(),
        ));
    });

});

type RectParams = {x:number, y:number, w: number, h: number}
function rectGenerator(
    p: RectParams
): StaticDrawable {
    return primitiveDrawable(
        '1',
        rect(p.x, p.y, p.w, p.h),
        Transform.create(),
        fill(),
    );
}

function rectAnimator(
    t: number,
    dt: number,
    p: RectParams,
): RectParams {
    return {
        x: p.x + (dt * (50/1000)),
        y: p.y - (dt * (40/1000)),
        w: p.w,
        h: p.h,
    };
}
import { primitiveDrawable, Drawable, createAnimation, StaticDrawable } from './drawable';
import { fill, Styles } from './styles/Styles';
import * as Transform from './transform/Transform';
import * as Translate from './transform/Translate';
import { rect, RectParams } from './primitives/primitiveShapes';

describe('animation', () => {

    test('works', () => {
        const animation = createAnimation<RectParams>(
            rectGenerator,
            rectAnimator,
            { w: 20, h: 30},
            Transform.create(),
            fill(),
        );

        const frame1 = animation(0, 0);
        expect(frame1).toEqual(primitiveDrawable('1',
            rect(20, 30),
            Transform.create(),
            fill(),
        ));

        const frame2 = animation(100, 100);
        expect(frame2).toEqual(primitiveDrawable('1',
            rect(20, 30),
            Transform.create({
                translate: { x: 5, y: -4 },
            }),
            fill(),
        ));
    });

});

function rectGenerator(
    p: RectParams
): StaticDrawable {
    return primitiveDrawable(
        '1',
        rect(p.w, p.h),
        Transform.create(),
        fill(),
    );
}

function rectAnimator(
    t: number,
    dt: number,
    previousItem: RectParams,
    previousTransform: Transform.State,
    previousStyles: Styles,
): [RectParams, Transform.State, Styles] {
    return [
        previousItem,
        Transform.transition(
            previousTransform,
            Translate.deltaTranslation(
                dt * (50/1000),
                (-dt) * (40/1000),
            ),
        ),
        previousStyles,
    ];
}
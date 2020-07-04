import { primitiveDrawable, Drawable, DrawableTypes, at, withStyles } from '../../drawables/drawable';
import { ellipse, rect, line, polygon, path, lineTo, bezierCurveTo, text, Rect, equilateralPolygon, PrimitiveTypes } from '../../drawables/primitives/primitiveShapes';
import { strokeAndFill, stroke, fill, Fill } from '../../drawables/styles/Styles';
import { eyePair, eyePairParams } from '../../drawables/composites/eye';
import { waves, wavesParams } from '../../drawables/composites/wave';
import * as Duration from '../../drawables/transition/Duration';
import * as Interpolator from '../../drawables/transition/Interpolator';
import * as Transform from '../../drawables/transform/Transform';
import { Colors } from '../../drawables/styles/Color';
import { ImageCache } from '../../drawables/ImageCache';
import { through, pipe } from '../../util/pipe';

export function exampleData(
    imageCache: ImageCache,
): Drawable[] {
    return [
        primitiveDrawable(
            '1',
            rect(50, 200),
            Transform.create({
                translate: { x: 100, y: 100 },
            }),
            fill(),
        ),
        primitiveDrawable(
            '2',
            ellipse(50, 50),
            Transform.create({
                translate: { x: 300, y: 200 },
            }),
            fill(Colors.Green()),
        ),
        primitiveDrawable(
            '3',
            line(450, 450),
            Transform.create({
                translate: { x: 500, y: 500 },
            }),
            fill(),
        ),
        pipe(
            eyePair('4', eyePairParams(50, 50, Colors.Blue())),
            through(
                at({x: 600, y: 200})
            ),
        ),
        pipe(
            waves('5', wavesParams(40, 40, 20)),
            through(
                at({x: 50, y: 400}),
                withStyles(stroke(Colors.Green(), 2)),
            ),
        ),
    ];
}
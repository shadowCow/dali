import { primitiveDrawable, Drawable, DrawableTypes } from '../../drawables/drawable';
import { ellipse, rect, line, polygon, path, lineTo, bezierCurveTo, text, Rect, equilateralPolygon, PrimitiveTypes } from '../../drawables/primitives/primitiveShapes';
import { strokeAndFill, stroke, fill, Fill } from '../../drawables/styles/Styles';
import { eyePair } from '../../drawables/composites/eye';
import { waves } from '../../drawables/composites/wave';
import * as Duration from '../../drawables/transition/Duration';
import * as Interpolator from '../../drawables/transition/Interpolator';
import * as Transform from '../../drawables/transform/Transform';
import { Colors } from '../../drawables/styles/Color';
import { ImageCache } from '../../drawables/ImageCache';

export function exampleData(
    imageCache: ImageCache,
): Drawable[] {
    return [
        primitiveDrawable(
            '1',
            rect(100, 100, 50, 200),
            Transform.create(),
            fill(),
        ),
        primitiveDrawable(
            '2',
            ellipse(300, 200, 50, 50),
            Transform.create(),
            fill(Colors.Green()),
        ),
        primitiveDrawable(
            '3',
            line(500, 500, 450, 450),
            Transform.create(),
            fill(),
        ),
        eyePair('4', 600, 200, 50, 50, Colors.Blue()),
        waves('5', 50, 400, 40, 40, 20, stroke(Colors.Green(), 2), Transform.create()),
    ];
}
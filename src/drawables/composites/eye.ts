import { CompositeDrawable, compositeDrawable, PrimitiveDrawable, primitiveDrawable } from '../drawable';
import { ellipse } from '../primitives/primitiveShapes';
import { fill, strokeAndFill, Color, Colors } from '../primitives/styles';


export function eyePair(
    id: string,
    cx: number,
    cy: number,
    eyeSpacing: number,
    irisRadius: number,
    irisColor: Color
): CompositeDrawable {
    const centerXEye1 = cx - eyeSpacing/2 - irisRadius*2;
    const centerXEye2 = cx + eyeSpacing/2 + irisRadius*2;

    const drawables = [
        eye(
            id + 'eyeOne',
            centerXEye1,
            cy,
            irisRadius,
            irisColor
        ),
        eye(
            id + 'eyeTwo',
            centerXEye2,
            cy,
            irisRadius,
            irisColor
        ),
    ];

    return compositeDrawable(
        id,
        drawables,
    );
}

export function eye(
    id: string,
    cx: number,
    cy: number,
    irisRadius: number,
    irisColor: Color,
): CompositeDrawable {
  
    const drawables = [
        eyeOutline(id, cx, cy, irisRadius),
        iris(id, cx, cy, irisRadius, irisColor),
        pupil(id, cx, cy, irisRadius/2),
    ];

    return compositeDrawable(
        id,
        drawables,
    );
}

function iris(
    eyeId: string,
    cx: number,
    cy: number,
    radius: number,
    color: Color,
): PrimitiveDrawable {
    return primitiveDrawable(
        eyeId + '-iris',
        {
            typeTag: 'ellipse',
            primitive: ellipse(
                cx,
                cy,
                radius,
                radius
            ),
            animations: [],
        },
        {
            typeTag: 'fill',
            styles: fill(color),
            animations: [],
        },
    );
}

function pupil(
    eyeId: string,
    cx: number,
    cy: number,
    r: number
): PrimitiveDrawable {
    return primitiveDrawable(
        eyeId + '-pupil',
        {
            typeTag: 'ellipse',
            primitive: ellipse(
                cx,
                cy,
                r,
                r
            ),
            animations: [],
        },
        {
            typeTag: 'fill',
            styles: fill(Colors.Black()),
            animations: [],
        },
    );
}

function eyeOutline(
    eyeId: string,
    cx: number,
    cy: number,
    irisRadius: number
): PrimitiveDrawable {
    return primitiveDrawable(
        eyeId + '-eyeOutline',
        {
            typeTag: 'ellipse',
            primitive: ellipse(
                cx,
                cy,
                irisRadius*2,
                irisRadius*2,
            ),
            animations: [],
        },
        {
            typeTag: 'stroke_and_fill',
            styles: strokeAndFill(
                Colors.Black(),
                3,
                Colors.White(),
            ),
            animations: [],
        },
    );
}

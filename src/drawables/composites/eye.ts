import { CompositeDrawable, compositeDrawable, PrimitiveDrawable, primitiveDrawable } from '../drawable';
import { ellipse } from '../primitives/primitiveShapes';
import { fill, strokeAndFill } from '../styles/Styles';
import * as Transform from '../transform/Transform';
import { Color, Colors } from '../styles/Color';
import { createAnimatedTransform } from '../animation/Animation';

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
            kind: 'ellipse',
            primitive: ellipse(
                cx,
                cy,
                radius,
                radius
            ),
        },
        createAnimatedTransform(),
        {
            kind: 'fill',
            styles: fill(color),
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
            kind: 'ellipse',
            primitive: ellipse(
                cx,
                cy,
                r,
                r
            ),
        },
        createAnimatedTransform(),
        {
            kind: 'fill',
            styles: fill(Colors.Black()),
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
            kind: 'ellipse',
            primitive: ellipse(
                cx,
                cy,
                irisRadius*2,
                irisRadius*2,
            ),
        },
        createAnimatedTransform(),
        {
            kind: 'stroke_and_fill',
            styles: strokeAndFill(
                Colors.Black(),
                3,
                Colors.White(),
            ),
        },
    );
}

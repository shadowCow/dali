
import { fill, strokeAndFill } from '../styles/Styles';
import { Color, Colors } from '../styles/Color';
import { pipe, through } from '../../../../util/pipe';
import { Composer } from './Composer';
import { drawableGroup, PrimitiveDrawable, primitiveDrawable } from '../drawable';
import { ellipse } from '../primitives/GeometricPrimitive2';
import { createTransform } from '../transform/Transform';
import { branch, Leaf, leaf } from '../../../../data_structures/Tree';

export type EyePairProps = {
    eyeSpacing: number,
    eyeProps: EyeProps,
}

export const EyePair: Composer<EyePairProps> = (
    id: string,
    props: EyePairProps,
) => {
    const {
        eyeSpacing,
        eyeProps,
    } = props;

    const centerXEye1 = 0 - eyeSpacing/2 - eyeProps.irisRadius*2;
    const centerXEye2 = 0 + eyeSpacing/2 + eyeProps.irisRadius*2;

    const leftEye = Eye(
        id + 'eyeOne',
        eyeProps,
    );
    leftEye.content.transform.translation = { x: centerXEye1, y: 0, z: 0};

    const rightEye = Eye(
        id + 'eyeTwo',
        eyeProps,
    );
    rightEye.content.transform.translation = { x: centerXEye2, y: 0, z: 0};

    const drawables = [
        leftEye,
        rightEye,
    ];

    return branch(
        drawables,
        drawableGroup(id),
    );
};

export type EyeProps = {
    irisRadius: number,
    irisColor: Color,
}

export const Eye: Composer<EyeProps> = (
    id: string,
    props: EyeProps,
) => {
    const {
        irisRadius,
        irisColor,
    } = props;
  
    const drawables = [
        eyeOutline(id, { irisRadius }),
        iris(id, { radius: irisRadius, color: irisColor }),
        pupil(id, { radius: irisRadius/2 }),
    ];

    return branch(
        drawables,
        drawableGroup(id),
    );
};

export type IrisProps = {
    radius: number,
    color: Color,
}

function iris(
    eyeId: string,
    params: IrisProps,
): Leaf<PrimitiveDrawable> {
    const pd = primitiveDrawable(
        eyeId + '-iris',
        ellipse(params.radius, params.radius),
        createTransform(),
        fill(params.color),
    );

    return leaf(pd);
}

export type PupilProps = {
    radius: number,
}

function pupil(
    eyeId: string,
    params: PupilProps,
): Leaf<PrimitiveDrawable> {
    const pd = primitiveDrawable(
        eyeId + '-pupil',
        ellipse(params.radius, params.radius),
        createTransform(),
        fill(Colors.Black()),
    );

    return leaf(pd);
}

export type EyeOutlineProps = {
    irisRadius: number,
}

function eyeOutline(
    eyeId: string,
    params: EyeOutlineProps,
): Leaf<PrimitiveDrawable> {
    const pd = primitiveDrawable(
        eyeId + '-eyeOutline',
        ellipse(params.irisRadius * 2, params.irisRadius * 2),
        createTransform(),
        strokeAndFill(
            Colors.Black(),
            3,
            Colors.White(),
        ),
    );

    return leaf(pd);
}

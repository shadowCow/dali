import { Axis3 } from '../transform/Transform';
import { vec3, zero3 } from '../../../../math/Vec';
import { Composer } from '../composites/Composer';
import { branch, TreeNode } from '../../../../data_structures/Tree';
import { DrawableGroup, PrimitiveDrawable, drawableGroup } from '../drawable';

export type RadialProps = {
    radius: number,
    angleSpacing: number,
    angleOffset: number,
    rotationAxis: Axis3,
    drawables: Array<TreeNode<DrawableGroup, PrimitiveDrawable>>,
}

export const Radial: Composer<RadialProps> = (id, props) => {
    props.drawables.forEach((drawable, index) => {
        drawable.content.transform.translation = vec3(0, -props.radius, 0);
        const rotation = zero3();
        rotation[props.rotationAxis] = props.angleOffset + (index * props.angleSpacing);

        drawable.content.transform.rotation = rotation;
    });

    return branch(
        props.drawables,
        drawableGroup(id),
    );
};

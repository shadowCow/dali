import { Composer } from "../Composer"
import { StickHumanSkeleton } from "../../../armature/StickHuman"
import { Branch, branch, leaf } from "../../../../../data_structures/Tree"
import { DrawableGroup, PrimitiveDrawable, primitiveDrawable, drawableGroup } from "../../drawable"
import { ellipse, line } from "../../primitives/GeometricPrimitive2"
import { createTransform } from "../../transform/Transform"
import { vec3 } from "../../../../../math/Vec"

export type StickPersonProps = {
    skeleton: StickHumanSkeleton,
}

export const StickPerson: Composer<StickPersonProps> = (id, props) => {
    return growPerson(
        id,
        props.skeleton,
    );
}

function growPerson(
    id: string,
    skeleton: StickHumanSkeleton,
): Branch<DrawableGroup, PrimitiveDrawable> {
    
    const spine = primitiveDrawable(
        id + '-spine',
        line(
            skeleton.spine.base.x,
            skeleton.spine.base.y,
        ),
    );

    const headBoneRx = skeleton.head.tip.x - skeleton.head.base.x;
    const headBoneRy = Math.abs(skeleton.head.tip.y - skeleton.head.base.y);
    const head = primitiveDrawable(
        id + '-head',
        ellipse(
            headBoneRx,
            headBoneRy
        ),
    );
    
    const leftArmUpper = primitiveDrawable(
        id + '-leftArmUpper',
        line(
            skeleton.leftArmUpper.tip.x,
            skeleton.leftArmUpper.tip.y,
        ),
    );
    
    const leftArmLower = primitiveDrawable(
        id + '-leftArmLower',
        line(
            skeleton.leftArmLower.tip.x,
            skeleton.leftArmLower.tip.y,
        ),
    );
    

    const rightArmUpper = primitiveDrawable(
        id + '-rightArmUpper',
        line(
            skeleton.rightArmUpper.tip.x,
            skeleton.rightArmUpper.tip.y,
        ),
    );
    
    const rightArmLower = primitiveDrawable(
        id + '-rightArmLower',
        line(
            skeleton.rightArmLower.tip.x,
            skeleton.rightArmLower.tip.y,
        ),
    );
    

    const leftLegUpper = primitiveDrawable(
        id + '-leftLegUpper',
        line(
            skeleton.leftLegUpper.tip.x,
            skeleton.leftLegUpper.tip.y,
        ),
    )
    
    const leftLegLower = primitiveDrawable(
        id + '-leftLegLower',
        line(
            skeleton.leftLegLower.tip.x,
            skeleton.leftLegLower.tip.y,
        ),
    );
    

    const rightLegUpper = primitiveDrawable(
        id + '-rightLegUpper',
        line(
            skeleton.rightLegUpper.tip.x,
            skeleton.rightLegUpper.tip.y,
        ),
    );
    
    const rightLegLower = primitiveDrawable(
        id + '-rightLegLower',
        line(
            skeleton.rightLegLower.tip.x,
            skeleton.rightLegLower.tip.y,
        ),
    );
    
    return branch(
        [
            leaf(spine),
            leaf(head),
            leaf(leftArmUpper),
            leaf(leftArmLower),
            leaf(rightArmUpper),
            leaf(rightArmLower),
            leaf(leftLegUpper),
            leaf(leftLegLower),
            leaf(rightLegUpper),
            leaf(rightLegLower),
        ],
        drawableGroup(id),
    );
}

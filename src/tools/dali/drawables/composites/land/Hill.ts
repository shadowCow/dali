import { Composer } from "../Composer"
import { Paint } from "../../styles/Color";
import { primitiveDrawable } from "../../drawable";
import { path, moveTo, quadraticCurveTo, ellipse } from "../../primitives/GeometricPrimitive2";
import { createTransform } from "../../transform/Transform";
import { fill, styles } from "../../styles/Styles";
import { leaf } from "../../../../../data_structures/Tree";

export type HillProps = {
    width: number,
    height: number,
    paint: Paint,
}

export const Hill: Composer<HillProps> = (id, props) => {
    const hillShape = primitiveDrawable(
        id,
        ellipse(
            props.width / 2,
            props.height / 2,
        ),
        createTransform(),
        styles(fill(props.paint)),
    );

    return leaf(hillShape);
};

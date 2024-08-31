import { branch, leaf } from "../../../../../data_structures/Tree";
import { drawableGroup, primitiveDrawable } from "../../drawable";
import {
  bezierCurveTo,
  lineTo,
  moveTo,
  path,
  quadraticCurveTo,
} from "../../primitives/GeometricPrimitive2";
import { Color } from "../../styles/Color";
import { fill, styles } from "../../styles/Styles";
import { createTransform } from "../../transform/Transform";
import { Composer } from "../Composer";

export type CloudProps = {
  color: Color;
  width: number;
  height: number;
};

export const Cloud: Composer<CloudProps> = (id, props) => {
  const c = primitiveDrawable(
    id,
    path([
      moveTo(0, 0),
      lineTo(props.width, 0),
      bezierCurveTo(
        props.width + props.width * (1 / 8),
        -(props.height / 4),
        props.width * (2 / 3) + props.width * (1 / 8),
        -(props.height / 2 + props.height * (3 / 4)),
        props.width * (2 / 3),
        -(props.height / 2)
      ),
      bezierCurveTo(
        props.width * (2 / 3) - props.width * (1 / 16),
        -(props.height + props.height * (1 / 4)),
        props.width * (1 / 3) + props.width * (1 / 16),
        -(props.height + props.height * (1 / 4)),
        props.width * (1 / 3),
        -(props.height / 2)
      ),
      bezierCurveTo(
        props.width * (1 / 3) - props.width * (1 / 8),
        -(props.height / 2 + props.height * (3 / 4)),
        0 - props.width * (1 / 8),
        -(props.height / 4),
        0,
        0
      ),
    ]),
    createTransform(),
    styles(fill(props.color))
  );

  return branch([leaf(c)], drawableGroup(id));
};

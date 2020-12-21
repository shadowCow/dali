import { DrawableGroup, PrimitiveDrawable, Drawable } from "./drawable";
import { Styles } from "./styles/Styles";
import { Vec3 } from "../../../math/Vec";

export function modify(
    drawable: Drawable,
): Pipeline {
    const pipeline = new PipelineImpl(drawable);

    return pipeline;
}

export interface Pipeline {
    style: (styles: Styles) => Pipeline,
    translate: (v: Vec3) => Pipeline,
    scale: (v: Vec3) => Pipeline,
    rotate: (v: Vec3) => Pipeline,
}

class PipelineImpl implements Pipeline {
    constructor(
        private drawable: Drawable,
    ) {}

    style(styles: Styles): Pipeline {
        this.drawable.styles = styles;
        return this;
    }
    translate(v: Vec3): Pipeline {
        this.drawable.transform.translation = v;
        return this;
    }
    scale(v: Vec3): Pipeline {
        this.drawable.transform.scale = v;
        return this;
    }
    rotate(v: Vec3): Pipeline {
        this.drawable.transform.rotation = v;
        return this;
    }
}
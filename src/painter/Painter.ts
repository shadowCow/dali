import { Drawable } from "../drawables/primitives/drawable";

export interface Painter {
    draw(drawable: Drawable): void;
}
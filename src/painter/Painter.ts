import { Drawable } from "../drawables/index";

export interface Painter {
    draw(drawable: Drawable): void;
}
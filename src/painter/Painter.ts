import { Drawable } from '../drawables/drawable';

export interface Painter {
    draw(drawable: Drawable): void;
    clear(): void;
}
import { StaticDrawable } from '../drawables/drawable';

export interface Painter {
    draw(drawable: StaticDrawable): void;
    clear(): void;
}
import { Drawable } from "../drawables/drawable";

export interface Scene {
    readonly drawables: Map<string, Drawable>;
    readonly drawOrder: string[];

    add(drawable: Drawable): void;
    remove(drawableId: string): void;
}

export class SceneImpl implements Scene {
    readonly drawables: Map<string, Drawable> = new Map();
    readonly drawOrder: string[] = [];

    add(drawable: Drawable): void {
        this.drawables.set(drawable.id, drawable);
        this.drawOrder.push(drawable.id);
    }
    remove(drawableId: string): void {
        this.drawables.delete(drawableId);

        const orderIndex = this.drawOrder.indexOf(drawableId);

        if (orderIndex > -1) {
            this.drawOrder.splice(orderIndex, 1);
        }
    }
    
}


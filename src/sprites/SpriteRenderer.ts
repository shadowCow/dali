import { Sprite } from "./Sprite";
import { Painter } from "../painter/Painter";

export namespace SpriteRendererCanvas {
    export type Renderable =
        Sprite.Static |
        Sprite.Container.State;

    export function create(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
    ): Painter<Renderable> {
        const paint = (r: Renderable) => {
            switch (r.tag) {
                case Sprite.StateTag.STATIC:
                    ctx.drawImage(
                        r.texture.image,
                        r.cx,
                        r.cy,
                    );
                    break;
                case Sprite.Container.StateTag.CONTAINER:
                    r.children.forEach(c => {
                        ctx.drawImage(
                            c.texture.image,
                            c.cx,
                            c.cy,
                        );
                    });
                    break;
            }
        };

        const clear = () => {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height,
            );
        };

        return {
            paint,
            clear,
        };
    }
}
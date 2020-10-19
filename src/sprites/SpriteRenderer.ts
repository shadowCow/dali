import { Sprite } from "./Sprite";
import { Painter } from "../painter/Painter";

export namespace SpriteRendererCanvas {

    export type Renderable =
        Sprite.State |
        Sprite.Container.State;

    export function create(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        scale: number = 1,
    ): Painter<Renderable> {
        ctx.scale(scale, scale);

        const paint = (r: Renderable) => {
            switch (r.tag) {
                case Sprite.StateTag.STATIC:
                case Sprite.StateTag.ANIMATED:
                    drawSprite(
                        ctx,
                        r,
                    );
                    break;
                case Sprite.Container.StateTag.CONTAINER:
                    r.children.forEach(c => {
                        drawSprite(
                            ctx,
                            c,
                        );
                    });
                    break;
            }
        };

        function drawSprite(
            ctx: CanvasRenderingContext2D,
            sprite: Sprite.CommonState,
        ): void {
            ctx.drawImage(
                sprite.texture.image,
                sprite.cx - sprite.texture.image.width/2,
                sprite.cy - sprite.texture.image.height/2,
            );
        }

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
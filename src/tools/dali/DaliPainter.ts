import { Painter } from "../../painter/Painter";

export type DaliPainter = Painter<any>;

export function createDaliPainter(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    scale: number = 1,
): Painter<any> {
    ctx.scale(scale, scale);

    const paint = (r: any) => {
        ctx.fillRect(
            50,
            50,
            100,
            200
        );
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

export type Painter<T> = {
    paint: (t: T) => void,
    clear: () => void,
}

export function withCanvas(
    document: Document,
    canvasId: string,
    containerId?: string,
): (f: (c: {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
}) => void) => void {
    const maybeCanvas = prepareCanvas(
        document,
        canvasId,
        containerId,
    );

    if (maybeCanvas) {
        return (f) => {
            f(maybeCanvas);
        };
    } else {
        throw 'Unable to create canvas';
    }
}

export function prepareCanvas(
    document: Document,
    canvasId: string,
    containerId?: string,
): {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
} | null {
    const container = containerId
        ? document.getElementById(containerId)
            || document.body
        : document.body;

    const canvas = createCanvas(
        document,
        canvasId,
        container,
    );

    const ctx = canvas.getContext('2d');

    if (ctx) {
        return {
            canvas,
            ctx,
        };
    } else {
        return null;
    }
}

function createCanvas(
    document: Document,
    canvasId: string,
    container: HTMLElement,
): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.style.zIndex = '100';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    container.appendChild(canvas);

    return canvas;
}

export function loadImages(
    imageSrcs: string[],
): Promise<ImageCache> {
    return Promise.all(
        imageSrcs.map(loadImage),
    ).then(
        createImageCache
    );
}

function loadImage(
    src: string,
): Promise<ImageWithId> {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({src, image: img});
        img.src = src;
    });
}

function createImageCache(
    imgs: ImageWithId[],
): ImageCache {
    const cache: ImageCache = {};
    imgs.forEach(img => {
        cache[img.src] = img.image;
    });
    return cache;
}

export type ImageCache = {
    [src: string]: HTMLImageElement;
}

export type ImageWithId = {
    src: string;
    image: HTMLImageElement;
}


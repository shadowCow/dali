import { ImageCache } from '../drawables/ImageCache';

export type LoadSpriteSheetParams = {
    imageName: string,
    spriteMapId: string,
    offsetX: number,
    offsetY: number,
    spriteWidth: number,
    spriteHeight: number,
}

export function loadSpriteSheets(
    imageCache: ImageCache,
    params: LoadSpriteSheetParams[],
): Promise<SpriteMapCache> {
    return Promise.all(
        params.map(p => loadSpriteSheet(
            imageCache,
            p,
        )),
    ).then(spriteMaps =>
        createSpriteMapCache(spriteMaps)    
    );
}

export function loadSpriteSheet(
    imageCache: ImageCache,
    params: LoadSpriteSheetParams,
): Promise<SpriteMap> {
    const {
        imageName,
        spriteMapId,
        offsetX,
        offsetY,
        spriteWidth,
        spriteHeight,
    } = params;

    const spriteSheet = imageCache[imageName];
    const spritePromises: Promise<ImageBitmap>[] = [];
    
    let row = 0;
    let col = 0;

    for (let y = offsetY; y < spriteSheet.height-1; y += spriteHeight) {
        col = 0;    

        for (let x = offsetX; x < spriteSheet.width-1; x += spriteWidth) {
            spritePromises.push(
                createImageBitmap(spriteSheet, x, y, spriteWidth, spriteHeight),
            );
            
            col++;
        }

        row++;
    }
    console.log(row, col);

    return Promise.all(spritePromises).then(bitmaps => {
        const spriteMap: SpriteMap = {
            id: spriteMapId,
            sprites: [],
        };

        for (let r = 0; r < row; r++) {
            spriteMap.sprites.push([]);

            for (let c = 0; c < col; c++) {
                const index = r * col + c;
                const bitmap = bitmaps[index];

                // console.log('index', index);
                // console.log('bitmap', bitmap);
                spriteMap.sprites[r].push(
                    bitmap,
                );
            }
        }

        return spriteMap;
    });
}

export type SpriteMap = {
    id: string,
    sprites: Array<Array<ImageBitmap>>;
}

export type SpriteMapCache = {
    [id: string]: SpriteMap,
}

export function createSpriteMapCache(
    spriteMaps: SpriteMap[],
): SpriteMapCache {
    const cache: SpriteMapCache = {};

    spriteMaps.forEach(m => {
        cache[m.id] = m;
    });

    return cache;
}
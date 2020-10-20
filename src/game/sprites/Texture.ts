import { assertNever } from "../../util/patternMatching";

export namespace Texture {
    export type State = {
        id: string,
        image: ImageBitmap,
    }

    export type Cache = {
        [id: string]: State,
    }
}

export namespace TextureLoader {
    export enum Tags {
        IMAGE = 'IMAGE',
        ATLAS_IRREGULAR = 'ATLAS_IRREGULAR',
        ATLAS_GRID = 'ATLAS_GRID',
    }

    export type Params =
        ImageParams |
        IrregularParams |
        GridParams;

    export type ImageParams = {
        tag: typeof Tags.IMAGE,
        id: string,
        imagePath: string,
    }

    export function imageParams(
        id: string,
        imagePath: string,
    ): ImageParams {
        return {
            tag: Tags.IMAGE,
            id,
            imagePath,
        };
    }

    export type IrregularParams = {
        tag: typeof Tags.ATLAS_IRREGULAR,
        imagePath: string,
        textures: IrregularReference[],
    }

    export function irregularParams(
        imagePath: string,
        textures: IrregularReference[],
    ): IrregularParams {
        return {
            tag: Tags.ATLAS_IRREGULAR,
            imagePath,
            textures,
        };
    }

    export type IrregularReference = {
        id: string,
        left: number,
        top: number,
        w: number,
        h: number,
    }

    export function irregularReference(
        id: string,
        left: number,
        top: number,
        w: number,
        h: number,
    ): IrregularReference {
        return {
            id,
            left,
            top,
            w,
            h,
        };
    }


    export type GridParams = {
        tag: typeof Tags.ATLAS_GRID,
        imagePath: string,
        ids: string[],
        rows: number,
        columns: number,
        xOffset: number,
        yOffset: number,
        xGap: number,
        yGap: number,
        w: number,
        h: number,
    }

    export function gridParams(
        imagePath: string,
        ids: string[],
        rows: number,
        columns: number,
        xOffset: number,
        yOffset: number,
        xGap: number,
        yGap: number,
        w: number,
        h: number,
    ): GridParams {
        return {
            tag: Tags.ATLAS_GRID,
            imagePath,
            ids,
            rows,
            columns,
            xOffset,
            yOffset,
            xGap,
            yGap,
            w,
            h,
        };
    }

    export function loadAll(
        allParams: Params[],
    ): Promise<Texture.Cache> {
        return new Promise<Texture.Cache>(resolve => {
            const texturePromises: Promise<Texture.State[]>[] =
                allParams.map(p => {
                    switch (p.tag) {
                        case Tags.IMAGE:
                            return loadImageBitmap(p);
                        case Tags.ATLAS_IRREGULAR:
                            return loadAtlasIrregular(p);
                        case Tags.ATLAS_GRID:
                            return loadAtlasGrid(p);
                        default:
                            assertNever(p);
                    }
                });

            const cachePromise = Promise.all(texturePromises)
                .then(textures => {
                    const cache: Texture.Cache = {};
        
                    textures.forEach(r => r.forEach(t => {
                        cache[t.id] = t;
                    }));

                    return cache;
                });

            cachePromise.then(cache => resolve(cache));
        });
    }

    function loadImageBitmap(
        params: ImageParams,
    ): Promise<Texture.State[]> {
        const t = loadImage(
            params.imagePath,
        ).then(img => {
            return createImageBitmap(img)
                .then(bitmap => {
                    return [{
                        id: params.id,
                        image: bitmap,
                    }];
                });
        });
        
        return t;
    }

    function loadAtlasIrregular(
        params: IrregularParams,
    ): Promise<Texture.State[]> {
        return loadImage(
            params.imagePath,
        ).then(img => {
            const promises = params.textures.map(t => {
                return createImageBitmap(
                    img,
                    t.left,
                    t.top,
                    t.w,
                    t.h,
                ).then(bitmap => {
                    return {
                        id: t.id,
                        image: bitmap,
                    };
                });
            });

            return Promise.all(promises);
        });
    }

    function loadAtlasGrid(
        params: GridParams,
    ): Promise<Texture.State[]> {
        return loadImage(
            params.imagePath,
        ).then(img => {
            const promises = params.ids.map((id, index) => {
                const ri = index / params.columns;
                const ci = index % params.columns;
                const left = params.xOffset +
                    ci * (params.xGap + params.w);
                const top = params.yOffset +
                    ri * (params.yGap + params.h);

                return createImageBitmap(
                    img,
                    left,
                    top,
                    params.w,
                    params.h,
                ).then(bitmap => {
                    return {
                        id,
                        image: bitmap,
                    };
                });
            });

            return Promise.all(promises);
        });
    }

    function loadImage(
        path: string,
    ): Promise<HTMLImageElement> {
        return new Promise<HTMLImageElement>(resolve => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = path;
        });
    }
}

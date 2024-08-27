import { Branch } from "../../data_structures/Tree";
import { DrawableGroup, PrimitiveDrawable } from "./drawables/drawable";
import { Updater } from "./Updater";

export type PrimitiveData<
    K extends string,
    T extends (string | number | boolean),
> = {
    id: K,
    value: T,
}

export type DataStore<K extends string> = {
    [id: string]: PrimitiveData<K, any>,
}

export type DataStoreAction =
    Edit<any, any>;

export enum DataStoreActionKind {
    Edit = 'Edit',
}

export type Edit<
    K extends string,
    T extends (string | number | boolean),
> = {
    kind: typeof DataStoreActionKind.Edit,
    primitive: PrimitiveData<K,T>,
}




export type Data =
    PrimitiveData<any, any> |
    CompositeData;

export type CompositeData = {
    [id: string]: Data,
}


export type Input =
    Tick;

export enum InputKind {
    Tick = 'Tick',
}

export type Tick = {
    kind: typeof InputKind.Tick,
    t: number,
    dt: number,
}

export type Output = Branch<DrawableGroup, PrimitiveDrawable>;

export type State = {
    updaters: Array<Updater>,
    // data?
    // data dependencies? and the functions?
    // scene?
}

export type DerivedData = {
    source: PrimitiveData<any, any>,
    f: (s: PrimitiveData<any, any>) => any,
}

// updaters update data.
// then we update more data based on dependencies... using... functions.
// then we're done, and we output the scene.
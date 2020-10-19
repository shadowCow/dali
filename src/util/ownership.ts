
export type RecursiveReadonly<T> = {
    [K in keyof T]: RecursiveReadonly<T[K]>
} & Readonly<T>;

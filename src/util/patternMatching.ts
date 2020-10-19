export function assertNever(x: never): never {
    throw new Error('Unexpected object: ' + x);
}

export type TaggedUnion<T extends string> = {
    tag: T,
}

export type Tags<
    U extends TaggedUnion<string>
> = U['tag'];

export type ReverseMappedUnion<
    T extends string,
    U extends TaggedUnion<T>
> = {
    [K in T]: U extends TaggedUnion<K> ? U : never
}

export type MatcherDict<
    T extends string,
    U extends TaggedUnion<T>,
    O
> = {
    [K in keyof ReverseMappedUnion<T,U>]: (
        u: ReverseMappedUnion<T,U>[K]
    ) => O;
}

export function matcher1<
    T extends string,
    U extends TaggedUnion<T>,
    O,
>(
    matcher: MatcherDict<T,U,O>,
): (u: U) => O {
    return match(matcher);
}

function match<
    T extends string,
    U extends TaggedUnion<T>,
    O
>(
    matcher: MatcherDict<T,U,O>,
): (u: U) => O {
    return (u) => matcher[u.tag](u as any);
}

export type MatcherDict2<
    T1 extends string,
    U1 extends TaggedUnion<T1>,
    T2 extends string,
    U2 extends TaggedUnion<T2>,
    O,
> = {
    [K1 in keyof ReverseMappedUnion<T1,U1>]: {
        [K2 in keyof ReverseMappedUnion<T2,U2>]: (
            u1: ReverseMappedUnion<T1,U1>[K1],
            u2: ReverseMappedUnion<T2,U2>[K2],
        ) => O;
    }
}

export function matcher2<
    T1 extends string,
    U1 extends TaggedUnion<T1>,
    T2 extends string,
    U2 extends TaggedUnion<T2>,
    O,
>(
    matcher2: MatcherDict2<
        T1,
        U1,
        T2,
        U2,
        O
    >,
): (u1: U1, u2: U2) => O {
    return match2(matcher2);
}

function match2<
    T1 extends string,
    U1 extends TaggedUnion<T1>,
    T2 extends string,
    U2 extends TaggedUnion<T2>,
    O,
>(
    matcher2: MatcherDict2<
        T1,
        U1,
        T2,
        U2,
        O
    >,
): (u1: U1, u2: U2) => O {
    return (u1, u2) => matcher2[u1.tag][u2.tag](
        u1 as any,
        u2 as any,
    );
}
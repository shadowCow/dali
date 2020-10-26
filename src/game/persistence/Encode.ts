export type Encoder<U,E> = (
    unencoded: U,
) => E;

export type Decoder<U,E> = (
    encoded: E,
) => U;
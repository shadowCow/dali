import { Color } from "./drawables/styles/Color";

export type Props = {
    [key: string]: Prop,
}

export type Prop =
    NumberProp |
    ColorProp |
    NestedProps;

export enum PropKind {
    NUMBER = 'NUMBER',
    COLOR = 'COLOR',
    NESTED = 'NESTED',
}

export type NumberProp = {
    kind: typeof PropKind.NUMBER,
    value: number,
}

export type ColorProp = {
    kind: typeof PropKind.COLOR,
    value: Color,
}

export type NestedProps = {
    kind: typeof PropKind.NESTED,
    value: Props,
}
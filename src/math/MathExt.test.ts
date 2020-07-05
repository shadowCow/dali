import * as MathExt from './MathExt';

describe('MathExt', () => {

    test.each([
        [MathExt.radians(0), 0],
        [MathExt.radians(0.5), .5],
        [MathExt.radians(1), 1],
        [MathExt.radians(1.5), .5],
        [MathExt.radians(2), 0],
    ])('sinZeroToOne(%d)', (a, expected) => {
        expect(MathExt.sinZeroToOne(a)).toBeCloseTo(expected);
    });

});
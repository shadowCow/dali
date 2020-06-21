import * as Interpolator from './Interpolator';

describe('Interpolator', () => {
    test('linear increase', () => {
        const currentValue = 1;
        const endValue = 2;
        const currentTimeMs = 1020;
        const dtMs = 20;
        const endTimeMs = 2000;
       
        expect(Interpolator.interpolateValue(
            Interpolator.linear(),
            currentValue,
            endValue,
            currentTimeMs,
            dtMs,
            endTimeMs,
        )).toEqual(
            1.02
        );
    });

    test('linear decrease', () => {
        const currentValue = 2;
        const endValue = 1;
        const currentTimeMs = 1020;
        const dtMs = 20;
        const endTimeMs = 2000;
       
        expect(Interpolator.interpolateValue(
            Interpolator.linear(),
            currentValue,
            endValue,
            currentTimeMs,
            dtMs,
            endTimeMs,
        )).toEqual(
            1.98
        );
    });
});
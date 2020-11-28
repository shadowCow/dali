import * as Motion from './motion';

describe('motion', () => {

    describe('oscillate', () => {

        test('0 to 1', () => {
            const oscillator = Motion.oscillator(0, 1, 1);
            const dt = 250;

            expect(oscillator(0)).toBeCloseTo(0);
            expect(oscillator(dt)).toBeCloseTo(.146);
            expect(oscillator(dt)).toBeCloseTo(0.5);
            expect(oscillator(dt)).toBeCloseTo(.854);
            expect(oscillator(dt)).toBeCloseTo(1);
            expect(oscillator(dt)).toBeCloseTo(.854);
            expect(oscillator(dt)).toBeCloseTo(0.5);
            expect(oscillator(dt)).toBeCloseTo(.146);
            expect(oscillator(dt)).toBeCloseTo(0);
        });
    });
    
});
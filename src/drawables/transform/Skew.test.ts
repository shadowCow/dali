import * as Skew from './Skew';

describe('skew', () => {
    test('create default', () => {
        expect(Skew.create()).toEqual({
            x: 0,
            y: 0,
        });
    });

    test('create with params', () => {
        expect(Skew.create(5, 3.5)).toEqual({
            x: 5,
            y: 3.5,
        });
    });

    test('set skew', () => {
        const skew = Skew.create(1,1);
        expect(Skew.transition(skew, Skew.setSkew(-2, 3))).toEqual({
            x: -2,
            y: 3,
        });
    });

    test('delta skew', () => {
        const skew = Skew.create(1,1);
        expect(Skew.transition(skew, Skew.deltaSkew(-2, 3))).toEqual({
            x: -1,
            y: 4,
        });
    });
});
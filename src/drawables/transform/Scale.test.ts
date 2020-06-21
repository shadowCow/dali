import * as Scale from './Scale';

describe('scale', () => {
    test('create default', () => {
        expect(Scale.create()).toEqual({
            x: 1,
            y: 1,
        });
    });

    test('create with params', () => {
        expect(Scale.create(2.3, 5)).toEqual({
            x: 2.3,
            y: 5,
        });
    });

    test('set', () => {
        const scale = Scale.create();
        expect(Scale.transition(scale, Scale.setScale(3.1, 0.5))).toEqual({
            x: 3.1,
            y: 0.5,
        });
    });

    test('delta', () => {
        const scale = Scale.create();
        expect(Scale.transition(scale, Scale.deltaScale(.1, -.3))).toEqual({
            x: 1.1,
            y: 0.7,
        });
    });
});
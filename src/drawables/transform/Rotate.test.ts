import * as Rotate from './Rotate';

describe('rotate', () => {
    test('create default', () => {
        expect(Rotate.create()).toEqual({
            a: 0,
            x: 0,
            y: 0,
        });
    });

    test('create with params', () => {
        expect(Rotate.create(30, 4, 10.5)).toEqual({
            a: 30,
            x: 4,
            y: 10.5,
        });
    });

    test('set rotation', () => {
        const rotate = Rotate.create(1,1,1);
        expect(Rotate.transition(rotate, Rotate.setRotation(-2.4, 5, -3.1))).toEqual({
            a: -2.4,
            x: 5,
            y: -3.1,
        });
    });

    test('delta rotation', () => {
        const rotate = Rotate.create(1,1,1);
        expect(Rotate.transition(rotate, Rotate.deltaRotation(2, -1, 5.2))).toEqual({
            a: 3,
            x: 0,
            y: 6.2,
        });
    });
});
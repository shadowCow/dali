import * as Translate from './Translate';

describe('translate', () => {
    test('create default', () => {
        expect(Translate.create()).toEqual({
            x: 0,
            y: 0,
        });
    });

    test('create with params', () => {
        expect(Translate.create(-1.5, 3.6)).toEqual({
            x: -1.5,
            y: 3.6,
        });
    });

    test('set translate', () => {
        const translate = Translate.create(1,1);
        expect(Translate.transition(translate, Translate.setTranslation(-2, 3))).toEqual({
            x: -2,
            y: 3,
        });
    });

    test('delta translate', () => {
        const translate = Translate.create(1,1);
        expect(Translate.transition(translate, Translate.deltaTranslation(-2, 3))).toEqual({
            x: -1,
            y: 4,
        });
    });
});
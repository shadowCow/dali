import * as Translate from './Translate';
import * as Rotate from './Rotate';
import * as Scale from './Scale';
import * as Skew from './Skew';
import * as Transform from './Transform';

describe('transform', () => {
    test('create default', () => {
        expect(Transform.create()).toEqual({
            translate: Translate.create(),
            rotate: Rotate.create(),
            scale: Scale.create(),
            skew: Skew.create(),
        });
    });

    test('create with params', () => {
        expect(Transform.create({
            translate: Translate.create(1,1),
            rotate: Rotate.create(2,2,2),
            scale: Scale.create(3,3),
            skew: Skew.create(4,4),
        })).toEqual({
            translate: Translate.create(1,1),
            rotate: Rotate.create(2,2,2),
            scale: Scale.create(3,3),
            skew: Skew.create(4,4),
        });
    });
});
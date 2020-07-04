import * as SceneLayer from './SceneLayer';
import { primitiveDrawable, StaticDrawable } from '../drawables/drawable';
import { rect } from '../drawables/primitives/primitiveShapes';

describe('SceneLayer', () => {

    test('create', () => {
        expect(SceneLayer.staticLayer('a')).toEqual({
            id: 'a',
            drawables: {},
            drawOrder: [],
        });
    });

    test('AddDrawable', () => {
        const layer = SceneLayer.staticLayer('a');
        const drawable = primitiveDrawable(
            '1',
            rect(0, 0, 10, 15),
        );

        expect(SceneLayer.transition(layer, SceneLayer.addDrawable(
            drawable,
        ))).toEqual({
            id: 'a',
            drawables: {
                '1': drawable,
            },
            drawOrder: ['1'],
        });
    });

    test('RemoveDrawable', () => {
        const drawable = primitiveDrawable(
            '1',
            rect(0, 0, 10, 15),
        );
        const layer: SceneLayer.State<StaticDrawable> = {
            id: 'a',
            drawables: {
                '1': drawable,
            },
            drawOrder: ['1'],
        };

        expect(SceneLayer.transition(
            layer,
            SceneLayer.removeDrawable('1')
        )).toEqual(SceneLayer.staticLayer('a'));
    });

    test('UpdateDrawable', () => {
        const drawable = primitiveDrawable(
            '1',
            rect(0, 0, 10, 15),
        );
        const layer: SceneLayer.State<StaticDrawable> = {
            id: 'a',
            drawables: {
                '1': drawable,
            },
            drawOrder: ['1'],
        };

        const updatedDrawable = primitiveDrawable(
            '1',
            rect(5, 7, 21, 38),
        );

        expect(SceneLayer.transition(
            layer,
            SceneLayer.updateDrawable(updatedDrawable),
        )).toEqual({
            id: 'a',
            drawables: {
                '1': updatedDrawable,
            },
            drawOrder: ['1'],
        });
    });
});

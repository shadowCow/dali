import { createTransform, reset, setPosition, setScale, setRotation } from "./Transform";
import { vec3 } from "../../../../math/Vec";

describe('transform', () => {
    test('create default', () => {
        expect(createTransform())
            .toEqual({
                position: {x: 0, y: 0, z: 0},
                scale: {x: 0, y: 0, z: 0},
                rotation: {x: 0, y: 0, z: 0},
            });
    });

    test('create with params', () => {
        expect(createTransform({
            translation: {x: 2, y: 3, z: 4},
            scale: {x: 5, y: 6, z: 7},
            rotation: {x: 8, y: 9, z: 10},
        })).toEqual({
            position: {x: 2, y: 3, z: 4},
            scale: {x: 5, y: 6, z: 7},
            rotation: {x: 8, y: 9, z: 10},
        });
    });

    test('reset', () => {
        const t = createTransform({
            translation: {x: 2, y: 3, z: 4},
            scale: {x: 5, y: 6, z: 7},
            rotation: {x: 8, y: 9, z: 10},
        });

        reset(t);

        expect(t).toEqual(createTransform());
    });

    test('setPosition', () => {
        const t = createTransform();

        setPosition(
            t,
            vec3(1,2,3),
        );

        expect(t).toEqual(createTransform({
            translation: vec3(1,2,3),
        }));
    });

    test('setScale', () => {
        const t = createTransform();

        setScale(
            t,
            vec3(4,5,6),
        );

        expect(t).toEqual(createTransform({
            scale: vec3(4,5,6),
        }));
    });

    test('setRotation', () => {
        const t = createTransform();

        setRotation(
            t,
            vec3(7,8,9),
        );

        expect(t).toEqual(createTransform({
            rotation: vec3(7,8,9),
        }));
    });
});
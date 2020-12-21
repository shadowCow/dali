import { vec2, rotated } from "./Vec2";

describe('Vec2', () => {

    test('rotated', () => {
        const v = vec2(1, 0);
        const result = rotated(v, Math.PI / 2);

        expect(result.x).toBeCloseTo(0);
        expect(result.y).toBeCloseTo(-1);
    });
});
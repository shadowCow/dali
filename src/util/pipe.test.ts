import { pipe, through } from './pipe';

describe('pipe', () => {
    test('works', () => {
        const result = pipe(5, through(
            n => n + 2,
            n => n * 3,
            n => n - 1,
        ));

        expect(result).toEqual(20);
    });
});
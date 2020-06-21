import { pipe } from './pipe';

describe('pipe', () => {
    test('works', () => {
        const pipeline = pipe<number>(
            n => n + 2,
            n => n * 3,
            n => n - 1,
        );

        const result = pipeline(5);
        
        expect(result).toEqual(20);
    });
});
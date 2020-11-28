import * as Duration from './Duration';

describe('Duration', () => {
    test('createSingle', () => {
        expect(Duration.createSingle(1, 2)).toEqual({
            kind: Duration.DurationTypes.SINGLE,
            startMs: 1,
            endMs: 2,
        });
    });

    test('createCyclic', () => {
        expect(Duration.createCyclic(1,2,3)).toEqual({
            kind: Duration.DurationTypes.CYCLIC,
            startMs: 1,
            cycleDurationMs: 2,
            numCycles: 3,
        });
    });
});
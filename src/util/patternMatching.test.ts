import { MatcherDict, Tags, matcher1, MatcherDict2, matcher2 } from "./patternMatching";

describe('patternMatching', () => {

    test('matcher1', () => {

        const md: MatcherDict<Tags<A | B>, A | B, number> = {
            a: (_a: A) => 1,
            b: (_b: B) => 2,
        };
        const match = matcher1(md);

        expect(match({tag: 'a'})).toEqual(1);
        expect(match({tag: 'b'})).toEqual(2);
    });

    test('matcher2', () => {
        const md: MatcherDict2<
            Tags<A | B>,
            A | B,
            Tags<C | D>,
            C | D,
            number
        > = {
            a: {
                c: (u1, u2) => 13,
                d: (u1, u2) => 14,
            },
            b: {
                c: (u1, u2) => 23,
                d: (u1, u2) => 24,
            },
        };
        const match = matcher2(md);

        expect(match({tag:'a'}, {tag:'c'})).toEqual(13);
        expect(match({tag:'a'}, {tag:'d'})).toEqual(14);
        expect(match({tag:'b'}, {tag:'c'})).toEqual(23);
        expect(match({tag:'b'}, {tag:'d'})).toEqual(24);
    });
});

type A = { tag: 'a' }
type B = { tag: 'b' }

type C = { tag: 'c' }
type D = { tag: 'd' }

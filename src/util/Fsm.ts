import { TaggedUnion, MatcherDict2, Tags, matcher2 } from "./patternMatching";

export namespace Fsm {
    export type Container<
        S extends TaggedUnion<string>,
        A extends TaggedUnion<string>
    > = {
        getState(): S,
        transition: (a: A) => void,
    }

    export function create<
        S extends TaggedUnion<string>,
        A extends TaggedUnion<string>
    >(
        createInitialState: () => S,
        f: (s: S, a: A) => void,
    ): Container<S,A> {
        let s = createInitialState();

        let transition: (a: A) => void = (a) => {
            f(s, a);
        };

        return {
            getState: () => s,
            transition,
        };
    }
}
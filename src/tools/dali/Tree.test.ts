import { Branch, makeDepthFirstIterator, branch, leaf, TreeNode } from "./Tree";

describe('Tree', () => {

    test('iterate depth first', () => {
        const L_1 = leaf(1);
        const b_1_1 = branch([
            L_1,
        ], '1_1');
        const L_2 = leaf(2);

        const root: Branch<string, number> = branch([
            b_1_1,
            L_2,
        ], '1');

        const nodes = makeDepthFirstIterator(
            root,
        );

        const log: Array<TreeNode<string, number>> = [...nodes];

        expect(log).toEqual([
            root,
            b_1_1,
            L_1,
            L_2,
        ]);
    });
});

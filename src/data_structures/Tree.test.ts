import { Branch, makeDepthFirstIterator, branch, leaf, TreeNode, WithId } from "./Tree";

describe('Tree', () => {

    test('iterate depth first', () => {
        const L_1 = leaf({id: 'L_1'});
        const b_1_1 = branch([
            L_1,
        ], {id: 'b_1_1'});
        const L_2 = leaf({id: 'L_2'});

        const root: Branch<WithId, WithId> = branch([
            b_1_1,
            L_2,
        ], {id: 'root'});

        const nodes = makeDepthFirstIterator(
            root,
        );

        const log: Array<TreeNode<WithId, WithId>> = [...nodes];

        expect(log).toEqual([
            root,
            b_1_1,
            L_1,
            L_2,
        ]);
    });
});

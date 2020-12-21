import { assertNever } from "../util/patternMatching";

export type Tree<B extends WithId, L extends WithId> = {
    root: Branch<B,L>,
    idPathMap: { [id: string]: Array<number> }
}

export function tree<B extends WithId, L extends WithId>(
    root: Branch<B,L>
): Tree<B,L> {
    const idPathMap = {};
    // TODO - populate ye olde map

    return {
        root,
        idPathMap,
    };
}


export type TreeNode<B extends WithId, L extends WithId> =
    Branch<B,L> |
    Leaf<L>;

export type WithId = {
    id: string,
}

export enum TreeNodeKind {
    BRANCH = 'BRANCH',
    LEAF = 'LEAF',
}

export type Branch<B extends WithId, L extends WithId> = {
    kind: typeof TreeNodeKind.BRANCH,
    children: Array<TreeNode<B,L>>,
    content: B,
}

export function branch<B extends WithId, L extends WithId>(
    children: Array<TreeNode<B,L>>,
    content: B,
): Branch<B,L> {
    return {
        kind: TreeNodeKind.BRANCH,
        children,
        content,
    };
}

export type Leaf<L extends WithId> = {
    kind: typeof TreeNodeKind.LEAF,
    content: L,
}

export function leaf<L extends WithId>(
    content: L,
): Leaf<L> {
    return {
        kind: TreeNodeKind.LEAF,
        content,
    };
}

export function traverseDepthFirst<B extends WithId, L extends WithId>(
    root: Branch<B,L>,
    onBranch: (b: Branch<B,L>) => void,
    onLeaf: (l: Leaf<L>) => void,
): void {
    const nodes = makeDepthFirstIterator(
        root,
    );

    for (let node of nodes) {
        switch (node.kind) {
            case TreeNodeKind.BRANCH:
                onBranch(node);
                break;
            case TreeNodeKind.LEAF:
                onLeaf(node);
                break;
            default:
                assertNever(node);
        }
    }
}

function last<T>(
    arr: Array<T>,
): T {
    return arr[arr.length - 1];
}

type TraversalTracker<B extends WithId, L extends WithId> = {
    node: Branch<B,L>,
    currentChild: number,
}

export function* makeDepthFirstIterator<B extends WithId, L extends WithId>(
    root: Branch<B,L>,
) {
    const visitStack: Array<TraversalTracker<B,L>> = [];

    yield root;
    visitStack.push({
        node: root,
        currentChild: 0,
    });

    while (visitStack.length) {
        const traversal = last(visitStack);
        if (isNodeTraversalFinished(traversal)) {
            onNodeTraversalFinished(visitStack);
        } else {
            const child = traversal.node.children[traversal.currentChild];
            yield child;

            if (child.kind === TreeNodeKind.LEAF) {
                traversal.currentChild += 1;
            } else {
                visitStack.push({
                    node: child,
                    currentChild: 0,
                });
            }
        }
    }
}

function isNodeTraversalFinished(
    traversal: TraversalTracker<any,any>,
): boolean {
    return traversal.currentChild >= traversal.node.children.length;
}

function onNodeTraversalFinished(
    visitStack: Array<TraversalTracker<any,any>>,
): void {
    visitStack.pop();
    if (visitStack.length) {
        last(visitStack).currentChild += 1;
    }
}

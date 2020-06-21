export function pipe<T>(
    ...ops: PipelineOp<T>[]
): (t: T) => T {
    return (t: T) => {
        return ops.reduce(
            (acc, op) => op(acc),
            t
        );
    };
}

export type PipelineOp<T> = (t: T) => T;

export function pipe<T>(
    value: T,
    through: PipelineOp<T>,
): T {
    return through(value);
}

export function through<T>(
    ...ops: PipelineOp<T>[]
): PipelineOp<T> {
    return (t: T) => {
        return ops.reduce(
            (acc, op) => op(acc),
            t
        );
    };
}

export type PipelineOp<T> = (t: T) => T;

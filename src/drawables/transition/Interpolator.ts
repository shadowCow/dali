import { assertNever } from '../../util/patternMatching';
import { RecursivePartial } from './Transition';

export enum InterpolatorTypes {
    LINEAR = 'LINEAR',
    QUADRATIC = 'QUADRATIC',
}

export type Interpolator =
    Linear |
    Quadratic;

export type Linear = {
    kind: typeof InterpolatorTypes.LINEAR,
}

export function linear(): Linear {
    return { kind: InterpolatorTypes.LINEAR };
}

export type Quadratic = {
    kind: typeof InterpolatorTypes.QUADRATIC,
}

export function quadratic(): Quadratic {
    return { kind: InterpolatorTypes.QUADRATIC };
}

export function interpolateValue(
    state: Interpolator,
    currentValue: number,
    endValue: number,
    currentTimeMs: number,
    dtMs: number,
    endTimeMs: number,
): number {
    switch (state.kind) {
        case InterpolatorTypes.LINEAR:
            return interpolateValueLinear(
                currentValue,
                endValue,
                currentTimeMs,
                dtMs,
                endTimeMs,
            );
        case InterpolatorTypes.QUADRATIC:
            return interpolateValueQuadratic(
                currentValue,
                endValue,
                currentTimeMs,
                dtMs,
                endTimeMs,
            );
        default:
            assertNever(state);
    }
}

function interpolateValueLinear(
    currentValue: number,
    endValue: number,
    currentTimeMs: number,
    dtMs: number,
    endTimeMs: number,
): number {
    const previousTimeMs = currentTimeMs - dtMs;
    const stepFraction = dtMs / (endTimeMs - previousTimeMs);

    const valueRange = Math.abs(endValue - currentValue);
    const valueStepSize = stepFraction * valueRange;

    return computeTargetValue(currentValue, valueStepSize, endValue);
}

function interpolateValueQuadratic(
    currentValue: number,
    endValue: number,
    currentTimeMs: number,
    dtMs: number,
    endTimeMs: number,
): number {
    throw new Error('not implemented');
}

export function interpolateValues<T extends any>(
    interpolator: Interpolator,
    current: T,
    end: RecursivePartial<T>,
    currentTimeMs: number,
    dtMs: number,
    endTimeMs: number,
): void {
    switch (interpolator.kind) {
        case InterpolatorTypes.LINEAR:
            return interpolateValuesLinear(
                current,
                end,
                currentTimeMs,
                dtMs,
                endTimeMs,
            );
        case InterpolatorTypes.QUADRATIC:
            return interpolateValuesQuadratic(
                current,
                end,
                currentTimeMs,
                dtMs,
                endTimeMs,
            );
        default:
            assertNever(interpolator);
    }
}

function interpolateValuesLinear<T extends any>(
    current: T,
    end: RecursivePartial<T>,
    currentTimeMs: number,
    dtMs: number,
    endTimeMs: number,
): void {
    const previousTimeMs = currentTimeMs - dtMs;
    const stepFraction = dtMs / (endTimeMs - previousTimeMs);

    updateValuesLinear(
        current,
        end,
        stepFraction,
    );
}

function updateValuesLinear<T extends any>(
    current: T,
    end: RecursivePartial<T>,
    stepFraction: number,
): void {
    Object.entries(end).forEach(([key, value]) => {
        if (key && typeof value === 'number') {
            const valueRange = Math.abs(value - current[key]);
            const valueStepSize = stepFraction * valueRange;
            
            const targetValue = computeTargetValue(
                current[key],
                valueStepSize,
                value
            );

            current[key] = targetValue;
        } else if (key && typeof value === 'object') {
            updateValuesLinear(current[key], value, stepFraction);
        }
    });
}

function interpolateValuesQuadratic<T extends any>(
    current: T,
    end: RecursivePartial<T>,
    currentTimeMs: number,
    dtMs: number,
    endTimeMs: number,
): void {
    throw new Error('not implemented');
}

function computeTargetValue(
    currentValue: number,
    valueStepSize: number,
    endValue: number,
): number {
    if (endValue > currentValue) {
        return Math.min(
            endValue,
            currentValue + valueStepSize,
        );
    } else if (endValue < currentValue) {
        return Math.max(
            endValue,
            currentValue - valueStepSize,
        );
    } else {
        return endValue;
    }
}

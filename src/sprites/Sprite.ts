import { Texture } from "./Texture";
import { Fsm } from "../util/Fsm";
import { MatcherDict2, matcher2, Tags } from "../util/patternMatching";

export namespace Sprite {
    
    export enum StateTag {
        STATIC = 'STATIC',
        ANIMATED = 'ANIMATED',
    }

    export type State =
        Static |
        Animated;

    export type CommonState = {
        id: string,
        cx: number,
        cy: number,
        texture: Texture.State,
    }

    export type Static = {
        tag: typeof StateTag.STATIC,
    } & CommonState;

    export function createStatic(
        id: string,
        cx: number,
        cy: number,
        texture: Texture.State,
    ): Static {
        return {
            tag: StateTag.STATIC,
            id,
            cx,
            cy,
            texture,
        };
    }

    export type Animated = {
        tag: typeof StateTag.ANIMATED,
        frames: Texture.State[],
        frameIntervalMs: number,
        cyclePositionMs: number,
    } & CommonState;

    export function createAnimated(
        id: string,
        cx: number,
        cy: number,
        texture: Texture.State,
        frames: Texture.State[],
        frameIntervalMs: number,
        cyclePositionMs: number,
    ): Animated {
        return {
            tag: StateTag.ANIMATED,
            id,
            cx,
            cy,
            texture,
            frames,
            frameIntervalMs,
            cyclePositionMs,
        };
    }

    export enum ActionTag {
        TICK = 'TICK',
        SET_POSITION = 'SET_POSITION',
    }

    export type Action =
        Tick |
        SetPosition;

    export type Tick = {
        tag: typeof ActionTag.TICK,
        dtMs: number,
    }

    export function tick(
        dtMs: number,
    ): Tick {
        return {
            tag: ActionTag.TICK,
            dtMs,
        };
    }

    export type SetPosition = {
        tag: typeof ActionTag.SET_POSITION,
        cx: number,
        cy: number,
    }

    export function setPosition(
        cx: number,
        cy: number,
    ): SetPosition {
        return {
            tag: ActionTag.SET_POSITION,
            cx,
            cy,
        };
    }

    export type AnimatedFsm =
        Fsm.Container<Animated,Action>;

    export const transition = matcher2<
        Tags<Animated>,
        Animated,
        Tags<Action>,
        Action,
        void
    >({
        [StateTag.ANIMATED]: {
            [ActionTag.TICK]: (s, a) => {
                s.cyclePositionMs =
                    (s.cyclePositionMs + a.dtMs) %
                    (s.frameIntervalMs * s.frames.length);

                const frameIndex = Math.floor(
                    s.cyclePositionMs / s.frameIntervalMs
                );
                s.texture = s.frames[frameIndex];
            },
            [ActionTag.SET_POSITION]: (s, a) => {
                s.cx = a.cx;
                s.cy = a.cy;
            },
        },
    });

    export namespace Container {
        export enum StateTag {
            CONTAINER = 'CONTAINER',
        }

        export type State = {
            tag: typeof StateTag.CONTAINER,
            children: Sprite.State[],
        }

        export function create(): State {
            return {
                tag: StateTag.CONTAINER,
                children: [],
            };
        }

        export function addChild(
            container: Container.State,
            sprite: Sprite.State,
        ): void {
            container.children.push(sprite);
        }

        export function removeChild(
            container: Container.State,
            sprite: Sprite.State,
        ): void {
            container.children.push(sprite);
        }
    }

}

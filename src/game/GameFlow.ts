
import { assertNever } from "../util/patternMatching";

export namespace GameFlow {

    export async function create(params: Params): Promise<void> {
        const mainMenu = await params.introRunner();
        
        // loop through current phases until we exit
        let phase: Phase = mainMenu;
        while (phase.tag !== PhaseTag.EXIT) {
            phase = await runPhase(phase, params);
        }
    }

    async function runPhase(
        phase: NonTerminalPhase,
        params: Params,
    ): Promise<Phase> {
        switch (phase.tag) {
            case PhaseTag.INTRO:
                return params.introRunner();
            case PhaseTag.MAIN_MENU:
                return params.mainMenuRunner();
            case PhaseTag.PRE_SCENE:
                return params.preSceneRunner();
            case PhaseTag.SCENE:
                return params.sceneRunner();
            case PhaseTag.PAUSE_MENU:
                return params.pauseMenuRunner();
            case PhaseTag.POST_SCENE:
                return params.postSceneRunner();
            case PhaseTag.END_CREDITS:
                return params.endCreditsRunner();
            default: assertNever(phase);
        }
    }

    export type Params = {
        introRunner: () => Promise<MainMenu>,
        mainMenuRunner: () => Promise<PreScene | Exit>,
        preSceneRunner: () => Promise<Scene>,
        sceneRunner: () => Promise<PauseMenu | PostScene>,
        pauseMenuRunner: () => Promise<Scene | MainMenu>,
        postSceneRunner: () => Promise<MainMenu | PreScene | EndCredits>,
        endCreditsRunner: () => Promise<MainMenu>,
    }
    export function createParams(
        p: Partial<Params>,
    ): Params {
        const defaultParams: Params = {
            introRunner: () => Promise.resolve(mainMenu()),
            mainMenuRunner: () => Promise.resolve(preScene()),
            preSceneRunner: () => Promise.resolve(scene()),
            sceneRunner: () => Promise.resolve(postScene()),
            pauseMenuRunner: () => Promise.resolve(scene()),
            postSceneRunner: () => Promise.resolve(mainMenu()),
            endCreditsRunner: () => Promise.resolve(mainMenu()),
        };

        return {
            ...defaultParams,
            ...p,
        };
    }

    export type State = {
        phase: Phase,
    }

    export enum PhaseTag {
        INTRO = 'INTRO',
        MAIN_MENU = 'MAIN_MENU',
        PRE_SCENE = 'PRE_SCENE',
        SCENE = 'SCENE',
        PAUSE_MENU = 'PAUSE_MENU',
        POST_SCENE = 'POST_SCENE',
        END_CREDITS = 'END_CREDITS',
        EXIT = 'EXIT',
    }

    export type Phase =
        TerminalPhase |
        NonTerminalPhase;

    export type TerminalPhase = Exit;
    export type NonTerminalPhase =
        Intro |
        MainMenu |
        PreScene |
        Scene |
        PauseMenu |
        PostScene |
        EndCredits;

    export type Intro = {
        tag: typeof PhaseTag.INTRO,
    }
    export function intro(): Intro {
        return {
            tag: PhaseTag.INTRO,
        };
    }

    export type MainMenu = {
        tag: typeof PhaseTag.MAIN_MENU,
    }
    export function mainMenu(): MainMenu {
        return {
            tag: PhaseTag.MAIN_MENU,
        };
    }

    export type PreScene = {
        tag: typeof PhaseTag.PRE_SCENE,
    }
    export function preScene(): PreScene {
        return {
            tag: PhaseTag.PRE_SCENE,
        };
    }

    export type Scene = {
        tag: typeof PhaseTag.SCENE,
    }
    export function scene(): Scene {
        return {
            tag: PhaseTag.SCENE,
        };
    }

    export type PauseMenu = {
        tag: typeof PhaseTag.PAUSE_MENU,
    }
    export function pauseMenu(): PauseMenu {
        return {
            tag: PhaseTag.PAUSE_MENU,
        };
    }

    export type PostScene = {
        tag: typeof PhaseTag.POST_SCENE,
    }
    export function postScene(): PostScene {
        return {
            tag: PhaseTag.POST_SCENE,
        };
    }

    export type EndCredits = {
        tag: typeof PhaseTag.END_CREDITS,
    }
    export function endCredits(): EndCredits {
        return {
            tag: PhaseTag.END_CREDITS,
        };
    }

    export type Exit = {
        tag: typeof PhaseTag.EXIT,
    }
    export function exit(): Exit {
        return {
            tag: PhaseTag.EXIT,
        };
    }

}
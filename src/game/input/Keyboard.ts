

export type KeyboardControllerMap =
    GameStateControllerMap &
    AxesControllerMap &
    ActionControllerMap;

export type GameStateControllerMap = {
    pause: number,
}
export type AxesControllerMap = {
    horizontalAxisPlus: number,
    horizontalAxisMinus: number,
    verticalAxisPlus: number,
    verticalAxisMinus: number,
}
export type ActionControllerMap = {
    action1: number,
    action2: number,
    action3: number,
    action4: number,
    action5: number,
    action6: number,
}

export function createKeyboardControllerMap(): KeyboardControllerMap {
    return {
        pause: 27,
        horizontalAxisPlus: 68,
        horizontalAxisMinus: 65,
        verticalAxisPlus: 83,
        verticalAxisMinus: 87,
        action1: 49,
        action2: 50,
        action3: 51,
        action4: 52,
        action5: 53,
        action6: 54,
    };
}

export type ButtonController<T extends { [k: string]: number }> = {
    [K in keyof T]: boolean; // isDown
}

export type KeyboardController = ButtonController<KeyboardControllerMap>;
export type GameStateController = ButtonController<GameStateControllerMap>;
export type AxesController = ButtonController<AxesControllerMap>;
export type ActionController = ButtonController<ActionControllerMap>;

export function createKeyboardController(): KeyboardController {
    return {
        pause: false,
        horizontalAxisPlus: false,
        horizontalAxisMinus: false,
        verticalAxisPlus: false,
        verticalAxisMinus: false,
        action1: false,
        action2: false,
        action3: false,
        action4: false,
        action5: false,
        action6: false,
    };
}

type KeyToButton<T extends {[k: string]: number}> = {
    [keyCode: number]: keyof T,
}

export type ButtonMap = {
    [button: string]: number, // keycode
}

export function createKeyboard(
    keyboardControllerMap: KeyboardControllerMap,
    document: Document,
): KeyboardController {

    const keyboardController: KeyboardController =
        createKeyboardController();
    const keyToButton: KeyToButton<KeyboardControllerMap> = {};

    keyToButton[keyboardControllerMap.pause] = 'pause';
    keyToButton[keyboardControllerMap.horizontalAxisPlus] = 'horizontalAxisPlus';
    keyToButton[keyboardControllerMap.horizontalAxisMinus] = 'horizontalAxisMinus';
    keyToButton[keyboardControllerMap.verticalAxisPlus] = 'verticalAxisPlus';
    keyToButton[keyboardControllerMap.verticalAxisMinus] = 'verticalAxisMinus';
    keyToButton[keyboardControllerMap.action1] = 'action1';
    keyToButton[keyboardControllerMap.action2] = 'action2';
    keyToButton[keyboardControllerMap.action3] = 'action3';
    keyToButton[keyboardControllerMap.action4] = 'action4';
    keyToButton[keyboardControllerMap.action5] = 'action5';
    keyToButton[keyboardControllerMap.action6] = 'action6';

    document.addEventListener('keydown', (event) => {
        const buttonName = keyToButton[event.keyCode];
        console.log('keydown', event.keyCode, buttonName);
        if (typeof buttonName !== 'undefined') {
            keyboardController[buttonName] = true;
        }
        console.log('keys', keyboardController);
        event.preventDefault();
    });

    document.addEventListener('keyup', (event) => {
        const buttonName = keyToButton[event.keyCode];
        if (typeof buttonName !== 'undefined') {
            keyboardController[buttonName] = false;
        }
        event.preventDefault();
    });

    return keyboardController;
}

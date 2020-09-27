
type KeyToButton = {
    [keyCode: number]: string,
}

export type ButtonMap = {
    [button: string]: number, // keycode
}

export type Buttons = {
    [button: string]: boolean, // isDown
}

export function createKeyboard<B extends string>(
    buttonMap: ButtonMap,
    document: Document,
): Buttons {

    const buttons: Buttons = {};
    const keyToButton: KeyToButton = {};
    for (let b in buttonMap) {
        keyToButton[buttonMap[b]] = b;
        buttons[b] = false;
    }

    document.addEventListener('keydown', (event) => {
        const buttonName = keyToButton[event.keyCode];
        if (typeof buttonName !== 'undefined') {
            buttons[buttonName] = true;
        }
        event.preventDefault();
    });

    document.addEventListener('keyup', (event) => {
        const buttonName = keyToButton[event.keyCode];
        if (typeof buttonName !== 'undefined') {
            buttons[buttonName] = false;
        }
        event.preventDefault();
    });

    return buttons;
}

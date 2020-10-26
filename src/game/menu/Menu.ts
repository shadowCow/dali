
export namespace PauseMenu {
    const pauseMenuId = "pause-menu";

    export function create(
        document: Document,
        pauseStateContainer: { isPaused: boolean },
    ): Controller {
        const pauseMenuEl = document.createElement("div");
        pauseMenuEl.setAttribute('id', pauseMenuId);
        pauseMenuEl.style.zIndex = '1000';
        pauseMenuEl.style.position = 'fixed';
        pauseMenuEl.style.left = '0';
        pauseMenuEl.style.top = '0';
        pauseMenuEl.style.height = '100%';
        pauseMenuEl.style.width = '100%';
        pauseMenuEl.style.opacity = '0.7';
        pauseMenuEl.style.backgroundColor = 'black';
        pauseMenuEl.style.visibility = 'hidden';
        const show = () => pauseMenuEl.style.visibility = 'visible';
        const hide = () => pauseMenuEl.style.visibility = 'hidden';
        const isShowing = () => pauseMenuEl.style.visibility === 'visible';

        const resumeButtonEl = document.createElement("button");
        const resumeText = document.createTextNode("Resume");
        resumeButtonEl.appendChild(resumeText);
        resumeButtonEl.addEventListener('click', () => {
            hide();
            pauseStateContainer.isPaused = false;
        });

        pauseMenuEl.appendChild(resumeButtonEl);

        document.body.appendChild(pauseMenuEl);

        return {
            show, 
            hide,
            isShowing,
        };
    }
    
    export type Controller = {
        show(): void,
        hide(): void,
        isShowing: () => boolean,
    }
}
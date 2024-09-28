declare module '../scene/main.js' {

    // The return type of createScene
    interface SceneController {
        start: () => void;
        stop: () => void;
        updateSize: (width: number, height: number) => void;
    }

    // Declare the createScene function
    export function createScene(): SceneController;
}
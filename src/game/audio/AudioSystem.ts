export namespace Audio {
    // probably want something like 4ish separate channels to mix...
    // 1. music
    // 2. ambient
    // 3. localized ambient
    // 4. sfx
    // 5. localized sfx

    export type Clip = {
        id: string,
        buffer: AudioBuffer,
    }

    export function playTrack(
        audioBuffer: AudioBuffer,
        audioCtx: AudioContext,
    ) {
        const trackSource = audioCtx.createBufferSource();
        trackSource.buffer = audioBuffer;
        trackSource.connect(audioCtx.destination);

        trackSource.start();

        return trackSource;
    }
}

export namespace AudioLoader {
    export async function load(
        audioCtx: AudioContext,
        id: string,
        path: string,
    ): Promise<Audio.Clip> {
        const response = await fetch(path);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        
        return {
            id,
            buffer: audioBuffer,
        };
    }
}

// async function getFile(filepath) {
//     const response = await fetch(filepath);
//     const arrayBuffer = await response.arrayBuffer();
//     const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
//     return audioBuffer;
// }
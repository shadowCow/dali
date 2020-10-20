import { Sprite } from "./Sprite";
import { Fsm } from "../../util/Fsm";

describe('Sprite', () => {

    test('animated', async () => {
        const img1 = await createImageBitmap({
            data: new Uint8ClampedArray([
                0, 0, 0, 255,
                255, 0, 0, 255,
                0, 255, 0, 255,
                0, 0, 255, 255,
            ]),
            height: 2,
            width: 2,
        });
        const img2 = await createImageBitmap({
            data: new Uint8ClampedArray([
                0, 0, 255, 255,
                0, 255, 0, 255,
                255, 0, 0, 255,
                0, 0, 0, 255,
            ]),
            height: 2,
            width: 2,
        });

        const t1 = { id: 't1', image: img1 };
        const t2 = { id: 't2', image: img2 };

        
        const createSprite = () => Sprite.createAnimated(
            'a',
            0,
            0,
            [t1, t2],
            500,
        );

        const fsm = Fsm.create(
            createSprite,
            Sprite.transition,
        );

        fsm.transition(Sprite.setPosition(5, 10));
        expect(fsm.getState().cx).toEqual(5);
        expect(fsm.getState().cy).toEqual(10);

        fsm.transition(Sprite.tick(300));
        expect(fsm.getState().texture).toEqual(t1);
        expect(fsm.getState().cyclePositionMs).toEqual(300);

        fsm.transition(Sprite.tick(300));
        expect(fsm.getState().texture).toEqual(t2);
        expect(fsm.getState().cyclePositionMs).toEqual(600);

        fsm.transition(Sprite.tick(500));
        expect(fsm.getState().texture).toEqual(t1);
        expect(fsm.getState().cyclePositionMs).toEqual(100);
    });
});
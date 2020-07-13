import { primitiveDrawable, Drawable, DrawableTypes, at, withStyles, animatedDrawable, createAnimation, StaticDrawable } from '../../drawables/drawable';
import { ellipse, rect, line, polygon, path, lineTo, bezierCurveTo, text, Rect, equilateralPolygon, PrimitiveTypes, EllipseParams, RectParams } from '../../drawables/primitives/primitiveShapes';
import { strokeAndFill, stroke, fill, Fill } from '../../drawables/styles/Styles';
import { eyePair, eyePairParams } from '../../drawables/composites/eye';
import { waves, wavesParams } from '../../drawables/composites/wave';
import * as Duration from '../../drawables/transition/Duration';
import * as Interpolator from '../../drawables/transition/Interpolator';
import * as Transform from '../../drawables/transform/Transform';
import * as Rotate from '../../drawables/transform/Rotate';
import * as Translate from '../../drawables/transform/Translate';
import { Colors } from '../../drawables/styles/Color';
import { ImageCache } from '../../drawables/ImageCache';
import { through, pipe } from '../../util/pipe';
import * as Scene from '../../scene/Scene';
import * as SceneLayer from '../../scene/SceneLayer';
import * as Motion from '../../drawables/motion/motion';
import { grid } from '../../drawables/composites/grid';
import { radial } from '../../drawables/radial';
import { sun } from '../../drawables/composites/celestial/Sun';
import { moon, MoonParams } from '../../drawables/composites/celestial/Moon';

export function exampleScene(
    imageCache: ImageCache,
): Scene.State<Drawable> {
    const layerFourDrawables = [
        primitiveDrawable(
            'background-night',
            rect(2000, 300),
            Transform.create(),
            fill(Colors.DarkSlateGrey()),
        ),
    ];

    const layerThreeDrawables = [
        primitiveDrawable(
            '1',
            rect(50, 200),
            Transform.create({
                translate: { x: 100, y: 100 },
            }),
            fill(),
        ),
        primitiveDrawable(
            '2',
            ellipse(50, 50),
            Transform.create({
                translate: { x: 300, y: 200 },
            }),
            fill(Colors.Green()),
        ),
        primitiveDrawable(
            '3',
            line(450, 450),
            Transform.create({
                translate: { x: 500, y: 500 },
            }),
            fill(),
        ),
    ];

    const rectOscillator = Motion.oscillator(0, 400, 1);
    const layerTwoDrawables: Drawable[] = [
        animatedDrawable(
            'a1',
            createAnimation<EllipseParams>(
                (e: EllipseParams) => {
                    return primitiveDrawable('a1', ellipse(e.rx, e.ry), Transform.create(), fill());
                },
                (t, dt, pI, pT, pS) => {
                    const deltaAngle = (dt / 2000) * (2 * Math.PI);
                    return [
                        pI,
                        Transform.transition(pT, Rotate.deltaRotation(deltaAngle, 0, 0)),
                        pS,
                    ];
                },
                { rx: 20, ry: 20 },
                Transform.create({
                    translate: {x: 300, y: 300},
                    rotate: {a: 0, x: 150, y: 0},
                }),
                fill(),
            ),
        ),
        animatedDrawable(
            'a2',
            createAnimation<RectParams>(
                (p: RectParams) => {
                    return primitiveDrawable('a2', rect(p.w, p.h), Transform.create(), fill(Colors.Red()));
                },
                (t, dt, pI, pT, pS) => {
                    return [
                        pI,
                        Transform.transition(
                            pT,
                            Translate.setTranslation(
                                pT.translate.x,
                                rectOscillator(dt),
                            ),
                        ),
                        pS,
                    ];
                },
                { w: 30, h: 30 },
                Transform.create({
                    translate: {x: 700, y: 100},
                }),
                fill(Colors.Red()),
            )
        ),
    ];

    const moonCycles = Motion.cycle(0, 1, 0.25);
    const layerOneDrawables = [
        pipe(
            eyePair('4', eyePairParams(50, 50, Colors.Blue())),
            through(
                at({x: 600, y: 200})
            ),
        ),
        pipe(
            waves('5', wavesParams(40, 40, 20)),
            through(
                at({x: 50, y: 400}),
                withStyles(stroke(Colors.Green(), 2)),
            ),
        ),
        pipe(
            grid(
                'g1',
                {
                    rows: 4,
                    columns: 4,
                    cellWidth: 40,
                    cellHeight: 40,
                    drawables: (() => {
                        const ds: StaticDrawable[] = [];
                        for (let i = 0; i < 16; i++) {
                            ds.push(primitiveDrawable(
                                'g1p' + i,
                                rect(40, 40),
                                Transform.create(),
                                strokeAndFill(Colors.Black(), 1, Colors.Red()),
                            ));
                        }
                        return ds;
                    })(),
                }
            ),
            through(
                at({x: 100, y: 400}),
            ),
        ),
        pipe(
            radial(
                'rad1',
                {
                    radius: 80,
                    angleSpacing: Math.PI / 4,
                    angleOffset: 0,
                    drawables: (() => {
                        const ds: StaticDrawable[] = [];
                        for (let i = 0; i < 8; i++) {
                            ds.push(primitiveDrawable(
                                'rad1p' + i,
                                ellipse(20, 20),
                                Transform.create(),
                                fill(Colors.Black()),
                            ));
                        }
                        return ds;
                    })(),
                }
            ),
            through(
                at({x: 500, y: 450}),
            ),
        ),
        pipe(
            sun(
                'sun1',
                { radius: 40},
            ),
            through(
                at({x: 300, y: 100}),
            ),
        ),
        animatedDrawable(
            'a-moon1',
            createAnimation<MoonParams>(
                (p: MoonParams) => {
                    return moon('a-moon1', p);
                },
                (t, dt, pI, pT, pS) => {
                    const phaseRatio = moonCycles(dt);
                    return [
                        { radius: pI.radius, phaseRatio },
                        pT,
                        pS,
                    ];
                },
                { radius: 40, phaseRatio: 0 },
                Transform.create({
                    translate: {x: 100, y: 100},
                }),
                fill(Colors.Red()),
            )
        ),
        // pipe(
        //     moon(
        //         'moon1',
        //         { radius: 40, phaseRatio: 0 },
        //     ),
        //     through(
        //         at({x: 100, y: 100}),
        //     ),
        // ),
    ];

    return Scene.animatedScene({
        layers: [
            SceneLayer.animatedLayer('4', SceneLayer.toState(layerFourDrawables)),
            SceneLayer.animatedLayer('3', SceneLayer.toState(layerThreeDrawables)),
            SceneLayer.animatedLayer('2', SceneLayer.toState(layerTwoDrawables)),
            SceneLayer.animatedLayer('1', SceneLayer.toState(layerOneDrawables)),
        ],
    });
}
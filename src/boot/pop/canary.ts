// import { boot } from '../boot';
// import { ImageCache } from '../../drawables/ImageCache';
// import * as Scene from '../../scene/Scene';
// import * as SceneLayer from '../../scene/SceneLayer';
// import { Drawable, primitiveDrawable } from '../../drawables/drawable';
// import * as Transform from '../../drawables/transform/Transform';
// import { Colors } from '../../drawables/styles/Color';
// import { rect } from '../../drawables/primitives/primitiveShapes';
// import { fill } from '../../drawables/styles/Styles';


// boot({
//     imagePaths: [],
//     loadSpriteSheetParams: [],
//     sceneCreator: exampleScene,
// });

// function exampleScene(
//     imageCache: ImageCache,
// ): Scene.State<Drawable> {
//     const layerOneDrawables = [
//         primitiveDrawable(
//             'rect1',
//             rect(200, 100),
//             Transform.create({
//                 translate: {x: 100, y: 100},
//             }),
//             fill(Colors.Blue()),
//         ),
//     ];

//     return Scene.animatedScene({
//         layers: [
//             SceneLayer.animatedLayer(
//                 '1',
//                 SceneLayer.toState(layerOneDrawables)
//             ),
//         ],
//     });
// }
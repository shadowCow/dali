
// /*Work from the bottom, up.  

// Make a leaf node, then make the parent branch,
// and so on.

// Do it with 'eyes'.
// */

// import { GeometricPrimitive, StylePrimitive, VisualTransform, transform, Ellipse, vec3, ellipse, Vec3 } from "./RenderingPipeline";
// import { fill } from "../../drawables/styles/Styles";
// import { Colors } from "../../drawables/styles/Color";

// type Leaf<G extends GeometricPrimitive> = {
//     geometry: G,
//     style: StylePrimitive,
//     transform: VisualTransform,
// }
// function leaf<G extends GeometricPrimitive>(
//     geometry: G,
// ): Leaf<G> {
//     return {
//         geometry,
//         style: fill(Colors.Black()),
//         transform: transform(),
//     };
// }

// type PupilProps = {

// }
// const Pupil: Leaf<Ellipse> = {
//     geometry: { radii: vec3() },
//     style: fill(Colors.Black()),
//     transform: transform(),
// };

// const Iris: Leaf<Ellipse> = {
//     geometry: { radii: vec3() },
//     style: fill(Colors.Blue()),
//     transform: transform(),
// };

// type Branch<Props> = {
//     props: Props,
//     transform: VisualTransform,
// }

// type EyeProps = {
//     pupil: Leaf<Ellipse>,
//     iris: Leaf<Ellipse>,
//     eyeball: Leaf<Ellipse>,
// }
// function eyeProps(
    
// ): EyeProps {
//     return {
//         pupil: leaf(ellipse()),
//         iris: leaf(ellipse()),
//         eyeball: leaf(ellipse()),
//     };
// }

// const Eye: Branch<EyeProps> = {
//     transform: transform(),
//     props: eyeProps(),
// };

// type EyesProps = {
//     leftEye: EyeProps,
//     rightEye: EyeProps,
//     gap: number,
// }
// function eyesProps(gap: number): EyesProps {
//     return {
//         leftEye: eyeProps(),
//         rightEye: eyeProps(),
//         gap,
//     };
// }


// const Eyes: Branch<EyesProps> = {
//     transform: transform(),
//     props: eyesProps(0.1),
// };


// /*
// every object should use unitless measures.

// Do we need to store geometry as a function of
// a bounding rect?

// Given a target bounding box, BB
//   And some parameters, p
//   And a function f: (p) -> R
//   And a function r: (R, BB) -> Drawables
//  When I invoke r(f(p), BB)
//  Then I have Drawables properly proportioned according to p, f
//   And properly sized according to BB


//   params, BB
//     f(params) => Renderable
//     r(Renderable, BB) => Array<Drawable>
//     d(Array<Drawable>) => ()
// */

// function f(
//     params: any,
// ): Renderable {

// }

// function render(
//     renderable: Renderable,
//     boundingBox: BoundingBox,
// ): Drawable[] {


// }

// type Drawable = {};

// type Renderable = {};

// type BoundingBox = {
//     origin: Vec3,
//     lengths: Vec3,
// }
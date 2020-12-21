import { equilateralPolygon } from "./polygons";

test('equilateralPolygon 3', () => {

    const nSides = 3;
    const radius = 10;

    const result = equilateralPolygon(nSides, radius);

    console.log(result.params.points);

    const p1 = result.params.points[0];
    const p2 = result.params.points[1];
    const p3 = result.params.points[2];

    expect(p1.x).toBeCloseTo(0);
    expect(p1.y).toBeCloseTo(-10);

    expect(p2.x).toBeCloseTo(8.66);
    expect(p2.y).toBeCloseTo(5);

    expect(p3.x).toBeCloseTo(-8.66);
    expect(p3.y).toBeCloseTo(5);
    
});
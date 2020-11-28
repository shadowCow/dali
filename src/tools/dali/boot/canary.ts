import { start } from '../Dali';
import { branch, leaf } from '../Tree';
import { LeafEntity, leafEntity, branchEntity } from '../DaliEntity';
import { rect } from '../drawables/primitives/primitiveShapes';
import { fill } from '../drawables/styles/Styles';
import { Colors } from '../drawables/styles/Color';


const myLeaf = leaf<LeafEntity>(
    leafEntity(
        'myLeaf',
        rect(100, 200),
        fill(Colors.Blue()),
    ),
);
const root = branch(
    [myLeaf],
    branchEntity('root'),
);

start(root);
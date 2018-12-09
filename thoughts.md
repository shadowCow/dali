# thoughts

### transforms
a big use case here is drawing groups of primtives that comprise a single entity.  we'd want a transform to apply to all of them.  in that situation, we would set a transform on a group, then draw the whole group.  i.e. apply the transform to the context, then iterate through each primitive. each primitve draw would need to leave the ctx tranform alone.

another use case is transforming individual elements.
in that case - we'd need to be able to specify the transform on the element...


### modifiers
maybe we should be doing these commands in a modifier style.
e.g.
the base command is the 'draw' with coordinates for the shape.
then there is a 'style' modifier that we can apply that has style information.
then there is a 'transform' modifier that we can apply that has style information.
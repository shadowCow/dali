

export type Timeline = {

}

export type SceneLayer = {

}

export type Composite<T> = {

}

/*
I think we need to do this react style...

we have a tree of functions that take in props and return primitives.

the props (state) is what we work against.  

the primitives are like the 'DOM'.

we never manipulate the 'DOM' directly.

changes to props trigger function calls ('render') to get the new 'DOM'.

how does this work with keyframes?
i suppose keyframes just boil down to functions in the end.
linear interpolation function.  but just a function.

so recap...

State
(State, Input) => State
(State) => Primitives
Update Primitives (Diff?)
Draw to Canvas
*/
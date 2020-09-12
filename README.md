# Dali

### Instructions
After cloning the repo:

```bash
# install dependencies
$ npm i

# run the app in live reload mode
$ npm start
```

Navigate your browser to `localhost:8080`.

### Using Different Boot files
`npm start` will default to running the `boot/dan/canary.ts` file.

You can run any file you want by passing it as an argument for the entryPoint.
The argument should be a path to a boot file, relative to the src/boot directory.
```bash
# syntax
$ npm start -- --env.entryPoint=path/to/your/file

# example
$ npm start -- --env.entryPoint=ken/canary.ts
```

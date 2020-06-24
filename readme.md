# do-not-touch

avoid modifing some files unexpectedly.

## Usage
```bash
$ npm i do-not-touch -D
or
$ yarn add do-not-touch -D
```

package.json
```js
{
    "name": "foo",
    "version": "x.y.z",
    ...
    "scripts": {
        "test": "do-not-touch"
    },
    "do-not-touch": ["some-file"]
}
```

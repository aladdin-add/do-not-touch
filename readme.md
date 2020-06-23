# do-not-touch

avoid modifing some files unexpectedly.

## Usage

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

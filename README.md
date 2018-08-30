# Discourse-js

## Table of Contents

- Installation
- Local Development
- Quick Start
- License

## Installation

_note_: This is currently psuedocode.

```bash
$ npm i discourse-js
```

## Local Development

This is if you are developing the `discourse-js` API locally on your machine.

```bash
# Clone the repo
$ git clone git@gitlab.com:theworkshop/discourse-js.git
$ cd discourse-js
$ pwd|pbcopy # Copies the current working directory /path/to/discourse-js/
# cd into the directory you want to test locally.
$ npm install /path/to/discourse-js/
```

_Why not just use `npm link`?_:

For speed and productivity. Symlinks do not work with React Native 💩📲.

- https://github.com/facebook/react-native/issues/637 🐇🕳
- https://github.com/facebook/metro/issues/1 🐇🕳

_Read more about npm link and why we do this [here](https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be)_.

You will also need a Discourse server running. This can be local or running in the cloud.

## Quick Start

```js
import Discourse from 'discourse-js'

const apiKey = "<api-key-from-discourse>"
const baseUrl = "<your-discourse-url>" || "http://localhost:3000";

const discourse = new Discourse(apiKey, baseUrl);

discourse.posts.create({
  api_username: 'karluser',
  topic_id: 11,
  raw: "Hello World"
})
.then(res => console.log(res))
.catch(err => console.log(err))
```

## License

MIT

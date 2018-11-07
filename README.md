# Discourse-js

[![NPM Version](https://img.shields.io/npm/v/discourse-js.svg?style=flat-square)](https://www.npmjs.com/package/discourse-js)

## Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [Topics](#topics)
  - [Posts](#posts)
- [Local Development](#local-development)
- [License](#license)

## Installation

```bash
$ npm i discourse-js
```

## Quick Start

```js
import Discourse from "discourse-js";

const apiKey = "<api-key-from-discourse>";
const baseUrl = "<your-discourse-url>" || "http://localhost:3000";

const discourse = new Discourse(apiKey, baseUrl);

discourse.posts
  .create({
    api_username: "karluser",
    topic_id: 11,
    raw: "Hello World"
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

## API

### Topics

#### Get a Topic

```js
discourse.topics
  .getTopic({ id })
  .then(res => console.log(response)}
  .catch(err => console.log(err))
```

### Posts

#### Create a Post

```js
discourse.posts
  .create({
    topic_id: 11,
    raw: "Hello World"
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Like a Post

```js
discourse.posts
  .like({ id: 72 })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Unlike a Post

```js
discourse.posts
  .unlike({ id: 72 })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

Note: You can only `unlike` a post within 5 - 10 minutes after you have `liked` it. Think of `unlike` more so like an _undo_.

See this post [here](https://meta.discourse.org/t/53722) and [here](https://meta.discourse.org/t/57141) for information around the undocumented time limit on _unliking_ a _liked_ post.

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

## License

MIT

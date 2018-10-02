# Discourse-js

[![NPM Version](https://img.shields.io/npm/v/discourse-js.svg?style=flat-square)](https://www.npmjs.com/package/discourse-js)

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

## License

MIT

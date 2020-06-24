[![NPM Version](https://img.shields.io/npm/v/discourse-js.svg?style=flat-square)](https://www.npmjs.com/package/discourse-js)

## Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [Categories](#categories)
  - [Groups](#groups)
  - [Messages](#messages)
  - [Notifications](#notifications)
  - [Posts](#posts)
  - [Topics](#topics)
  - [Users](#users)
- [Local Development](#local-development)
- [License](#license)

## Installation

```bash
$ npm i discourse-js
```

## Quick Start

```js
import Discourse from 'discourse-js';

const userApiKey = '<user-api-key-from-discourse>';
const apiUsername = '<user-username-from-discourse>';
const baseUrl = '<your-discourse-url>' || 'http://localhost:3000';

const discourse = new Discourse();
discourse.config({ userApiKey, apiUsername, baseUrl })

discourse.posts
  .create({
    topic_id: 11, // optional (required for creating a new post on a topic.)
    raw: 'Hello World',
    imageUri: imageUri, // optional to create a post/topic with an image.
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

## API

### Categories

#### Get Category

```js
discourse.categories
  .getCategory({ cat_id: 'category-id' })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

#### Get Sub-Category

```js
discourse.getSubcategory
  .getCategory({ cat_id: 'category-id', subcat_id: 'subcategory-id' })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

---

### Groups

#### Get Group Members

```js
discourse.groups
  .getMembers({ group_name: 'group-name' })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

---

### Messages

Todo

---

### Notifications

Todo

---

### Posts

#### Create a Post

```js
discourse.posts
  .create({
    topic_id: 11, // optional (required for creating a new post on a topic.)
    raw: 'Hello World',
    imageUri: imageUri, // optional to create a post/topic with an image.
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

#### Reply to a Post

```js
discourse.posts
  .reply({
    topic_id: 72,
    raw: 'Hello World',
    reply_to_post_number: 14,
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
```

---

### Topics

#### Get a Topic

```js
discourse.topics
  .getTopic({ id })
  .then(res => console.log(res)}
  .catch(err => console.log(err))
```

Topics have a chunk size of 20, which mean you will only get 20 posts back in one get. This can cause weird problems with nested replies and long threads. You can override this by passing `print: true`. Note this sets the chunk size to 1000. See [API: Getting all posts in a topic](https://meta.discourse.org/t/api-getting-all-posts-in-a-topic/41018/10)

```js
discourse.topics
  .getTopic({
    id,
    print: true
  })
  .then(res => console.log(res)}
  .catch(err => console.log(err))
```

#### Delete a Topic

```js
  discourse.topics
    .deleteTopic({ id })
    .then(res => console.log(res)} // Note: delete returns nothing.
    .catch(err => console.log(err))
```

---

### Users

#### Get a single User

```js
discourse.users
  .getUser({ username })
  .then(res => console.log(res)}
  .catch(err => console.log(err))
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

## Publishing a new Version
Bump the version of the package:

```
yarn version --patch/--minor/--major
```

Our preversion, version, and postversion will run, create a new tag in git and push it to our remote repository. The updated package will then be published on npm.

## License

MIT

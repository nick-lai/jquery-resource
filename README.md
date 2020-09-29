jQuery Resource
===

[![workflows/nodejs.yml](https://github.com/nick-lai/jquery-resource/workflows/CodeQL/badge.svg)](https://github.com/nick-lai/jquery-resource/actions?query=workflow%3ACodeQL)
[![workflows/nodejs.yml](https://github.com/nick-lai/jquery-resource/workflows/Node.js%20CI/badge.svg)](https://github.com/nick-lai/jquery-resource/actions?query=workflow%3A%22Node.js+CI%22)
[![Codecov](https://img.shields.io/codecov/c/github/nick-lai/jquery-resource?label=codecov&logo=codecov)](https://codecov.io/gh/nick-lai/jquery-resource)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/nick-lai/jquery-resource?color=turquoise&logo=code-climate)](https://codeclimate.com/github/nick-lai/jquery-resource)
[![npm](https://img.shields.io/npm/v/jquery-resource)](https://www.npmjs.com/package/jquery-resource)
[![GitHub](https://img.shields.io/github/license/nick-lai/jquery-resource)](./LICENSE)

A jQuery plugin that abstracts the process of consuming a REST endpoint.

## Features

- ⚡ Simple and lightweight
- 🚀 Incredible high availability
- ✨ Customizable ajax settings for resources

## Table of Contents

- [jQuery Resource](#jquery-resource)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [CDN](#cdn)
  - [Usage](#usage)
    - [Methods](#methods)
      - [post()](#post)
      - [get()](#get)
      - [find()](#find)
      - [patch()](#patch)
      - [put()](#put)
      - [delete()](#delete)
    - [Aliases](#aliases)
      - [add()](#add)
      - [create()](#create)
      - [update()](#update)
      - [replace()](#replace)
    - [Ajax settings](#ajax-settings)
      - [Resource ajax settings](#resource-ajax-settings)
      - [One-time ajax settings](#one-time-ajax-settings)
  - [Inspiration](#inspiration)
  - [License](#license)

## Installation

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/jquery-resource@1.0.3/dist/jquery.resource.min.js"></script>
```

## Usage

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// POST /api/users
userResource.post({
  email: 'george.bluth@reqres.in',
  first_name: 'George',
  last_name: 'Bluth'
});

// GET /api/users/1
userResource.get(1);

// PATCH /api/users/1
userResource.patch(1, {
  email: 'emma.wong@reqres.in',
  first_name: 'Emma',
  last_name: 'Wong'
});

// DELETE /api/users/1
userResource.delete(1);
```

### Methods

#### post()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// POST /api/users
userResource.post({
  email: 'george.bluth@reqres.in',
  first_name: 'George',
  last_name: 'Bluth'
}).done(function () {
  console.log('POST /api/users');
});
```

#### get()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// GET /api/users/1
userResource.get(1).done(function () {
  console.log('GET /api/users/1');
});
```

#### find()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// GET /api/users?first_name=George
userResource.find({
  first_name: 'George'
}).done(function () {
  console.log('GET /api/users?first_name=George');
});
```

#### patch()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// PATCH /api/users/1
userResource.patch(1, {
  email: 'emma.wong@reqres.in',
  first_name: 'Emma',
  last_name: 'Wong'
}).done(function () {
  console.log('PATCH /api/users/1');
});
```

#### put()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// PUT /api/users/1
userResource.put(1, {
  email: 'emma.wong@reqres.in',
  first_name: 'Emma',
  last_name: 'Wong'
}).done(function () {
  console.log('PUT /api/users/1');
});
```

#### delete()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// DELETE /api/users/1
userResource.delete(1).done(function () {
  console.log('DELETE /api/users/1');
});
```

### Aliases

#### add()

Alias of `post()` method.

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// POST /api/users
userResource.add({
  email: 'george.bluth@reqres.in',
  first_name: 'George',
  last_name: 'Bluth'
}).done(function () {
  console.log('POST /api/users');
});
```

#### create()

Alias of `post()` method.

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// POST /api/users
userResource.create({
  email: 'george.bluth@reqres.in',
  first_name: 'George',
  last_name: 'Bluth'
}).done(function () {
  console.log('POST /api/users');
});
```

#### update()

Alias of `patch()` method.

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// PATCH /api/users/1
userResource.update(1, {
  email: 'emma.wong@reqres.in',
  first_name: 'Emma',
  last_name: 'Wong'
}).done(function () {
  console.log('PATCH /api/users/1');
});
```

#### replace()

Alias of `put()` method.

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// PUT /api/users/1
userResource.replace(1, {
  email: 'emma.wong@reqres.in',
  first_name: 'Emma',
  last_name: 'Wong'
}).done(function () {
  console.log('PUT /api/users/1');
});
```

### Ajax settings

[jQuery.ajax(settings)](https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings "jQuery.ajax() | jQuery API Documentation")

#### Resource ajax settings

```javascript
// use resource ajax settings to actions
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users',
  ajaxSettings: {
    contentType: false,
    processData: false
  },
});

userResource.get(1);

// change resource ajax settings
userResource.options.ajaxSettings.processData = true;
```

#### One-time ajax settings

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users',
  ajaxSettings: {
    dataType: 'text'
  },
});

// use one-time ajax settings to post
userResource.post({
  email: 'emma.wong@reqres.in',
  first_name: 'Emma',
  last_name: 'Wong'
}, {
  dataType: 'json'
});

// use one-time ajax settings to actions:
//   - post(data, ajaxSettings)
//   - find(params, ajaxSettings)
//   - patch(id, data, ajaxSettings)
//   - put(id, data, ajaxSettings)
//   - get(id, params, ajaxSettings)
//   - delete(id, params, ajaxSettings)
```

## Inspiration

- [pagekit/vue-resource](https://github.com/pagekit/vue-resource)
  - [`Vue.resource`](https://github.com/pagekit/vue-resource/blob/develop/docs/resource.md)
- [ngonzalvez/rest-facade](https://github.com/ngonzalvez/rest-facade)

## License

[MIT](./LICENSE)

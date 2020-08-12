jQuery Resource
===

[![workflows/nodejs.yml](https://github.com/nick-lai/jquery-resource/workflows/Node.js%20CI/badge.svg)](https://github.com/nick-lai/jquery-resource/actions)
[![Codecov](https://img.shields.io/codecov/c/github/nick-lai/jquery-resource?label=codecov&logo=codecov)](https://codecov.io/gh/nick-lai/jquery-resource)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hm/jquery-resource?label=jsDelivr&logo=jsdelivr)](https://www.jsdelivr.com/package/npm/jquery-resource)
[![npm](https://img.shields.io/npm/v/jquery-resource)](https://www.npmjs.com/package/jquery-resource)
[![GitHub](https://img.shields.io/github/license/nick-lai/jquery-resource)](./LICENSE)

Provides a base class to handle REST resources for jQuery.ajax

## Table of Contents

- [jQuery Resource](#jquery-resource)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
    - [CDN](#cdn)
  - [Usage](#usage)
    - [post()](#post)
    - [add()](#add)
    - [create()](#create)
    - [get()](#get)
    - [find()](#find)
    - [patch()](#patch)
    - [update()](#update)
    - [put()](#put)
    - [replace()](#replace)
    - [delete()](#delete)
  - [License](#license)

## Install

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/jquery-resource@1.0.0-rc.3/dist/jquery.resource.min.js"></script>
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

### post()

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

### add()

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

### create()

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

### get()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// GET /api/users/1
userResource.get(1).done(function () {
  console.log('GET /api/users/1');
});
```

### find()

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

### patch()

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

### update()

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

### put()

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

### replace()

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

### delete()

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users'
});

// DELETE /api/users/1
userResource.delete(1).done(function () {
  console.log('DELETE /api/users/1');
});
```

## License

[MIT](./LICENSE)

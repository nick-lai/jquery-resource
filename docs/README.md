## jQuery Resource <!-- {docsify-ignore} -->

A jQuery plugin that abstracts the process of consuming a REST endpoint.

## Features

- ⚡ Simple and lightweight
- 🚀 Incredible high availability
- ✨ Customizable ajax settings for resources

## Installation

### CDN

jQuery.resource is available on jsDelivr or unpkg.

#### jsDelivr

Load jQuery.resource from [jsDelivr](https://www.jsdelivr.com/package/npm/jquery-resource).

```html
<script src="https://cdn.jsdelivr.net/npm/jquery-resource@1.1.0"></script>
```

#### unpkg

Load jQuery.resource from [unpkg](https://unpkg.com/jquery-resource/dist/).

```html
<script src="https://unpkg.com/jquery-resource@1.1.0"></script>
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

Try it out on [JSFiddle](https://jsfiddle.net/nick_lai/e0k8om4f/).

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

### Custom actions

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users',
  customActions: {
    // actionName: ajaxSettings
    copy: {method: 'POST', url: 'https://reqres.in/api/users/copy'},
  },
});

// customAction(params, ajaxSettings)
userResource.copy({
  id: 1,
});
```

### Last request

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users',
});

userResource.get(1);
userResource.get(2);

// action's last request
userResource.get.lastRequest.done(function () {
  console.log('GET /api/users/2');
});
```

### Ajax settings

[jQuery.ajax(settings)](https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings "jQuery.ajax() | jQuery API Documentation")

#### Resource's ajax settings

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users',
  // use resource's ajax settings to actions
  ajaxSettings: {
    contentType: false,
    processData: false
  },
});

userResource.get(1);

// change resource ajax settings
userResource.ajaxSettings.processData = true;
```

#### Action's ajax settings

```javascript
var userResource = $.resource({
  endpoint: 'https://reqres.in/api/users',
});

// action's ajax settings
userResource.post.ajaxSettings.processData = false;

userResource.post({
  email: 'emma.wong@reqres.in',
  first_name: 'Emma',
  last_name: 'Wong'
});
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

[MIT](https://github.com/nick-lai/jquery-resource/blob/master/LICENSE)

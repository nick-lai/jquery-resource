'use strict';

const $ = require('jquery');
require('../src/jquery.resource');

describe('calls into $.ajax with the correct params', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('get', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.get(1);

    expect(ajaxSpy).toBeCalledWith({
      method: 'GET',
      url: 'https://reqres.in/api/users/1'
    });
  });

  test('find', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.find({
      first_name: 'George'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'GET',
      url: 'https://reqres.in/api/users',
      data: {
        first_name: 'George'
      }
    });
  });

  test('post', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.post({
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      data: {
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth'
      }
    });
  });

  test('add', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.add({
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      data: {
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver'
      }
    });
  });

  test('create', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.create({
      email: 'emma.wong@reqres.in',
      first_name: 'Emma',
      last_name: 'Wong'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      data: {
        email: 'emma.wong@reqres.in',
        first_name: 'Emma',
        last_name: 'Wong'
      }
    });
  });

  test('patch', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.patch(1, {
      email: 'eve.holt@reqres.in',
      first_name: 'Eve',
      last_name: 'Holt'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'PATCH',
      url: 'https://reqres.in/api/users/1',
      data: {
        email: 'eve.holt@reqres.in',
        first_name: 'Eve',
        last_name: 'Holt'
      }
    });
  });

  test('update', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.update(2, {
      email: 'charles.morris@reqres.in',
      first_name: 'Charles',
      last_name: 'Morris'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'PATCH',
      url: 'https://reqres.in/api/users/2',
      data: {
        email: 'charles.morris@reqres.in',
        first_name: 'Charles',
        last_name: 'Morris'
      }
    });
  });

  test('put', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.put(3, {
      email: 'tracey.ramos@reqres.in',
      first_name: 'Tracey',
      last_name: 'Ramos'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'PUT',
      url: 'https://reqres.in/api/users/3',
      data: {
        email: 'tracey.ramos@reqres.in',
        first_name: 'Tracey',
        last_name: 'Ramos'
      }
    });
  });

  test('replace', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.replace(4, {
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'PUT',
      url: 'https://reqres.in/api/users/4',
      data: {
        email: 'michael.lawson@reqres.in',
        first_name: 'Michael',
        last_name: 'Lawson'
      }
    });
  });

  test('delete', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.delete(5);

    expect(ajaxSpy).toBeCalledWith({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/5',
    });
  });

  test('delete all', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.delete();

    expect(ajaxSpy).toBeCalledWith({
      method: 'DELETE',
      url: 'https://reqres.in/api/users',
    });
  });

  test('resource ajax settings', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users',
      ajaxSettings: {
        contentType: false,
        processData: false
      }
    });

    userResource.get(1);

    expect(ajaxSpy).toBeCalledWith({
      method: 'GET',
      url: 'https://reqres.in/api/users/1',
      contentType: false,
      processData: false
    });

    ajaxSpy.mockReset();

    userResource.ajaxSettings.processData = true;
    userResource.get(1);

    expect(ajaxSpy).toBeCalledWith({
      method: 'GET',
      url: 'https://reqres.in/api/users/1',
      contentType: false,
      processData: true
    });
  });

  test('action\'s ajax settings', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users',
      ajaxSettings: {
        contentType: false,
        processData: false
      },
    });

    userResource.get.ajaxSettings.contentType = true;

    userResource.get(1);

    expect(ajaxSpy).toBeCalledWith({
      method: 'GET',
      url: 'https://reqres.in/api/users/1',
      contentType: true,
      processData: false
    });
  });

  test('one-time ajax settings', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users',
      ajaxSettings: {
        dataType: 'text'
      }
    });

    userResource.post({
      email: 'emma.wong@reqres.in',
      first_name: 'Emma',
      last_name: 'Wong'
    }, {
      dataType: 'json'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      data: {
        email: 'emma.wong@reqres.in',
        first_name: 'Emma',
        last_name: 'Wong'
      },
      dataType: 'json'
    });

    ajaxSpy.mockReset();

    userResource.post({
      email: 'emma.wong@reqres.in',
      first_name: 'Emma',
      last_name: 'Wong'
    });

    expect(ajaxSpy).toBeCalledWith({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      data: {
        email: 'emma.wong@reqres.in',
        first_name: 'Emma',
        last_name: 'Wong'
      },
      dataType: 'text'
    });
  });

  test('action\'s last request', () => {
    jest.spyOn($, 'ajax').mockImplementation(() => new XMLHttpRequest());

    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users',
    });

    const firstRequest = userResource.get(1);

    expect(firstRequest).toBe(userResource.get.lastRequest);

    const secondRequest = userResource.get(2);

    expect(firstRequest).not.toBe(userResource.get.lastRequest);
    expect(secondRequest).toBe(userResource.get.lastRequest);
  });

  test('custom actions', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    ajaxSpy.mockImplementation(() => new XMLHttpRequest());

    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users',
      customActions: {
        copy: {
          method: 'POST',
          url: 'https://reqres.in/api/users/copy',
        },
        export: {
          method: 'GET',
          url: 'https://reqres.in/api/users/export',
        },
        get: {
          method: 'GET',
        },
      }
    });

    expect({
      method: 'POST',
      url: 'https://reqres.in/api/users/copy',
    }).toEqual(userResource.copy.ajaxSettings);

    expect({
      method: 'GET',
      url: 'https://reqres.in/api/users/export',
    }).toEqual(userResource.export.ajaxSettings);

    let request = userResource.copy({
      id: 1,
    });

    expect(request).toBe(userResource.copy.lastRequest);

    expect(ajaxSpy).toBeCalledWith({
      method: 'POST',
      url: 'https://reqres.in/api/users/copy',
      data: {
        id: 1,
      }
    });

    ajaxSpy.mockReset();

    request = userResource.export({
      id: 2,
    });

    expect(request).toBe(userResource.export.lastRequest);

    expect(ajaxSpy).toBeCalledWith({
      method: 'GET',
      url: 'https://reqres.in/api/users/export',
      data: {
        id: 2,
      }
    });
  });

  test('isPending (action.lastRequest)', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    ajaxSpy.mockImplementation(() => new XMLHttpRequest());

    const userResource = $.resource({
      endpoint: 'https://reqres.in/api/users',
      customActions: {
        foo: {
          method: 'GET',
          url: 'https://reqres.in/api/users/foo',
        },
        bar: {
          method: 'POST',
          url: 'https://reqres.in/api/users/bar',
        },
      }
    });

    // get
    expect(userResource.get.isPending()).toBe(false);
    userResource.get(1);
    expect(userResource.get.isPending()).toBe(true);

    // find
    expect(userResource.find.isPending()).toBe(false);
    userResource.find();
    expect(userResource.find.isPending()).toBe(true);

    // post, add, create
    expect(userResource.post.isPending()).toBe(false);
    expect(userResource.add.isPending()).toBe(false);
    expect(userResource.create.isPending()).toBe(false);
    userResource.post();
    expect(userResource.post.isPending()).toBe(true);
    expect(userResource.add.isPending()).toBe(true);
    expect(userResource.create.isPending()).toBe(true);

    // patch, update
    expect(userResource.patch.isPending()).toBe(false);
    expect(userResource.update.isPending()).toBe(false);
    userResource.patch(1);
    expect(userResource.patch.isPending()).toBe(true);
    expect(userResource.update.isPending()).toBe(true);

    // put, replace
    expect(userResource.put.isPending()).toBe(false);
    expect(userResource.replace.isPending()).toBe(false);
    userResource.put(1);
    expect(userResource.put.isPending()).toBe(true);
    expect(userResource.replace.isPending()).toBe(true);

    // delete
    expect(userResource.delete.isPending()).toBe(false);
    userResource.delete(1);
    expect(userResource.delete.isPending()).toBe(true);

    // custom actions
    expect(userResource.foo.isPending()).toBe(false);
    userResource.foo();
    expect(userResource.foo.isPending()).toBe(true);
    expect(userResource.bar.isPending()).toBe(false);
    userResource.bar();
    expect(userResource.bar.isPending()).toBe(true);
  });
});

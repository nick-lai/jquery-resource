'use strict';

const $ = require('jquery');
require('../src/jquery.resource');

describe('calls into $.ajax with the correct params', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('get', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
      endpoint: 'https://reqres.in/api/users'
    });

    userResource.get(1).done(() => {});

    expect(ajaxSpy).toBeCalledWith({
      method: 'GET',
      url: 'https://reqres.in/api/users/1'
    });
  });

  it('find', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('post', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('add', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('create', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('patch', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('update', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('put', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('replace', () => {
    const ajaxSpy = jest.spyOn($, 'ajax');
    const userResource = new $.resource({
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

  it('delete', () => {
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

  it('delete all', () => {
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
});

(function (factory) {
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function ($) {
  'use strict';

  var Resource = function (options) {
    if (!(this instanceof Resource)) {
      return new Resource(options);
    }
    this.init(options);
  };

  var DEFAULTS = {
    endpoint: '',
    ajaxSettings: {}
  };

  var deepMerge = function () {
    return $.extend.apply(null, [true, {}].concat($.makeArray(arguments)));
  };

  /**
   * Ajax (private method for Resource)
   *
   * @param {string} method The HTTP method to use for the request.
   * @param {string} id Resource ID.
   * @param {object|string|FormData} data A resource.
   * @param {object} settings Ajax settings.
   * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
   */
  var ajax = function (method, id, data, settings) {
    return $.ajax(deepMerge(this.ajaxSettings, {
      method: method,
      url: this.endpoint + (id ? '/' + id : ''),
      data: data
    }, settings));
  };

  var proto = Resource.prototype;

  $.extend(proto, {
    init: function (options) {
      this.options = deepMerge(DEFAULTS, options);
      this.endpoint = this.options.endpoint;
      this.ajaxSettings = this.options.ajaxSettings;
    },

    /**
     * Send an asynchronous HTTP GET (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object|string|FormData} params Parameters.
     * @param {object} settings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    get: function (id, params, settings) {
      return ajax.call(this, 'GET', id, params, settings);
    },

    /**
     * Find by params.
     *
     * @param {object|string|FormData} params Parameters.
     * @param {object} settings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    find: function (params, settings) {
      return this.get('', params, settings);
    },

    /**
     * Send an asynchronous HTTP POST (Ajax) request.
     *
     * @param {object|string|FormData} data A resource.
     * @param {object} settings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    post: function (data, settings) {
      return ajax.call(this, 'POST', '', data, settings);
    },

    /**
     * Send an asynchronous HTTP PATCH (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object|string|FormData} data A resource.
     * @param {object} settings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    patch: function (id, data, settings) {
      return ajax.call(this, 'PATCH', id, data, settings);
    },

    /**
     * Send an asynchronous HTTP PUT (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object|string|FormData} data A resource.
     * @param {object} settings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    put: function (id, data, settings) {
      return ajax.call(this, 'PUT', id, data, settings);
    },

    /**
     * Send an asynchronous HTTP DELETE (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object|string|FormData} params Parameters.
     * @param {object} settings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    delete: function (id, params, settings) {
      return ajax.call(this, 'DELETE', id, params, settings);
    }
  });

  $.extend(proto, {
    // Alias of `post()` method.
    add: proto.post,

    // Alias of `post()` method.
    create: proto.post,

    // Alias of `patch()` method.
    update: proto.patch,

    // Alias of `put()` method.
    replace: proto.put
  });

  $.resource = Resource;
}));

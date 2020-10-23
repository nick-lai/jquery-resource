(function (root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(root.jQuery);
  }
}(typeof self !== 'undefined' ? self : this, function ($) {
  'use strict';

  var Resource = function (options) {
    if (!(this instanceof Resource)) {
      return new Resource(options);
    }
    init(this, options);
  };

  Resource.DEFAULTS = {
    endpoint: '',
    ajaxSettings: {},
  };

  return $.resource = Resource;

  function deepMerge () {
    return $.extend.apply(null, [true, {}].concat($.makeArray(arguments)));
  }

  /**
   * Ajax
   *
   * @param {object} instance The Resource instance
   * @param {string} method The HTTP method to use for the request.
   * @param {string} id Resource ID.
   * @param {object|string|FormData} data A resource.
   * @param {object} settings Ajax settings.
   * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
   */
  function ajax (instance, method, id, data, settings) {
    return $.ajax(deepMerge(instance.ajaxSettings, {
      method: method,
      url: instance.endpoint + (id ? '/' + id : ''),
      data: data,
    }, settings));
  }

  function init (instance, options) {
    instance.options = deepMerge(Resource.DEFAULTS, options);
    instance.endpoint = instance.options.endpoint;
    instance.ajaxSettings = instance.options.ajaxSettings;
    initActions(instance);
    initAliases(instance);
  }

  function initActions (instance) {
    $.extend(instance, {
      /**
       * Send an asynchronous HTTP GET (Ajax) request.
       *
       * @param {string} id Resource ID.
       * @param {object|string|FormData} params Parameters.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      get: function (id, params, settings) {
        return ajax(this, 'GET', id, params, settings);
      },

      /**
       * Find by params.
       *
       * @param {object|string|FormData} params Parameters.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      find: function (params, settings) {
        return ajax(this, 'GET', '', params, settings);
      },

      /**
       * Send an asynchronous HTTP POST (Ajax) request.
       *
       * @param {object|string|FormData} data A resource.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      post: function (data, settings) {
        return ajax(this, 'POST', '', data, settings);
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
        return ajax(this, 'PATCH', id, data, settings);
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
        return ajax(this, 'PUT', id, data, settings);
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
        return ajax(this, 'DELETE', id, params, settings);
      }
    });
  }

  function initAliases (instance) {
    $.extend(instance, {
      add: instance.post,
      create: instance.post,
      update: instance.patch,
      replace: instance.put,
    });
  }
}));

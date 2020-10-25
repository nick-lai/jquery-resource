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

  Resource.prototype.ajax = function (settings) {
    return $.ajax(deepMerge(this.ajaxSettings, settings));
  };

  return $.resource = Resource;

  function deepMerge () {
    return $.extend.apply(null, [true, {}].concat($.makeArray(arguments)));
  }

  /**
   * Ajax
   *
   * @param {object} instance The Resource instance
   * @param {string} id Resource ID.
   * @param {object|string|FormData} data A resource.
   * @param {object} actionSettings Ajax settings of action.
   * @param {object} settings Ajax settings.
   * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
   */
  function ajax (instance, id, data, actionSettings, settings) {
    return instance.ajax(deepMerge({
      url: instance.endpoint + (id ? '/' + id : ''),
      data: data,
    }, actionSettings, settings));
  }

  function init (instance, options) {
    instance.options = deepMerge(Resource.DEFAULTS, options);
    instance.endpoint = instance.options.endpoint;
    instance.ajaxSettings = instance.options.ajaxSettings;
    initActions(instance);
    initAliases(instance);
  }

  function initActions (instance) {
    var actions = {
      /**
       * Send an asynchronous HTTP GET (Ajax) request.
       *
       * @param {string} id Resource ID.
       * @param {object|string|FormData} params Parameters.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      get: function (id, params, settings) {
        return ajax(this, id, params, this.get.ajaxSettings, settings);
      },

      /**
       * Find by params.
       *
       * @param {object|string|FormData} params Parameters.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      find: function (params, settings) {
        return ajax(this, '', params, this.find.ajaxSettings, settings);
      },

      /**
       * Send an asynchronous HTTP POST (Ajax) request.
       *
       * @param {object|string|FormData} data A resource.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      post: function (data, settings) {
        return ajax(this, '', data, this.post.ajaxSettings, settings);
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
        return ajax(this, id, data, this.patch.ajaxSettings, settings);
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
        return ajax(this, id, data, this.put.ajaxSettings, settings);
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
        return ajax(this, id, params, this.delete.ajaxSettings, settings);
      }
    };

    $.each(actions, function (actionName, action) {
      action.ajaxSettings = {
        method: actionName === 'find' ? 'GET' : actionName.toUpperCase(),
      };
    });

    $.extend(instance, actions);
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

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
    customActions: {},
  };

  Resource.prototype.ajax = function (settings) {
    return $.ajax(deepMerge(this.ajaxSettings, settings));
  };

  return $.resource = Resource;

  function deepMerge () {
    return $.extend.apply(null, [true, {}].concat($.makeArray(arguments)));
  }

  function isPendingRequest (request) {
    return !!request && request.readyState !== 4;
  }

  /**
   * Ajax
   *
   * @param {Resource} instance The Resource instance.
   * @param {string} id Resource ID.
   * @param {object|string|FormData} data A resource.
   * @param {object} action The action function.
   * @param {object} settings Ajax settings.
   * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
   */
  function ajax (instance, id, data, action, settings) {
    return action.lastRequest = instance.ajax(deepMerge({
      url: instance.endpoint + (id ? '/' + id : ''),
      data: data,
    }, action.ajaxSettings, settings));
  }

  function createAction (instance, ajaxSettings, useID) {
    var action = useID ? function (id, data, settings) {
      return ajax(instance, id, data, action, settings);
    } : function (data, settings) {
      return ajax(instance, '', data, action, settings);
    };

    action.ajaxSettings = ajaxSettings;
    action.lastRequest = null;
    action.isPending = function () {
      return isPendingRequest(action.lastRequest);
    };

    return action;
  }

  function init (instance, options) {
    instance.options = deepMerge(Resource.DEFAULTS, options);
    instance.endpoint = instance.options.endpoint;
    instance.ajaxSettings = instance.options.ajaxSettings;
    initActions(instance);
    initAliases(instance);
    initCustomActions(instance);
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
      get: createAction(instance, { method: 'GET' }, true),

      /**
       * Find by params.
       *
       * @param {object|string|FormData} params Parameters.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      find: createAction(instance, { method: 'GET' }),

      /**
       * Send an asynchronous HTTP POST (Ajax) request.
       *
       * @param {object|string|FormData} data A resource.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      post: createAction(instance, { method: 'POST' }),

      /**
       * Send an asynchronous HTTP PATCH (Ajax) request.
       *
       * @param {string} id Resource ID.
       * @param {object|string|FormData} data A resource.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      patch: createAction(instance, { method: 'PATCH' }, true),

      /**
       * Send an asynchronous HTTP PUT (Ajax) request.
       *
       * @param {string} id Resource ID.
       * @param {object|string|FormData} data A resource.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      put: createAction(instance, { method: 'PUT' }, true),

      /**
       * Send an asynchronous HTTP DELETE (Ajax) request.
       *
       * @param {string} id Resource ID.
       * @param {object|string|FormData} params Parameters.
       * @param {object} settings Ajax settings.
       * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
       */
      delete: createAction(instance, { method: 'DELETE' }, true),
    };

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

  function initCustomActions (instance) {
    var customActions = instance.options.customActions;

    $.each(customActions, function (actionName, ajaxSettings) {
      if (actionName in instance) {
        console.error(
          '[jquery-resource] Custom action "%s" conflicts with an existing resource instance property.',
          actionName
        );
        return true;
      }
      instance[actionName] = createAction(instance, ajaxSettings);
    });
  }
}));

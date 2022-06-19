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
    actions: {
      get: {
        method: 'GET',
        withID: true,
      },
      find: {
        method: 'GET',
      },
      post: {
        method: 'POST',
      },
      patch: {
        method: 'PATCH',
        withID: true,
      },
      put: {
        method: 'PUT',
        withID: true,
      },
      delete: {
        method: 'DELETE',
        withID: true,
      },
    },
    // deprecated
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

  function hasProperty (object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
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
    var ajaxSettings = action.ajaxSettings;
    return action.lastRequest = instance.ajax(deepMerge(ajaxSettings, {
      url: (ajaxSettings.url || instance.endpoint) + (id ? '/' + id : ''),
      data: data,
    }, settings));
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
  }

  function initActions (instance) {
    var options = instance.options;
    var actions = $.extend({}, options.actions, options.customActions);

    $.each(actions, function (actionName, actionSettings) {
      if (!actionSettings) {
        return true;
      }

      if (actionName in instance) {
        console.error(
          '[jquery-resource] The action "%s" conflicts with an existing resource instance property.',
          actionName
        );
        return true;
      }

      var withID = actionSettings.withID || actionSettings.useID || false;
      var ajaxSettings = $.extend({}, actionSettings);

      delete ajaxSettings.useID;
      delete ajaxSettings.withID;
      delete ajaxSettings.withFiles;

      if (actionSettings.withFiles) {
        if (!hasProperty(ajaxSettings, 'contentType')) {
          ajaxSettings.contentType = false;
        }

        if (!hasProperty(ajaxSettings, 'processData')) {
          ajaxSettings.processData = false;
        }
      }

      instance[actionName] = createAction(instance, ajaxSettings, withID);
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

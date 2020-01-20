(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function ($) {
  var utils = {
    deepMerge: function () {
      var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
      return $.extend.apply(null, [true, {}].concat(args));
    }
  };

  var Resource = function (options) {
    this instanceof Resource
      ? this.init(options)
      : console.error('[Resource] Resource is a constructor and should be called with the `new` keyword');
  };

  var DEFAULTS = {
    endpoint: '',
    ajaxSettings: {}
  };

  $.extend(Resource.prototype, {
    init: function (options) {
      this.options = utils.deepMerge(DEFAULTS, options);
      this.endpoint = this.options.endpoint;
      this.ajaxSettings = this.options.ajaxSettings;
    },

    /**
     * Send an asynchronous HTTP GET (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object|string|FormData} params Parameters.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    get: function (id, params, ajaxSettings) {
      var settings = {
        method: 'GET',
        url: this.endpoint + (id ? '/' + id : ''),
        data: params
      };
      return $.ajax(utils.deepMerge(this.ajaxSettings, ajaxSettings, settings));
    },

    /**
     * Find by params.
     *
     * @param {object|string|FormData} params Parameters.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    find: function (params, ajaxSettings) {
      return this.get('', params, ajaxSettings);
    },

    /**
     * Send an asynchronous HTTP POST (Ajax) request.
     *
     * @param {object} data A resource.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    post: function (data, ajaxSettings) {
      var settings = {
        method: 'POST',
        url: this.endpoint,
        data: data
      };
      return $.ajax(utils.deepMerge(this.ajaxSettings, ajaxSettings, settings));
    },

    /**
     * Alias of `this.post()` method.
     *
     * @param {object} data A resource.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    add: function (data, ajaxSettings) {
      return this.post(data, ajaxSettings);
    },

    /**
     * Alias of `this.post()` method.
     *
     * @param {object} data A resource.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    create: function (data, ajaxSettings) {
      return this.post(data, ajaxSettings);
    },

    /**
     * Send an asynchronous HTTP PATCH (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object} data A resource.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    patch: function (id, data, ajaxSettings) {
      var settings = {
        method: 'PATCH',
        url: this.endpoint + '/' + id,
        data: data
      };
      return $.ajax(utils.deepMerge(this.ajaxSettings, ajaxSettings, settings));
    },

    /**
     * Alias of `this.patch()` method.
     *
     * @param {string} id Resource ID.
     * @param {object} data A resource.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    update: function (id, data, ajaxSettings) {
      return this.patch(id, data, ajaxSettings);
    },

    /**
     * Send an asynchronous HTTP PUT (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object} data A resource.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    put: function (id, data, ajaxSettings) {
      var settings = {
        method: 'PUT',
        url: this.endpoint + '/' + id,
        data: data || {}
      };
      return $.ajax(utils.deepMerge(this.ajaxSettings, ajaxSettings, settings));
    },

    /**
     * Alias of `this.put()` method.
     *
     * @param {string} id Resource ID.
     * @param {object} data A resource.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    replace: function (id, data, ajaxSettings) {
      return this.put(id, data, ajaxSettings);
    },

    /**
     * Send an asynchronous HTTP DELETE (Ajax) request.
     *
     * @param {string} id Resource ID.
     * @param {object|string|FormData} params Parameters.
     * @param {object} ajaxSettings Ajax settings.
     * @returns {jqXHR} The jQuery XMLHttpRequest (jqXHR) object.
     */
    delete: function (id, params, ajaxSettings) {
      var settings = {
        method: 'DELETE',
        url: this.endpoint + (id ? '/' + id : ''),
        data: params
      };
      return $.ajax(utils.deepMerge(this.ajaxSettings, ajaxSettings, settings));
    }
  });

  $.resource = Resource;
}));

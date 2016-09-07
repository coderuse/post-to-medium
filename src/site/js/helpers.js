(function (w) {
  'use strict';

  w.Util = function () {

  }

  Util.prototype.guid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  Util.prototype.getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };
} (window));

(function (w) {
  'use strict';

  w.Store = function (provider) {
    this._provider = null;
    var _providerSupported =
      typeof w[provider] !== 'undefined'
      && w[provider] !== null;

    this._supported = function () {
      if (!_providerSupported) {
        throw 'Local storage not supported';
      }
      this._provider = w[provider];
      return true;
    };

    this.put = function (key, item) {
      if (this._supported()) {
        this._provider.setItem(key, item);
      }
    };

    this.get = function (key) {
      if (this._supported()) {
        return this._provider.getItem(key);
      }
    };

    this.remove = function (key) {
      if (this._supported()) {
        return this._provider.removeItem(key);
      }
    };

    this.clear = function (key) {
      if (this._supported()) {
        return this._provider.clear();
      }
    };
  }
} (window));
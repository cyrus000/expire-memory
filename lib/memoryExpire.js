function MemoryExpire () {
  this.data = {};
  this.timeout = {};
}

/**
 * Puts key value pair into cache and sets timeout if one is given
 * if none is given it wont expire
 *
 * @param {string|number} key
 * @param {string|number} value
 * @param {number} [timeout]
 */
MemoryExpire.prototype.put = function (key, value, timeout) {
  this.data[key] = value;

  var prevTimeout = this.timeout[key];

  if (prevTimeout) {
    clearTimeout(prevTimeout);
  }

  if (timeout && typeof(timeout) == 'number') {
    this.timeout[key] = setTimeout(function () {
      delete this.timeout[key];
      delete this.data[key];
    }.bind(this), timeout)
  }
};

/**
 * gets value of given key
 *
 * @param {string|number} key
 * @returns {string|number|null}
 */
MemoryExpire.prototype.get = function (key) {
  return this.data[key] || null
};

/**
 * True if given key has a timeout
 * false if key does not exits or has not timeout
 *
 * @param {string|number} key
 * @returns {boolean}
 */
MemoryExpire.prototype.hasTimeout = function (key) {
  if (this.timeout[key]) {
    return true;
  }

  return false;
};

/**
 * Array of all keys
 *
 * @returns {Array}
 */
MemoryExpire.prototype.keys = function () {
  return Object.keys(this.data);
};

/**
 * Array of keys wtih timeouts
 *
 * @returns {Array}
 */
MemoryExpire.prototype.timeouts = function () {
  return Object.keys(this.timeout);
};

/**
 * True if key exists
 *
 * @param {string|number} key
 * @returns {boolean}
 */
MemoryExpire.prototype.exists = function (key) {
  return this.data.hasOwnProperty(key)
};

module.exports = MemoryExpire;
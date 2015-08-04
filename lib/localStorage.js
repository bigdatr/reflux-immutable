// Check for localStorage support
var hasLocalStorage = typeof window !== 'undefined' && window.localStorage;

var _localStorage = {
    getItem: function(key) {
        if (!hasLocalStorage) { return null; }

        return window.localStorage.getItem(key);
    },
    setItem: function(key, value) {
        if (!hasLocalStorage) { return null; }

        return window.localStorage.setItem(key, value);
    }
};

module.exports = _localStorage;
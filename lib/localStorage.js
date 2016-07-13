var hasLocalStorage = function() {
    try {
        return typeof window !== 'undefined' && window.localStorage;
    } catch(e) {
        return false;
    }
}

var _localStorage = {
    getItem: function(key) {
        if (!hasLocalStorage()) { return null; }
        try {
            return window.localStorage.getItem(key);
        } catch(e) {
            return null;
        }
    },
    setItem: function(key, value) {
        if (!hasLocalStorage()) { return null; }
        try {
            return window.localStorage.setItem(key, value);
        } catch(e) {
            return null;
        }
    }
};

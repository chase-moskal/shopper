/*

code adapted from "locale2" v2.3.1
 - https://www.npmjs.com/package/locale2
 - https://github.com/moimikey/locale2
 - adapted by Chase Moskal (@chase-moskal)

------

The MIT License (MIT)

Copyright (c) 2015 Michael Scott Hertzberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
const global = Function("return this")();
const process = undefined;
function formatLocale(locale) {
    if (typeof locale !== 'string')
        return locale;
    // 'en-US-u-VA-posix'.split('-').slice(0, 2)
    // ["en", "US"]
    return locale.split('-').slice(0, 2).map(function (chunk, index) {
        // en[0]-US[1] <- chunk[1].toUpperCase()
        if (index !== 0 && chunk.length === 2)
            return chunk.toUpperCase();
        return chunk;
    }).join('-');
}
function getLocale(locale) {
    if (locale)
        return locale;
    if (global.chrome && global.chrome.runtime && typeof global.chrome.runtime.getManifest === 'function') {
        locale = global.chrome.runtime.getManifest();
        if (locale && locale.current_locale) {
            return locale.current_locale;
        }
    }
    locale = (global.navigator && ((global.navigator.languages && global.navigator.languages[0]) ||
        global.navigator.language ||
        global.navigator.userLanguage));
    if (!locale && global.navigator && global.navigator.userAgent) {
        locale = global.navigator.userAgent.match(/;.(\w+-\w+)/i);
        if (locale)
            return locale[1];
    }
    if (!locale) {
        locale = (global.clientInformation || Object.create(null)).language;
    }
    if (!locale) {
        if (global.Intl && typeof global.Intl.DateTimeFormat === 'function') {
            locale = global.Intl.DateTimeFormat().resolvedOptions && global.Intl.DateTimeFormat().resolvedOptions().locale;
        }
        if (!locale && ['LANG', 'LANGUAGE'].some(Object.hasOwnProperty, process.env)) {
            return (process.env.LANG || process.env.LANGUAGE || String())
                .replace(/[.:].*/, '')
                .replace('_', '-');
        }
    }
    return locale;
}
export function locale2(locale) {
    return formatLocale(getLocale(locale));
}
//# sourceMappingURL=locale2.js.map
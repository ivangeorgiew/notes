/* Shims and Polyfills */
/* a Shim is a library that brings new API to older environment */
/* a Polyfill checks if a browser supports an API and if it
 * doesn't it installs its own implementation */




/* ECMAScript Internationalization API is
 * like the standard for various things which
 * differ in different countries (currency, 
 * number formatting, precision, date and time 
 * formatting ....)
 * There are methods for conversion to the standard
 */
String.prototype.localeCompare()
Number.prototype.toLocaleString()
Date.prototype.toLocaleString()
Date.prototype.toLocaleDateString()
Date.prototype.toLocaleTimeString()

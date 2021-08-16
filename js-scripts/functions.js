/**
 * checks if expression is null-like or falsy
 * @param {*} x 
 * @returns {Boolean} 
 */
function null0(x) {
    if( x == null || x == 0 || x == undefined ) return true; return false;
}
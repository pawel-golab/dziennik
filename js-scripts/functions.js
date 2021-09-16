/**
 * checks if expression is null-like or falsy
 * @param {*} x 
 */
function null0(x) {
    if( x == null || x == 0 || x == undefined || x == [] ) return true; return false;
}
/**
 * alias of console.log()
 * @param {*} output any expression
 * @returns console.log(output)
 */
function cl(output) {return console.log(output)}
/**
 * add leading 0s to number
 * @param length output string size
 */
Number.prototype.pad = function(length){
    num = this.toString();
    if(length > num.length) return num.padStart(length,'0'); 
    return num;
}
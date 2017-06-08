/* New ways to create Arrays */ 
Array.of(1, 2, 3) === [1, 2, 3]

Array.from(arr, mapFunc)
Array.from(arguments) === Array.prototype.slice.call(arguments);
Array.from(arguments, val => val+1);/* if arguments = { '0': 12, '1': 32 } 
                                       -> 13, 32 */




/* new methods .find(), .findIndex() */

/* typed arrays */

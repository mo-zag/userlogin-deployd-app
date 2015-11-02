/**
 * @file Core node file used to start node server
 * @author Mo Zag <mo_zag@yahoo.co.uk>
 * @version 0.1
 */

/**
* @description 
*	require deployd visit deployd.com for info on how to use it
**/
var deployd = require('deployd'); 


// deployd configurations http://docs.deployd.com/docs/server/as-a-node-module.html
deployd.options = {port: 3000, env:'development', db:{host:'localhost', port:27017, name:'test-app'}};

var dpd = deployd(deployd.options);
// start deployd to listen
dpd.listen();
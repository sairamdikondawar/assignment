const express = require('express')
const app = express();


// exercise1 api to print first, third, second
app.get("/exercise1", (req, response) => {
	console.log("first");
	new Promise((resolve, reject) =>{
	setTimeout(function() {

    console.log("segcond");

}, 5000);
});
console.log("third");
response.status(200, {'Content-Type': 'text/plain'});
	response.send("success");


});

// exercise2 api to remove empty property from json object
app.get('/exercise2', (req, res) => {
	var obj = {
  'name': 'test',
  'list': ['', 'abc', null, 'def', undefined],
  'list 2': [
    { 'deeper': ['hello', '', 'world', '!' ]},
    {},
    { 'deeper': null },
    { 'deeper': 1234, 'deep': { 'deep': { } } }
  ],
  'list-3': [ {}, { 'deep': [] } ]
 };
	var afterClean = removeEmpty(obj);
    res.status(200, {'Content-Type': 'text/plain'});
    res.send(afterClean);
});

app.get('/', (req, res) => {
    res.send("success");
});

// node api listening to port 8080
app.listen(8080, function () {
    console.log("listening on port 8080");
    console.log("server started");
});




function removeEmpty(obj) {
    //Iterating Json object
    Object.keys(obj).forEach(function (key) {
        //checking key and value to be object
        if (obj[key] && obj[key] !== null && typeof obj[key] === 'object') {
            var len = obj[key].length;
            if (len === undefined) {


								var keys = Object.keys(obj[key]);
                //checking length and removing if {}

                if (keys.length == 0) {
									console.log(obj[key]);
                    delete obj[key]
                }
                //object inside object(recursive)
                else
                    removeEmpty(obj[key]);
            } else {
                //check for array
								var objj=obj[key];
								if(objj.length == 0){
									delete obj[key]
								}
                else checkForArray(obj[key]);
            }
        }
        else if (obj[key] === null   ) delete obj[key]

    });
    return obj;
};


function checkForArray(obj) {


    for (var i = 0; i < obj.length; i++) {
        var obj1 = obj[i];
        //omit null and undefined, sending recursive
        if (obj1 != null && obj1 != undefined) {
						console.log(obj1 +"  inside");
            removeEmpty(obj);
        }

    }
}

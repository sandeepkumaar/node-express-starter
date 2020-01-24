const express = require("express");

const router = express.Router();

router.get("/", function(req, res, next) {
	res.json([
		{
			name:"sandeep"
		}
	]);
});

router.post("/create", function(req, res, next) {
	console.log(req.body);
  res.json(req.body);
});

module.exports = router;

var error = function(param) {
  throw new Error(`Missing ${param}`);
}
var required = ({ 
  name = error('name'), 
  age = error('age'), 
  ...options
} = {}) => ({
  name, age, ...options
});


var validator = function(acc, key) {
  var _throw = function(x) { throw Error(x) }
  acc[key] = this.hasOwnProperty(key) ? this[key] : _throw(key);
  return acc;
}

var validate = function(key) {
  var _throw = function(x) { throw Error(x) }
  return this.hasOwnProperty(key) ? this[key] : _throw(key);
}


var required = function(...keys) {
	return function({...args}) {
    for(var i = 0; i < args.length; i++) {
      if(!args.hasOwnProperty(key)) { return throw Error(key); }
    }
    return args;
  }
};


var required = function(...keys) {
  return function({...args}) {
    for(var i = 0; i < keys.length; i++) {

      if(!args.hasOwnProperty(keys[i])) {  throw Error(keys[i]); }
    }
    return args;
  }
};



var validate = function(key) {
  if(!this.hasOwnProperty(key)) { throw Error(key); }
}

var required = function(...keys) {
  return function({...args}, fn) {
    keys.forEach(fn)
    return args;
  }
};

var isDefined = validator('name', 'age')((e) => {
  if() { throw error() }
});

isDefined({name: "", age: ""});

//
var isDefined = validator("name", "age")((val) => {
  check value and throw
})
isDefined({}) // {} or errro



var required = function(...keys) {
  return function({...args}) {
    keys.forEach(function(key) {
      if(!args.hasOwnProperty(key)) {  throw Error(key); }
    });


    return args;
  }
};


var required = function(...keys) {
  return function({...args}) {
    var _throw = function(x) { throw Error(x) }
    return keys.reduce(function(acc, key) {
      acc[key] = args.hasOwnProperty(key) ? args[key] : _throw(key);
      return acc;
    }, {});

    }
};
var integrity = ({name, age, city}) => {
  return typeof name != "string" 
    ? throw TypeError(`"name" is not a string`)
    : typeof age != "number"
    ? throw TypeError(`"name" is not a string`)
    : typeof city != "string"
    ? throw TypeError(`"name" is not a string`)
    : { name, age, city }
    //: {...arguments[0] }
};












var export = function() {
  return required();
}

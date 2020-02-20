## node-express-starter 
Starter template for Restful apis with express 
Includes 
- logger (bunyan)
  - httpLogger containing `req_Id` to track
  - errorLogger  
- req validator 
- common error handler
- auth middleware
- load configs based on env
- feature/module wise folder structure
- db connection
- test cases for api

## Quick start
```
$ npm install
$ npm start // runs in prod mode
```

## Commands
```
$ npm run dev // runs in dev mode
```

## Dev features 
- nodemon 
- logger at debug level. logs to stdout and logs/dev.log


## Branches


## Dependencies
### Bunyan
why?
- JSON format, easier for processing
- built-in cli Bunyan allows easier log inspection 

Note when logging:  
log parameters takes
- object that is merged with the logger props
- string that goes into `message` 
- anything after string is stringified along with `message`
The order should be maintained.  
```
log.info(obj={}, msg="", ...rest);
//outputs
logRecord = {
  ...obj
  msg: "" + ...rest.toSting(),
}

// Example
log.info({person:{name:"sandeep"}, y:"kumaar"}, msg="input person", {e: "somevalue");
logRecord = {
  person: {
    name: "sandeep"
  },
  y: "kumaar",
  msg: "input person {e: 'somevalue'}": 
}
```

#### opinions 
- loglevels based on env prod=info, dev=debug
- logger for each module/concern
- log rotation handled by external tools. rotation logic is not app's concern
its the container's concern

#### inspect log
```
# filter log based on `req_Id`
$ bunyan logs/app.log -c "this.res && this.res.req_Id ==2" -o json

# show logs from a particular module 
$ bunyan logs/app.log -c "this.name=='user'" -o json
```
the above filter in conjuction with `json` module can do log processing too

## object validator

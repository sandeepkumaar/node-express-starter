## Aim
Starter template for RESTful app with Expressjs 
Includes 
- http logger (morga) 
- app logger (bunyan)

## Requirements
- Start server options from command args 
- folder structure in terms of modules. ie. each individual modules can  
run indepently
- MVC architecture ?? 
- usefull middlewares. error handling. redirection techniques, precall-postcall
- logging utils. follow standard logging formats. Justify use
- Extension to third party integrations : db connection, 

## Dev requirements
lint on save
re-start server on save??? or re-start on test success

## Test
All middleware should return otherwise server hangs 

## Forks
1. db connection
2. authentication
3. workers, micro-services


## Bunyan
why?
- JSON format, easier for processing
- Save all the required details in log as json, and format/filter them as needed as a separate
process thru cli; Bunyan-cli. 

### Things to note
```
log.info(obj={}, msg="", ...rest);

//outputs
logRecord = {
  msg: "" + ...rest,
  ...obj
}
```
since  `obj` is Object.assigned it would override with built-in prperties. 
To avoid always provide ur namespace.

### Log levels
- use only debug, info, error log levels
- dev log level: debug
- prod log level: info
- logger name => module name or concern
- for dev, log to stdout (default)
- for prod, log to a file. both error and output to same file


- use logger for every module
- logger levels are decided by environmnents. prod=info dev=debug




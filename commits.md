## commits 

### set up server 

Minimal setup. Server starts art port 8000. 
Need to provide port option from commandline

```
node index.js -p 9090
```

### Add http logger 
ref: https://github.com/expressjs/morgan/issues/40
```
npm install morgan --save
```
Log Purpose: 
- debugging
- analysis 
- parseable

req: 
- id
- date
- remote-addr
- remote-user
- method
- url
response: 
- id
- date
- res content-length
- res time

### Define routes 

### Add json parse support

### Error handling middlewares, write your own

### Routes as individual modules

### Test case?? 

### Build tool
---------------------------------------

### Tips for rest architecture
HTTP methods
program to resources

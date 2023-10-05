# Test cases of getName

## **getName(number)**

The method searches the given phone number from the registry. If the number is found, method returns the owner of that number as on object:

```json
{"firstname":"", "lastname":""}
```

If no phone with given number is found, the method returns `null`.
If the parameter is missing, `null` is also returned.

## Tests

All tests use default data

### Test getName for number '12345678' 
returns 
```json
{"firstname":"Leila", "lastname":"Hökki"}
```

### Test numbers
```json
testvalues=[
    //number         expectedResult
    ["05040302",{"firstname":"Leila", "lastname":"Hökki"}],
    ["040981265",{"firstname":"Matt", "lastname":"River"}]
]
```

### testing wrong number

call with "0000"
returns `null`

### testing missing parameter
returns `null`



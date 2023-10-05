# Test cases of getPersonsNumbersByType

## **getPersonsNumbersByType(firstname,lastname,type)**

Method returns an array of phone numbers of the given `type` belonging to given person with `firstname` and `lastname`.

For example Leila Hökki and work:
```json
["87654321","05040302"]
```

Matt River and mobile:
```json
["040981265"]
```

if no person with given name is found, an empty array [] is returned.
if no number with given type is found, an empty array [] is returned.
if at least one parameter is missing, an exception `missing parameter` is thrown.


## Tests

All tests use the default data

### Test 1. Leila Hökki and work
returns

```json
["87654321","05040302"]
```
### Test 2. Matt River and mobile

returns 
```json
["040981265"]
```

### Test 3 wrong type or name
test with values
-   firstname Matt, lastname River, type x
-   firstname Matt, lastname x, type mobile
-   firstname x, lastname River, type is mobile

returns []

### Test 4 parameter missing
1 parameter missing: `Matt`,`River`
2 parameters missing: `Matt`
All parameters missing

throws exception `missing parameter`

### Test 5: testing empty srting as type using modified data

```json
[
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home","number":"12345678"},
            {"type":"", "number":"87654321"},
            {"type":"home", "number":"05040302"}
        ]
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[
            {"type":"work", "number":"2468159"}
        ]
    }
]
```
Leila Hökki and ""

returns 
```json
["87654321"]
```
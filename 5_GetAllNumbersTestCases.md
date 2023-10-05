# Test cases of getAllNumbers

## **getAllNumbers()**
Returns all phone numbers in an array, each as an object of form:

```json
{"firstname":"", "lastname":"", "phones":[]}
```

The phone object in phones array is of form:

```json
{"type":"", "number":""}
```

If a person doesn't have a phone (the phone field is an empty array), then the person is not added into the result array. If all persons are missing, an empty array is returned.

## Tests

### Testing with default data

returns same array that was used to create the register

### Testing some phones missing

testData:
```json
[
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home","number":"12345678"},
            {"type":"work", "number":"87654321"},
            {"type":"work", "number":"05040302"}
        ]
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[]
    }
]
```

returns:
```json
[
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home","number":"12345678"},
            {"type":"work", "number":"87654321"},
            {"type":"work", "number":"05040302"}
        ]
    }
]
```

### Testing some phones missing 2

testData:
```json
[
    {
        "firstname":"Vera",
        "lastname":"River",
        "phones":[]
    },
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home","number":"12345678"},
            {"type":"work", "number":"87654321"},
            {"type":"work", "number":"05040302"}
        ]
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[]
    }
]
```

returns:
```json
[
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[
            {"type":"home","number":"12345678"},
            {"type":"work", "number":"87654321"},
            {"type":"work", "number":"05040302"}
        ]
    }
]
```

### Testing all phones missing

testData:
```json
[
    {
        "firstname":"Vera",
        "lastname":"River",
        "phones":[]
    },
    {
        "firstname":"Leila",
        "lastname":"Hökki",
        "phones":[]
    },
    {
        "firstname":"Matt",
        "lastname":"River",
        "phones":[]
    }
]
```

returns []

### Testing all persons missing

Testdata is an empty array []
returns []

### Testing with empty type

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
        "firstname":"Vera",
        "lastname":"River",
        "phones":[]
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

returns 
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
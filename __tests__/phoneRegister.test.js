'use strict';

const PhoneRegister = require('../phoneRegister');
const phones = require('../phones.json');

describe('Testing constructor', ()=>{
    test('Missing parameter throws an exception', ()=>{
        expect(() => new PhoneRegister()).toThrow('phone data missing');
    });
});

describe('Testing getTypes', ()=>{
    test('getType from default data json',()=>{
        const register=new PhoneRegister(phones);
        expect(register.getTypes()).toEqual(['home','work','mobile']);
    });

    test('getType from default data json', () => {
        const register = new PhoneRegister(phones);
        const expectedResult = ['home', 'work', 'mobile'];

        expect(register.getTypes()).toEqual(expectedResult);
    });

    test('getType with empty type in modified data json',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "", "number": "87654321" },
                    { "type": "home", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": [
                    { "type": "work", "number": "2468159" }
                ]
            }
        ];
        const expectedResult = ["home", "", "work"];
        const register=new PhoneRegister(testData);
        expect(register.getTypes()).toEqual(expectedResult);
    });

    test('Only home phones', ()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "home", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": [
                    { "type": "home", "number": "2468159" }
                ]
            }
        ];

        const register=new PhoneRegister(testData);
        expect(register.getTypes()).toEqual(['home']);
    });

    test('person have no phones',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": []
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": []
            }
        ];

        const register=new PhoneRegister(testData);
        expect(register.getTypes()).toEqual([]);
    });

    test('No persons',()=>{
        const register=new PhoneRegister([]);
        expect(register.getTypes()).toEqual([]);
    });
});

describe('Testing getPersonsNumbersByType',()=>{
    const register=new PhoneRegister(phones);

    describe('Tests 1-3',()=>{
        const testValues=[
            //fn        ln       type       result
            ['Leila', 'Hökki', 'work', ["87654321", "05040302"]],
            ['Matt', 'River', 'mobile', ["040981265"]],
            ['Matt', 'River', 'x', []],
            ['Matt', 'x', 'mobile', []],
            ['x', 'River', 'mobile', []]
        ];

        test.each(testValues)('%s, %s, %s returns %s',(fn,ln,type,result)=>{
            expect(register.getPersonsNumbersByType(fn,ln,type)).toEqual(result);
        });
    });
    describe('Test 4 parameter missing',()=>{
        test('1 parameter missing',()=>{
            expect(() => register.getPersonsNumbersByType('Matt', 'River'))
                .toThrow('missing parameter');
        });

        test('2 parameters missing', ()=>{
            expect(() => register.getPersonsNumbersByType('Matt'))
                .toThrow('missing parameter');
        });

        test('All parameters missing',()=>{
            expect(() => register.getPersonsNumbersByType())
                .toThrow('missing parameter');
        });
    });
    describe('Test 5: testing empty srting as type using modified data',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "", "number": "87654321" },
                    { "type": "home", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": [
                    { "type": "work", "number": "2468159" }
                ]
            }
        ];

        test('Test firstname:Leila, lastname:Hökki and type:""',()=>{
            const modifiedregister=new PhoneRegister(testData);
            expect(modifiedregister.getPersonsNumbersByType('Leila','Hökki',''))
                .toEqual(["87654321"]);
        });
    });

    describe('Testing getAllNumbersByType',()=>{
        describe('Test with default data', ()=>{
            const register=new PhoneRegister(phones);

            test('Testing type:work', ()=>{
                const expectedResult = [
                    { "firstname": "Leila", "lastname": "Hökki", 
                        "number": { "type": "work", "tel": "87654321" } },
                    { "firstname": "Leila", "lastname": "Hökki", 
                        "number": { "type": "work", "tel": "05040302" } },
                    { "firstname": "Matt", "lastname": "River", 
                        "number": { "type": "work", "tel": "2468159" } }
                ];

                expect(register.getAllNumbersByType('work'))
                    .toEqual(expectedResult);
            });

            test('Testing type:mobile', ()=>{
                const expectedResult = [
                    { "firstname": "Matt", "lastname": "River", 
                        "number": { "type": "mobile", "tel": "040981265" } }
                ];

                expect(register.getAllNumbersByType('mobile'))
                    .toEqual(expectedResult);
            });

            test('Testing type:x',()=>{
                expect(register.getAllNumbersByType('x')).toEqual([]);
            });

            test('Testing type:"" with default data', ()=>{
                expect(register.getAllNumbersByType('')).toEqual([]);
            });

            test('testing missing parameter',()=>{
                expect(() => register.getAllNumbersByType())
                    .toThrow('missing parameter');
            });
        });

        describe('Test with modified data', ()=>{
            const testData = [
                {
                    "firstname": "Leila",
                    "lastname": "Hökki",
                    "phones": [
                        { "type": "home", "number": "12345678" },
                        { "type": "", "number": "87654321" },
                        { "type": "home", "number": "05040302" }
                    ]
                },
                {
                    "firstname": "Matt",
                    "lastname": "River",
                    "phones": [
                        { "type": "work", "number": "2468159" }
                    ]
                }
            ];

            test('testing type ""', ()=>{
                const register=new PhoneRegister(testData);
                const expectedResult = [
                    { "firstname": "Leila", "lastname": "Hökki", 
                        "number": { "type": "", "tel": "87654321" } }
                ];

                expect(register.getAllNumbersByType(''))
                    .toEqual(expectedResult)
            });

        });
    });  
});

describe('Test cases of getAllNumbers', ()=>{
    test('Testing with default data',()=>{
        const register=new PhoneRegister(phones);
        expect(register.getAllNumbers()).toEqual(phones);
    });

    test('Testing some phones missing',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "work", "number": "87654321" },
                    { "type": "work", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": []
            }
        ];
        const expectedResult = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "work", "number": "87654321" },
                    { "type": "work", "number": "05040302" }
                ]
            }
        ];
        const register=new PhoneRegister(testData);
        expect(register.getAllNumbers()).toEqual(expectedResult);
        // expect(register.getAllNumbers()).toEqual(testData[0]);
    });

    test('Testing some phones missing 2',()=>{
        const testData = [
            {
                "firstname": "Vera",
                "lastname": "River",
                "phones": []
            },
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "work", "number": "87654321" },
                    { "type": "work", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": []
            }
        ];

        const expectedResult = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "work", "number": "87654321" },
                    { "type": "work", "number": "05040302" }
                ]
            }
        ];
        const register = new PhoneRegister(testData);
        expect(register.getAllNumbers()).toEqual(expectedResult);
    });

    test('Testing all phones missing',()=>{
        const testData = [
            {
                "firstname": "Vera",
                "lastname": "River",
                "phones": []
            },
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": []
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": []
            }
        ];

        const register = new PhoneRegister(testData);
        expect(register.getAllNumbers()).toEqual([]);
    });

    test('Testing all persons missing',()=>{
        const register=new PhoneRegister([]);
        expect(register.getAllNumbers()).toEqual([]);
    });

    test('Testing with empty type', ()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "", "number": "87654321" },
                    { "type": "home", "number": "05040302" }
                ]
            },
            {
                "firstname": "Vera",
                "lastname": "River",
                "phones": []
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": [
                    { "type": "work", "number": "2468159" }
                ]
            }
        ];

        const expectedResult = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "", "number": "87654321" },
                    { "type": "home", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": [
                    { "type": "work", "number": "2468159" }
                ]
            }
        ];
        const register = new PhoneRegister(testData);
        expect(register.getAllNumbers()).toEqual(expectedResult);
    });
});

describe('Test cases of getName',()=>{
    const register=new PhoneRegister(phones);

    test('Test getName for number "12345678"', ()=>{
        expect(register.getName('12345678'))
            .toEqual({ "firstname": "Leila", "lastname": "Hökki" });
    });

    const testValues = [
        //number         expectedResult
        ["05040302", { "firstname": "Leila", "lastname": "Hökki" }],
        ["040981265", { "firstname": "Matt", "lastname": "River" }]
    ];

    test.each(testValues)('number %s returns %p', (number,expectedResult)=>{
        expect(register.getName(number)).toEqual(expectedResult);
    });

    test('testing wrong number', ()=>{
        expect(register.getName('0000')).toBeNull();
    });

    test('testing missing parameter', ()=>{
        expect(register.getName()).toBeNull();
    });
});
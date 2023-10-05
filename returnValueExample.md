### **getPersonsNumbersByType(firstname,lastname,type)**

Here are possible variations to return values

```json
{
    "ok":true,
    "result":["87654321","05040302"],
    "message":""
}
```
```json
{
    "ok":false,
    "result":[],
    "message":"No person with given name"
}
```
variation 2:

```json
{
    "ok":true,
    "result":["87654321","05040302"]
}
```
```json
{
    "ok":false,
    "message":"No person with given name"
}
```
variation 3:

```json
{
    "ok":true,
    "result":["87654321","05040302"]
}
```
```json
{
    "ok":false,
    "result":"No person with given name"
}
```
# 🔗 MongoDB Connection String Example

## Original Connection String (MongoDB Atlas se milega):
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Edited Connection String (Database name add karo):
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/petcare?retryWrites=true&w=majority
```

## Important Points:
1. `username` - Apne database user ka username
2. `password` - Apne database user ka password
3. `cluster0.xxxxx` - Aapka cluster name
4. `/petcare` - Database name (yeh add karna hai)

## Example:
Agar aapka:
- Username: `myuser`
- Password: `mypass123`
- Cluster: `cluster0.abc123`

To connection string hoga:
```
mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/petcare?retryWrites=true&w=majority
```

**Yeh connection string save kar lo - Render deploy ke time use hoga!**


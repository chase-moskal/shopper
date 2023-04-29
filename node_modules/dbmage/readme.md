
<br/>

# 🧙‍♂️ dbmage

📦 `npm install dbmage`

### database abstraction layer

&nbsp; 🗄️ **crud** – create, read, update, delete  
&nbsp; 📗 **mongo driver** – store your data  
&nbsp; 🧪 **memory driver** – emulate your database  
&nbsp; 💾 **file driver** – keep your data in a json file  
&nbsp; 🔖 **localStorage driver** – stow your data in-browser  
&nbsp; 🔮 **flex driver** – store your data anywhere  
&nbsp; 📜 **transactions** – keep your data safe  
&nbsp; 🎟️ **rando** – randomly generate 256-bit ids  
&nbsp; 🔬 **typescript** – painstakingly engineered types  
&nbsp; 💖 **free and open source** – just for you  

### dbmage makes our apps database-agnostic

dbmage provides our apps with a straightforward interface to communicate with the database. dbmage is designed to be compatible with both nosql and sql databases. at the moment, we've only implemented the `mongo` driver (though a `postgres` driver would be an awesome contribution).

the memory driver allows us to fully emulate our database, which is very useful for writing good tests. in each test, we can pass our app a dbmage database which uses the memory driver.

the localStorage driver is also interesting. in the [xiome](https://github.com/chase-moskal/xiome) project, we use a dbmage localStorage database, and this powers our amazing "mock mode". this is how we run the entire application (including the backend) on the clientside during development. developers don't need the hassle of connecting to a real database, and wiping the database is as easy as `localStorage.clear()`. it's a really cool developer experience that makes debugging a total breeze (we can debug the frontend and backend in the same debugger, imagine the stack traces!)

<br/>

## 🧪 let's play with a dbmage in-memory database

make a memory database
```js
import * as dbmage from "dbmage"
import {find, and, or} from "dbmage"

const database = dbmage.memory({
  // tell dbmage about the shape of your database schema
  shape: {
    myTable: true,
  },
})

```
insert a row
```js
await database.tables.myTable.create({
  userId: 1,
  email: "user1@example.com",
})
```
insert more rows
```js
await database.tables.myTable.create(
  {userId: 2, email: "user2@example.com"},
  {userId: 3, email: "user3@example.com"},
)
```
read all rows in a table
```js
const rows = await database.tables.myTable.read({conditions: false})
```
read one particular row
```js
const row = await database.tables.myTable.readOne(find({userId: 1}))
```
read with fancy conditions
```js
const rows2 = await database.tables.myTable.read({
  conditions: or(
    {search: {email: /example\.com$/i}},
    and(
      {greater: {userId: 0}},
      {less: {userId: 999}},
    ),
  ),
})
```
read rows with pagination controls
```js
const rows3 = await database.tables.myTable.read({
  conditions: false,
  limit: 10,
  offset: 5,
  order: {userId: "descend"},
})
```
update a row
```js
await database.tables.myTable.update({
  ...find({userId: 1}),
  write: {email: "superuser1@example.com"},
})
```
delete a row
```js
await database.tables.myTable.delete(find({userId: 2}))
```
count rows
```js
const count = await database.tables.myTable.count({conditions: false})
```
transactions? even in-memory? you betchya!
```js
const result = await database.transaction(async({tables, abort}) => {
  await tables.myTable.delete(find({userId: 1}))
  await tables.myTable.create({userId: 4, email: "user4@example.com"})
  const result = await tables.myTable.count({conditions: false})
  return result
})
```

### you can nest tables arbitrarily

```js
import * as dbmage from "dbmage"

const database = dbmage.memory({
  shape: {
    alpha: {
      bravo: {
        charlie: true,
      },
    },
  },
})

// the table would be named "alpha_bravo_charlie"
await database.tables.alpha.bravo.charlie.create({userId: 1})
```

### typescript makes everything better

```ts
import * as dbmage from "dbmage"

type MyDatabaseSchema = dbmage.AsSchema<{
  myTable: {
    userId: number
    email: string
  }
}>

const database = dbmage.memory<MyDatabaseSchema>({
  shape: {
    myTable: true,
  },
})
```

<br/>

## 📗 connect to `mongo`, for real

```js
import mongodb from "mongodb"
import * as dbmage from "dbmage"

const database = dbmage.mongo({
  dbName: "mydatabase",
  client: await new mongodb.MongoClient("mongodb://root:example@mongo:27017/").connect(),
  shape: {
    myTable: true,
  },
})
```

<br/>

## 🔖 use `localStorage` as a database (in browser)

```js
import * as dbmage from "dbmage"

const database = dbmage.localStorage({
  shape: {
    myTable: true,
  },
})
```

<br/>

## 💾 use a `json file` as a database (in node)

```js
import {file} from "dbmage/x/drivers/file.js"

const database = file({
  path: "./database.json",
  shape: {
    myTable: true,
  },
})
```

<br/>

## 😈 the devil is in the details

### conditions

`read`, `readOne`, `update`, `delete`, and `count`, all share the same `conditions` option.
- you can set `{conditions: false}`, to interact with *all* rows in a table
  - eg, `table.read({conditions: false})`
  - eg, `table.delete({conditions: false})`
- if you provide conditions, they should be wrapped in `and` or `or`
  - eg, `table.read({conditions: and({equal: {userId: 1}})})`
  - you can nest `and` and `or`'s together to make complex queries
    ```js
    table.read({
      conditions: and(
        or(
          {equal: {userId: 1}},
          {equal: {email: "user1@example.com"}},
        ),
        or({greater: {userId: 0}}),
      )
    })
    ```
  - `and` and `or` are merely shortcuts for `["and", ...conditions]` and `["or", ...conditions]` respectively
- `find({userId: 1})` is a shortcut for `{conditions: and({equal: {userId: 1}})}`
- `findAll(userIds, userId => ({userId}))` is a shortcut for finding an array of items

here are conditions you can use
- `{set: {userId: true}}` – check userId is not undefined or null
- `{equal: {userId: 2}}` – check if userId is equal to 2
- `{less: {userId: 2}}` – check if userId is less than 2
- `{lessy: {userId: 2}}` – check if userId is less or equal to 2
- `{greater: {userId: 2}}` – check if userId is greater than to 2
- `{greatery: {userId: 2}}` – check if userId is greater or equal to 2
- `{search: {email: "@example.com"}}` – check if email includes "@example.com" (you can use a regex instead)

also, all conditions have a `not` version that checks the opposite
- `{notSet: {userId: true}}`
- `{notEqual: {userId: 2}}`
- `{notLess: {userId: 2}}`
- `{notLessy: {userId: 2}}`
- `{notGreater: {userId: 2}}`
- `{notGreatery: {userId: 2}}`
- `{notSearch: {email: "@example.com"}}`

### updates

there are a few different types of updates

- `write` – add/replace fields (leaving other fields intact)
  ```js
  await table.update({
    ...find({userId: 1}),
    write: {
      email: "superuser1@example.com",
    },
  })
  ```
- `whole` – replace whole rows entirely
  ```js
  await table.update({
    ...find({userId: 1}),
    whole: {
      userId: 1,
      email: "superuser1@example.com",
    },
  })
  ```
- `upsert` – insert a new row, or wholly replace it
  ```js
  await table.update({
    ...find({userId: 1}),
    upsert: {
      userId: 1,
      email: "superuser1@example.com",
    },
  })
  ```

you should know there's also an assert helper
- `assert` helper
  ```js
  assert(
    database.tables.accounts,
    find({userId: 1}),
    async make() {
      const row = {userId: 1, isAdmin: false}
      await database.tables.privileges.create(row)
      return row
    },
  )
  ```
- the difference between this and `upsert`, is that here you can do database work when the row is not found
- it's just a shortcut for doing a `readOne` followed by a `create`

### binary ids

databases can query more efficiently with binary identifiers than strings.

for this, you should use dbmage's `Id` class, which stores ids in a 256-bit binary format.

- first, let's randomly generate a new id
  ```js
  import {getRando, find, Id} from "dbmage"

  const rando = await getRando() // magically works in node and in-browser
  const userId = rando.randomId() // gives you a dbmage Id instance
  ```
- now we can store this in our table, and efficiently query it
  ```js
  await table.create({userId})
  const row = table.readOne(find({userId})) // oh so fast!
  ```
- the `Id` instance has a handy `toString()` method for converting to hexadecimal
  ```js
  const hex = userId.toString()
    // 5a9bfbb37fbeb93fe2bd930963018fba12cbed3bd1f40d958345b20af7d9966c
  ```
- and of course `Id.fromString()` for going the other way
  ```js
  const id = Id.fromString(hex)
  ```
- rando also has a secure string compare function (keeps you safe from timing attacks)
  ```js
  rando.compare(
    id1.toString(),
    id2.toString(),
  )
  ```

<br/>

## 🛠️ handy helpers

### subsection

sometimes you don't want to be passing your whole database down to all your app's subsystems.

so you can carve off a subsection to pass relevant pieces along.

```js
import * as dbmage from "dbmage"

const database = dbmage.memory({
  shape: {
    areaAlpha: {
      table1: true,
      table2: true,
    },
    areaBravo: {
      table3: true,
      table4: true,
    },
  },
})

const alphaDatabase = dbmage.subsection(database, tables => tables.areaAlpha)

// alphaDatabase has no access to areaBravo table3 or table4
await alphaDatabase.tables.table1.create({data: 1})

// importantly, transactions work here
await alphaDatabase.transaction(async({tables, abort}) => {
  await tables.table1.create({data: 2})
})
```

### fallback

you can use fallback to set immutable rows underlying a table.

during `read`, `readOne`, and `count` operations, the fallback will be considered.

```js
import * as dbmage from "dbmage"

const database = dbmage.memory({
  shape: {
    alphaTable: true,
  }
})

const combinedTable = dbmage.fallback({
  table: database.tables.alphaTable,
  fallbackRows: [{userId: 1}],
})

await combinedTable.create({userId: 2})

// the combined tables appears to contain the fallbackRows
const rows = await combinedTable.read({conditions: false})
console.log(rows)
 //> [{userId: 1}, {userId: 2}]

// we can use a subsection to make this work in transactions
const combinedDatabase = dbmage.subsection(database, tables => ({
  ...tables,
  alphaTable: fallback({
    table: tables.alphaTable,
    fallbackRows: [{userId: 1}],
  })
}))
```

### constraints

you can apply a constraint on a table, which acts like a namespace.

a constrained table cannot escape its constraint.

we use this to constrain database operations to a particular app, in a multi-app system.

```js
import * as dbmage from "dbmage"

const database = dbmage.memory({
  shape: {
    alphaTable: true,
    bravoTable: true,
  }
})

const alphaForApp4 = dbmage.constrain({
  table: database.tables.alpha,
  constraint: {appId: 4},
})

const alphaForApp5 = dbmage.constrain({
  table: database.tables.alpha,
  constraint: {appId: 5},
})

// we can create a row for app4
await alphaForApp4.create({userId: 1})

// and app5 cannot find it
const user = await alphaForApp5.readOne(find({userId: 1}))

// also, you can apply a constraint on a whole tree of tables
const tablesForApp4 = dbmage.constrainTables({
  tables: database.tables,
  constraint: {appId: 4},
})

// create a database subsection to apply a constraint that works in transactions
const databaseForApp4 = dbmage.subsection(database, tables => constrainTables({
  tables,
  constraint: {appId: 4},
}))
```

<br/>

## 💖 made with open source love

please consider contributing by posting github issues to ask questions, file bugs, or making suggestions

&nbsp; 🍻 chase

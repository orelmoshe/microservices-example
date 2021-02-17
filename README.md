# micro-services-example

---

technologies: Node.js , JavaScript(es6) , MongoDB , PM2 (as process manager);

---

# Create express.js: “Server1”

a. Add a connection to MongoDB

b. Create Users schema: (username: test, password: test)

c. Add Authentication via passport.js (JWT)

d. Send data & requests to “Server2” with AES encryption

e. Receive the data from “Server2”, decrypt it and send to the client

f. Add Audit log Schema for create, update and delete operations

---

# Create express.js “Server2”

a. Create Settings schema: (key: String, value: JSON)

b. JSON: {“a”: {“b”: {“c”: “d”} } } - some nested json

c. Get the data from Server1, decrypt it and save to MongoDB

---

# Create express.js “apiGateway”

a. Create a Proxy routes

---

# Handle 4 routes: (for one row only in Settings collection)

a. Get

b. Create (only if not exist)

c. Edit

d. Delete

---

# routs:

- users:

post : "/register"

post : "/login"

- CRUD API - Settings

get : "/get-settings"

router.post : "/add-setting"

router.put : "/set-setting"

router.delete : "/delete-setting/:id"

---

## Reflection Questions

### 1. Why is it beneficial to separate your routes, models, and database connection into different directories?

Separating routes, models, and database connections makes the application easier to organize, maintain, debug, and scale. Each directory has a specific responsibility:

- **Routes (`routes/`)** handle HTTP requests and responses.
- **Models (`models/`)** define the structure of the data and enforce validation rules.
- **Database (`db/`)** manages the connection to MongoDB.

Separating these parts keeps the code organized and prevents `server.js` from becoming overcrowded. It also makes it easier to find and fix errors, update specific parts of the application, and add new features without having to change the entire program.

### 2. What is the difference between `PUT` and `PATCH` HTTP methods, and which one does your `PUT /:id` endpoint more closely resemble?

`PUT` is used to replace an entire resource, while `PATCH` updates only specific fields. My `PUT /:id` endpoint behaves more like `PATCH` because it only changes the fields provided in the request and leaves everything else unchanged.

### 3. In the `DELETE` route, what is a good practice for the response you send back to the client after a successful deletion? Should you send the deleted object, a simple success message, or something else? Why?

After a successful deletion, it's good practice to return a status code and a simple confirmation message. My DELETE endpoint returns `200 OK` with `"Book deleted successfully."` There's no need to return the entire deleted object when a message is enough.

# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

All requests passed testing

### Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- ESLint with Airbnb config
- Prettier
- Nodemon
- validator

project pitch video link: https://www.loom.com/share/bb82e183d58547eba479b8ee794d8418

leaving this here from app cause previous project stages
needed it in my project even though it was commented out?
// HAD TO ADD THIS TO BE ABLE TO SUBMIT MY PROJECT
// app.use((req, res, next) => {
// if (!req.user) {
// req.user = {
// \_id: "5d8b8592978f8bd833ca8133",
// };
// }
// next();
// });

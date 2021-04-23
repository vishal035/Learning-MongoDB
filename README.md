# learning-mongoDB

It's a task manager API
The first User has to create or log in to view or create any task he owns. All the task and user data are stored in MongoDB Atlas (By using Mongoose Library), at the time of account creation a welcome mail is sent to the user ( By Sendgrid ), all the routes are handled by ExpressJS.

user can also upload their profile image.



To run this project follow these commands
Make sure you have your own sendgrid api key and jwt sceret word ready in .env file
//After cloning the directory,

---For Dev Server
cd learning-express-mongoDB && npm i && npm run dev

--For Testing
npm run test



For Testing the functionality of the API I have used jest and supertest

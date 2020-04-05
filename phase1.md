This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
We used react-semantic-ui library in this project

# StudyHub

Welcome to StudyHub, here are some main features of our project:

## `Home (Login/Signup) Page`
There is a button at the bottom of the home page to switch between Login and Signup page.
### `Login Page`
We have two types of user: admin and regular users.
The username and password for these two types of users are as follows:
- regular user:<br />
username: user <br />
password: user <br />
- admin user: <br />
username: admin <br />
password: admin <br />

### `Signup Page`
Currently the signup feature is unavaible since we need to store the user data.<br>
However, all fields required for signup have been displayed in the signup box.

## `Regular User`
Our primary focus is on regular user interaction in phase 1. <br />
We have developed the following view for regular users:

### `Navigation Bar`
In the Navagation Bar, a regular user can access the following view: <br />
Dashboard, Billboard, Ranking and Profile. <br />
A regular user can also logout by clicking the "Log Out" button on the rightside of the Navigation Bar.

### `Dashboard`
In th Dashboard, a regular user can access all courses he is currently taking and teaching. <br />
Only CSC309A is currently avaiable, but all like button functions correctly. <br />

A regular user can also enroll new courses by clicking the plus button on the top right corner. <br />
A following pop window will show, and a regular user can fill in course information, check the Terms&Conditions <br />
and finally sumbit his request to enroll a new course. The newly added course will show up in the dashboard.

### `Course Page`
After clicking enter on CSC309A, a regular user can access the course page.
There are several features inside each course page:
1. Chat room: regular users can communciate inside the course page
2. Course Instructor Information: every regular user who enrolled this course can access the instructor information by clicking the profile icon next to the coourse title
3. Announcement: regular users can click on Announcement tab to view each announcement on the leftside of the chat room 
4. Resources: regualr users can click on Resource button to access course resources. Both icon and list view are avaiable. 

### `BillBoard`
BillBoard functions like website chat room, where every regular user can communicate with each other.

### `Ranking`
Ranking page has top three courses that has most likes. Currently all courses are hardcoded.

### `Profile`
Profile page has all user inforamtion. 

## `Admin User`
Admin page has two views only. An admin user has only one obligation - remove. <br />
An admin user can remove any regular user. <br />
An admin user can remove any content inside a course page. <br />
An admin user can remove any content inside a billboard. <br />
All these actions are done due to a regular user might upload irrelavent resources to the website. 

# ReactApp Instructions
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



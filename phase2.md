
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Also, react-semantic-ui library is used in this project (https://react.semantic-ui.com/)

# StudyHub

Welcome to StudyHub.

Currently two mirrors of the app is hosted, while the data is separated from each other. 
1. [shub.junhao.ca](http://shub.junhao.ca)
The app and database servers are hosted on a Raspberry 4B server with 4GB ram and 128G storage. Using this site, user can freely upload large file without worry the server quota. By using this site, we also eliminate the uncertainty of third-party provided services. 
2. [uoftstudyhub.herokuapp.com](http://uoftstudyhub.herokuapp.com)
The app is hosted on the [Heroku platform](http://heroku.com) while the database server is provided by [MongoDB Atlas]([https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)). The app has a limit of 500MB, so uploading large files can easily overflow the usage. (This mirror is for backup purpose only, in the case that I kick my Raspberry Pi under the desk, again...)
## `Home (Login/Signup) Page`
There is a button at the bottom of the home page to switch between Login and Signup page.
### `Login Page`
We have two types of user: admin and regular users.
The demo username and password for these two types are set up as follows:
- Regular user:<br />
1. Username: user 
Password: user <br /><br />
2. Username: user2
Password: user2 <br /><br />
- Admin user: <br />
Username: admin 
Password: admin <br />

### `Signup Page`
Currently the signup feature is now working. All fields required for signup have been displayed in the signup box. Whenever the user clicks the "Signup" button on the client app, it will make a request to the server. The server will create a tuple in the Mongoose Database according to the body of the request, and return a result of either success or failure.

## `Regular User`
We have implemented most of the features mentioned in the project proposal:

### `Navigation Bar`
In the Navigation Bar, a regular user can access the following views: <br />
Dashboard, Billboard, Rankings and Profile. <br />
A regular user can also logout by clicking the "Log Out" button on the right side of the Navigation Bar.

### `Dashboard`
In the Dashboard, a regular user can access all courses she/he is currently taking and teaching. <br />

The user can also create or enroll courses by clicking the yellow "Plus" Button on the upper right of the page. 
A pop window will show, and a regular user can fill in course information, check the Terms & Conditions, and submit the request to create/enroll a course. The newly added course will show up on the dashboard.

### `Course Page`
After clicking enter on any courses, a regular user can access the course page.
There are several features inside each course page:
1. Chat room: Regular users can chat with other enrolled users on the course page
2. Course Instructor Information: Regular users can access the instructor information by clicking the profile icon next to the course title
3. Announcement: Regular users can click on Announcement tab to view each announcement on the left side of the chat room. The course create can post announcements and remove them by clicking an "X" Button when needed.
4. Resources: Regular users can click on Resource button to access course resources. Both icon and list view are available. Admin users can upload files to the course up to a limit of 500M.

### `BillBoard`
Billboard functions is similar to the chat room, where every regular user can communicate with each other. The features of the billboard is stripped down compared to the in-course chatroom, on purpose.  In such way, we degrade the experience of chatting globally and encourage users to create/enroll into courses. Then they can chat inside the course, share resources, and have a closer connection.

### `Ranking`
The ranking page not only ranks the courses that have most likes, but also ranks the users based on how many courses they have created so far. Only the first 8 items will be listed for performance optimization and a clean appearance. 

### `Profile`
The profile page has all user information. The user is free to:
1. Modify her/his general information such as gender, GPA and Field of Study.
2. Modify her/his password.
3. Remove courses from her/his dashboard.

## `Admin User`
Admin page has two views only.  <br />
An admin user can view all user profiles and remove any regular user when needed. 
An admin user can remove any content inside a billboard.
All these actions are done due to a regular user might upload irrelevant resources to the website. 

# Hosting Locally
Although we have set up two mirrors to access the app, the instructions for hosting the application locally on the machine is shown below.

### `npm run build-run`

Runs the app (both back-end and front-end)on port 80. <br />
Open [http://localhost:80](http://localhost:80) to view it in the browser.

# Client Side ReactApp Instructions
The instructions for launching the client-side application are shown below. All the instructions are assumed to be run under the "/client" directory (run "cd client" first in the project directory).

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



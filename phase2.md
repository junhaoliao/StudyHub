

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
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
1. Username: user <br />
Password: user <br /><br />
2. Username: user2<br />
Password: user2
- Admin user: <br />
Username: admin <br />
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

The user can also create or enroll courses by clicking the yellow "Plus" Button on the upper right of the page. <br />
A pop window will show, and a regular user can fill in course information, check the Terms & Conditions, and submit the request to create/enroll a course. The newly added course will show up on the dashboard.

### `Course Page`
After clicking enter on any courses, a regular user can access the course page.<br />
There are several features inside each course page:
1. Chat room: Regular users can chat with other enrolled users on the course page
2. Course Instructor Information: Regular users can access the instructor information by clicking the profile icon next to the course title
3. Announcement: Regular users can click on Announcement tab to view each announcement on the left side of the chat room. The course create can post announcements and remove them by clicking an "X" Button when needed.
4. Resources: Regular users can click on Resource button to access course resources. Both icon and list view are available. Admin users can upload files to the course up to a limit of 500M.

### `BillBoard`
Billboard functions is similar to the chat room, where every regular user can communicate with each other. <br />
The features of the billboard is stripped down compared to the in-course chatroom, on purpose.  In such way, we degrade the experience of chatting globally and encourage users to create/enroll into courses. Then they can chat inside the course, share resources, and have a closer connection.

### `Ranking`
The ranking page not only ranks the courses that have most likes, but also ranks the users based on how many courses they have created so far. Only the first 8 items will be listed for performance optimization and a clean appearance. 

### `Profile`
The profile page has all user information. The user is free to:
1. Modify her/his general information such as gender, GPA and Field of Study.
2. Modify her/his password.
3. Remove courses from her/his dashboard.

## `Admin User`
Admin page has two views only.  <br />
An admin user can view all user profiles and remove any regular user when needed. <br />
An admin user can remove any content inside a billboard.<br />
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

# Server Side Backend Summary
| URL | Method | req | res/Usage |
| --- | --- | --- | --- |
| RegularUser/login  | post | {&quot;username&quot;: &quot;&quot;,&quot;password&quot;: &quot;&quot;} | check if the username and password exists, create a session by returning a current username. |
| RegularUser/access  | post | {&quot;userid&quot;: &quot;&quot;} | Admin uses userid to get user information by returning database instance of that userid. |
| /RegularUser/remove  | post | {&quot;userid&quot;: &quot;&quot;} | Admin uses userid to remove a user, return database instance of the removed user. |
| /RegularUser/signup  | post | {&quot;username&quot;: &quot;&quot;,&quot;password&quot;: &quot;&quot;,&quot;GPA&quot;: &quot;&quot;,&quot;gender&quot;:&quot;&quot;,&quot;levelOfEducation&quot;: &quot;&quot;,&quot;fieldOfStudy&quot;: &quot;&quot;,&quot;coursesTeaching&quot;: [],&quot;coursesTaking&quot;: []} | create a new user. Duplicate username is not allowed. |
| /RegularUser/logout  | get | N/A | destroy current session. |
| /RegularUser/check-session | get | N/A | get current user session by returning a current username and userid. |
| /AllRegularUser  | get | N/A | Admin uses to access all users&#39; information. |
| /RegularUser/username  | post | {&quot;username&quot;:&quot;&quot;} | check if username already exists. Return user if username exists. Status 404 if username not exists. Used as signup error message check. |
| /courses  | get | N/A | Get course information of the courses that user teaches and takes |
| /courses  | post | {&quot;name&quot;: &quot;&quot;,&quot;description&quot;: &quot;&quot;} | Add a course to the coursesTeaching list |
| /getCourses/:courseName | get | :courseName can contain numbers or characters. Eg./getCourses/CSC309  | Return the course information and chatroom if exist |
| /getRankings | get | N/A | Get the course ranking and the user ranking |
| /courses/:courseName/getResources | get | N/A | get resources of a course given a course name if the user is a course taker |
| /courses/:courseName | Patch | N/A | function to add a user to a course given a course name |
| /courses/:courseName/announcement | post | :courseName can contain numbers or characters.Eg./courses/CSC309/announcement {&quot;title&quot;: &quot; &quot; ,&quot;content&quot;:&quot; &quot; } | Check if the current user is course admin. If is, post an announcement under this certain course. (maximum 3 announcements) |
| /courses/:courseName/:announcement | delete | : courseName can contain numbers or characters. :announcement is the Objectid of the announcement Eg./courses/CSC309/5e87c0f4e675ca065472e702  | Check if the current user is course admin. If is, delete the selected announcement of the course |
| /BillBoard/content | get | N/A | Only return all BillBoard content if there is currently a session created. |
| /BillBoard/new  | post | {&quot;username&quot;: ,&quot;date&quot;: ,&quot;message&quot;: ,&quot;image&quot;: } | Only create a new BillBoard content and save to database if there is currently a session created. |
| /BillBoard/delete  | post | {&quot;\_id&quot;:&quot;&quot;} | Admin uses to delete any BillBoard content by providing content id. |
| /RegularUser/profile  | get | N/A | returns user&#39;s information only if there is currently a session created. |
| /RegularUser/profile/coursesTeaching  | get | N/A | return an array of the course teaching only if there is currently a session created. |
| /RegularUser/profile/coursesTaking  | get | N/A | return an array of the course taking only if there is currently a session created. |
| /RegularUser/profile  | post | {&quot;username&quot;: &quot;&quot;,&quot;password&quot;: &quot;&quot;,&quot;GPA&quot;: ,&quot;gender&quot;: &quot;&quot;,&quot;levelOfEducation&quot;: &quot;&quot;,&quot;fieldOfStudy&quot;: &quot;&quot; } | update user&#39;s profile and save to databases only if there is currently a session created. |
| /courses/:courseName/like | patch | :courseName can contain numbers or characters. Eg./courses/CSC309/like  | Like a course |
| /resources/favourites | get | N/A | Get all resources favourited |
| /upload/:file_id| delete| N/A | Course admin can use this request to remove some uploaded file. |
| /courses/:courseName/upload| post| N/A | Course admin can use this request to upload some file to the course. |

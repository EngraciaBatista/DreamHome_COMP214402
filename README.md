# DreamHome_COMP214402
Dream Home Real Estate Application
Welcome to the Dream Home Real Estate Application repository! This project is a comprehensive web application designed to streamline various real estate management tasks, such as staff hiring, branch management, and client registration.

Project Overview
The Dream Home Real Estate Application is a full-stack web application built using modern technologies. The application allows users to manage staff, branches, and clients effectively through an intuitive web interface. Key features include staff hiring, branch address retrieval and updates, and client registration and updates.

Technology Stack
Backend: Node.js, Express
Frontend: HTML, CSS, JavaScript
Database: Oracle Database
Packages: oracledb, body-parser
Features
Staff Management:

Hire new staff with detailed information.
Update existing staff details like salary, phone, and email.
List all current staff members.
Branch Management:

Retrieve and update branch addresses.
Open new branches with relevant details.
Client Management:

Register new clients with personal and contact details.
Update existing client information.


Requirement Matrix – Dream Home Real State 

Task ID 

Requirement Description 

Category 

Details 

1.1 

Create Staff_hire_sp Procedure 

Back-end 

- Accepts 9 parameters<br> - Executes INSERT INTO dh_staff with provided values<br> - Commits transaction<br> - Tested on SQL Developer 

1.2 

Create Staff Hiring Form 

Front-end, GUI 

- Fields for first name, last name, position, branch number, DOB, salary, telephone, mobile, email<br> - Hiring button to call Staff_hire_sp<br> - Cancel button (optional) 

1.3 

List and Update Staff Records 

Front-end, GUI, Back-end 

- Form to list all staff records<br> - Editable fields for salary, phone, email<br> - Update command for edited values<br> - Option to use GUI or procedure for update 

2.1 

Create Function or Form to Get Branch Address 

Back-end, Front-end 

- Input for branch number<br> - Function get_branch_address to return street and city OR<br> - Front-end SQL select to return address 

2.2 

Allow End User to Change Branch Address 

Front-end, GUI, Back-end 

- Form to list and edit branch details<br> - Update command for edited values<br> - Option to use function or procedure for update<br> - Commit transaction 

2.3 

Create Procedure to Open a New Branch 

Back-end 

- Procedure new_branch to accept branch details<br> - Insert new branch into dh_branch table<br> - Commit transaction 

3.1 

Create Web Form to Register New Client 

Front-end, GUI 

- Similar to Task 1.2 but for client registration 

3.2 

Create Web Form to Update Client 

Front-end, GUI 

- Similar to Task 1.3 but for client updates 

Presentation 

Create and Share PowerPoint Presentation 

Presentation 

- PowerPoint presentation to be shared with the instructor<br> - Presentation of the project on the last day<br> - Ensure connectivity if using own laptop 

 

Additional Guidelines 

 

Development Tools: Use any web-based front-end programming tool that can connect to the provided database or your own database. 

Coding Standards: Ensure clean coding practices, database interaction, and GUI features. 

Team Collaboration: Responsibilities should be shared among team members for different tasks (stored procedures, functions, GUI). 

Testing and Demonstration: Procedures and functions should be tested in SQL Developer and demonstrated successfully. 

User Interface: Design a user-friendly and possibly fancy GUI. 

 

Marking Guidelines 

 

Back-end Programming (Up to 70 points): Procedures, functions, and triggers must compile without errors and be tested successfully. 

Front-end GUI Effectiveness (0 up to 30 points): Assess the user-friendliness and design quality of the GUI. 

Presentation Skills: Evaluate eye contact, voice control, and body gestures during the presentation. 

This matrix will help in tracking the requirements and ensuring all aspects of the project are covered during the development and presentation phases. 

 

Back-end Development 

 

PL/SQL: 

This is Oracle's procedural extension for SQL. It is the best choice for writing stored procedures, functions, and triggers. 

Tool: SQL Developer (Oracle's integrated development environment). 

 

Front-end Development 

 

HTML, CSS, and JavaScript: 

For creating the web interface. HTML for structure, CSS for styling, and JavaScript for interactivity. 

Tools: Any text editor (e.g., VS Code, Sublime Text) or IDE (e.g., WebStorm). 

Backend Framework: 

Node.js with Express: This setup allows you to build a web server and handle routes easily. It can also be used to interact with the Oracle database using the node-oracledb library. 

 

Database Connectivity 

 

Node.js with node-oracledb: 

This package allows Node.js applications to connect to Oracle databases, execute SQL queries, and call stored procedures. 

Tool: Node.js and npm (Node Package Manager). 

 

Presentation 

 

PowerPoint: 

For creating and sharing the presentation with the instructor. 

Tool: Microsoft PowerPoint  

 

Suggested Setup and Workflow 

 

Database Setup: 

Use Oracle SQL Developer to create and test your PL/SQL procedures, functions, and triggers. 

Front-end Development: 

Design the forms and components for the various tasks (staff hiring, branch management, client management). 

Backend Development: 

Use Node.js and Express to create a server that handles API requests from the front-end. 

Use node-oracledb to connect your Node.js server to the Oracle database. 

Integration: 

Ensure that your front-end forms make AJAX requests to the backend API endpoints. 

The backend API should handle these requests, interact with the database (e.g., call PL/SQL procedures), and send back responses to the front-end. 

Testing: 

Thoroughly test all the functionalities in SQL Developer for back-end procedures. 

Test the front-end and back-end integration to ensure seamless data flow and error handling. 

Presentation: 

Prepare slides covering the project overview, architecture, technologies used, a demo of functionalities, and any challenges faced. 

Practice your presentation to ensure smooth delivery. 

 

Tech Stack 

Front-end: HTML, CSS, JavaScript 

Back-end: Node.js 

Database: Oracle SQL Server 

Development Tools: SQL Developer, VS Code, npm 

Presentation: Microsoft PowerPoint 

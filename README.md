# Taskello Capstone Project

Taskello is a trello clone designed to emulate trello's todo list functionality. Users should be able to create their own boards, lists, and cards to organize action items for productivity. The website can be found [here](https://taskello.onrender.com/)

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


### Technologies Used
### Frontend
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

### Backend
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

### Hosting

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

***

### Feature Descriptions
* Users can create an account or log in to an existing account
![image](https://user-images.githubusercontent.com/95837496/205355317-d262b291-4ba2-42f6-9b1d-70d0b24ae76e.png)
![image](https://user-images.githubusercontent.com/95837496/205355412-d7b0236d-efb2-4e82-9d08-ec185abd7c6b.png)
![image](https://user-images.githubusercontent.com/95837496/205355481-ebb805e9-2f3c-4d18-bde1-6ccacba39afa.png)


* Upon successful log in or sign up:
* Users can view, create, update, and delete their own boards
![image](https://user-images.githubusercontent.com/95837496/205364503-a2f3459a-1af9-4459-ad76-6db01a305f74.png)
![image](https://user-images.githubusercontent.com/95837496/205364594-163ff198-4df8-47fe-808b-198ce5401217.png)
![image](https://user-images.githubusercontent.com/95837496/205364690-31408118-c0ef-4979-8764-5482f7c06c86.png)
![image](https://user-images.githubusercontent.com/95837496/205364728-c1085d48-bc9a-462d-b6df-a94b3098218a.png)


* Users can create lists on a board as well as update and delete it after having created the list.
![image](https://user-images.githubusercontent.com/95837496/205364981-099acc34-51f2-4c67-8daa-c320949d39e6.png)
![image](https://user-images.githubusercontent.com/95837496/205365028-d6746e3f-8b2b-4b66-a605-b1b1695c570d.png)
![image](https://user-images.githubusercontent.com/95837496/205365621-e4a9ee56-88ce-437a-ab65-d6511f313df4.png)


* Users can create cards within lists as well as update and delete those cards. Users can also add a description to their card if they choose to do so.
![image](https://user-images.githubusercontent.com/95837496/205365174-a0a8ef08-d27a-4474-a238-47465f94af9b.png)
![image](https://user-images.githubusercontent.com/95837496/205365220-02df56b1-990a-4e5c-960b-720b372fccc9.png)
![image](https://user-images.githubusercontent.com/95837496/205365262-f4ebfc30-107d-4ec7-bdff-d8b9c192f358.png)

### Future Features
* A drag and drop feature implemented using the react drag and drop API
* Ability for users to add comments on other users' cards
* A calendar view of cards with due dates

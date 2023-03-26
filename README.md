# Mern Stack Task

This is a simple chatbot application that allows users to add and select question answers, and interact with a pre-trained model and get answers to their questions.

## Features

* User can add multiple question and answers.
* User can check the live preview, select any question and add their answers.
* User can chat with chatbot to answer the questions.

## Technologies

### Front-end
* Reactjs + vite.js
#### Packages
* Material UI + MUI icons
* axios (for api calls)
* react-toastify ( to display messages)

### Back-end
* Nodejs + Expressjs + MongoDB
#### Packages
* cors
* dotenv
* mongoose
* nodemon


## File Folder Structure

In root there are following files and folders 
* .gitignore
* front-end
* api

## Installation

* Clone the repository
``` git clone https://github.com/ubaid541/mern-stack-task.git ```

* Install dependencies
``` 
cd mern-stack-task 
cd front-end 
npm install
cd ..
cd api 
npm install 
```


* Start the Backend server
``` 
cd api
npm start 
```

* Create a .env file in api folder and include this information:
MONGODB = "mongodb+srv://ubaid:Ubaid2000@cluster0.2k9kzz4.mongodb.net/qabot?retryWrites=true&w=majority"
PORT = 5000


* Start the front end
``` 
cd front-end
npm run dev
```

### ScreenShot

![image](https://user-images.githubusercontent.com/106172125/227773251-567c3d6e-2aa3-49b9-a01d-9a0b4582b6c7.png)


That's it.

### Thanks



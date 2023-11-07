# Quiz app

Add this repo to your local machine
```
git clone https://github.com/Fadilix/quiz-app.git
```

Install dependencies (Both in the api and the client)
```
npm install
```

Create a file .env, ensure you have the following env variable set
```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
```

## Technologies
- Frontend: React JS, Vanilla CSS
- Backend: Node JS, Express JS, MySQL

# Screenshots
### Home page
![image](https://github.com/Fadilix/quiz-app/assets/121851593/a059054d-3a32-4c9e-8f47-25cfbb50fcd2)

### Setting before match 
![image](https://github.com/Fadilix/quiz-app/assets/121851593/91468e09-3551-4901-b8a0-04a208c9f536)

### Quiz
![image](https://github.com/Fadilix/quiz-app/assets/121851593/dca89d67-02b9-40bf-846c-4006ace07ed8)


### Quiz result
![image](https://github.com/Fadilix/quiz-app/assets/121851593/715cfdfb-72cf-46ce-a048-2ff8e80c3ae9)

### Categories 
![image](https://github.com/Fadilix/quiz-app/assets/121851593/b74ab866-4375-44ca-a610-aa71578d997a)

### Exam page
![image](https://github.com/Fadilix/quiz-app/assets/121851593/8b040172-207e-433f-b6a8-37e59ad2ce1f)

### Quick exam
![image](https://github.com/Fadilix/quiz-app/assets/121851593/1221b4a3-7602-403a-b517-11f5cf4acd0a)


## Key features
- The settings before match : User can decide how much time and how many questions he wants for the quiz
- Table at the right of the quiz that helps the user know what question is answered or not. The user can also use the table to go to a specific question
#
  ![image](https://github.com/Fadilix/quiz-app/assets/121851593/52fe3df6-7db0-4911-9e3e-414bf988c606)
#
- The timer: helps user know how much time he has left for the quiz (also has some different colors depending on the time left)
- The Exam page: There is a quick exam (with 20 questions and 30 min) and a normal exam (with 40 questions and 60 min); These exam regroup the questions from all the categories to train the user on every category
- The submit answers button: The user can use this button to submit all the answers even those that are not answered (There is a confirm dialog in case the user didn't tap on it on purpose)
- The category page: the user can train on a specific category he wants
- Training page: User can chose the number of questions with unlimited time so he can fully focus on the training
#
![image](https://github.com/Fadilix/quiz-app/assets/121851593/77aa5142-18ca-4cc0-bb78-165e507e7cd3)
#

## Database

### Category table
```
CREATE TABLE category(
	id int PRIMARY KEY AUTO_INCREMENT,
	category_text varchar(255),
);
```
### questions table
```
CREATE TABLE questions(
	id int PRIMARY KEY AUTO_INCREMENT,
	question_text varchar(255),
	category_id int,
	answer varchar(255),
	FOREIGN KEY(category_id) REFERENCES category(id)
);
```

### options table
```
CREATE TABLE options(
	id int PRIMARY KEY AUTO_INCREMENT,
	question_id int,
	option_text varchar(255),
	FOREIGN KEY(question_id) REFERENCES questions(question_id)
);

```

## API (Sample of JSON data at endpoint GET /)
```
[
  {
    "question_text": "What is the capital of India",
    "all_options": "Paris,New York,Togo,New Dheli",
    "category_text": "Geography",
    "answer": "New Dheli"
  },
  {
    "question_text": "What is the capital of America",
    "all_options": "Lom\u00E9,Baguida,Washington,New Zeland,Barbie",
    "category_text": "Geography",
    "answer": "Washington"
  },
  {
    "question_text": "What is the capital of France",
    "all_options": "Berlin,Madrid,London,Paris,Tokyo,Rome",
    "category_text": "Geography",
    "answer": "Paris"
  },
  {
    "question_text": "How many continents are there in the world ?",
    "all_options": "8,7,3,4,6",
    "category_text": "Geography",
    "answer": "7"
  },
  {
    "question_text": "What mountain range is the longest in the world ?",
    "all_options": "Himalayas,Andes Mountains,Alps,Mount Everest,Ural mountains,Rocky Mountains",
    "category_text": "Geography",
    "answer": "Andes Mountains"
  }
]
```

If you reached here, subscribe :)  

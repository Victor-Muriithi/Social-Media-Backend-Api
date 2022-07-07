CREATE DATABASE socialMedia


--- table users ---

CREATE TABLE users(
    userID INT  PRIMARY KEY IDENTITY(1,1),
    userName VARCHAR(255) UNIQUE ,
    email VARCHAR(255) UNIQUE,
    userPassword VARCHAR(255)

)


SELECT * FROM users

exec sp_help users





--- table post ---
CREATE TABLE posts(
    postID INT PRIMARY KEY IDENTITY(1,1),
    userID INT,
    post VARCHAR(255),
 )
ALTER TABLE posts
ADD FOREIGN KEY (userID) REFERENCES users(userID);

DROP TABLE posts

SELECT * FROM posts



 --- table comments ---

 CREATE TABLE comments(
     commentID INT PRIMARY KEY IDENTITY(1,1),
     postID INT ,
     userID INT ,
     comment VARCHAR(255)
 )

ALTER TABLE comments
ADD FOREIGN KEY (userId)  REFERENCES users(userID);

DROP TABLE comments

SELECT * FROM comments





 --- table replies ---

 CREATE TABLE replies(
     replyID INT PRIMARY KEY IDENTITY(1,1),
     commentID INT FOREIGN KEY REFERENCES comments(commentID),
     reply VARCHAR(255)
 )

 ALTER TABLE replies
ADD FOREIGN KEY (commentID)  REFERENCES comments(commentID);

 drop TABLE replies
---------------------------






 ALTER TABLE users
ADD UNIQUE (userID);

 ALTER TABLE posts
ADD UNIQUE (postID);

--  CREATE TABLE comments(
--      commentID INT PRIMARY KEY IDENTITY(1,1),
--      postID INT FOREIGN KEY REFERENCES posts(postID),
--      userID INT UNIQUE FOREIGN KEY REFERENCES users(userID),
--      comment VARCHAR(255)
--  )
------Get All Post Stored Procedure -----
CREATE OR ALTER PROC spGetAllPosts
AS
BEGIN
    SELECT post
    FROM posts
END
GO
----End of Get All Posts ------



-----Login Stored Procedure-----
CREATE OR ALTER PROC spLogin
    @email NVARCHAR(25),
    @pwd NVARCHAR(25)

AS
BEGIN
    SELECT userName, email
    FROM users
    WHERE  email = @email AND userPassword=@pwd
END
GO
spLogin 'elanegran0@wikia.com', '5ai4kZSqquKs'
GO
-------End of Login Stored Procedure ------


----Sign Up Stored Procedure -------
CREATE OR ALTER PROC spSignUp
    @email VARCHAR(25),
    @userName VARCHAR(25),
    @pwd VARCHAR(25)
AS
BEGIN
    INSERT INTO users
        (userName, email, userPassword)
    VALUES( @userName, @email, @pwd)
END
GO
---- End of Sign Up Stored Procedure----




----- Add comment Stored Procedure ----
CREATE OR ALTER PROC spAddComment
    @userID INT,
    @postID INT,
    @comment VARCHAR(255)
AS
BEGIN
    IF NOT EXISTS ( SELECT 1
    FROM comments
    WHERE userID = @userID )

        BEGIN
            IF EXISTS ( SELECT 1
            FROM posts
            WHERE postID = @postID)
                    INSERT INTO comments
                (postID, userID, comment)
            VALUES(@postID, @userID, @comment);

                ELSE 
                PRINT 'You can not comment on the post since it is not a valid post';
        END


    ELSE 
        BEGIN
            PRINT 'You cannot comment twice on a post';
        END

END
GO
----- End of Add comment Stored Procedure ----



----- Add post Stored Procedure ----
CREATE OR ALTER PROC spAddPosts
    @userID INT,
    @post VARCHAR(255)
AS
BEGIN
    IF EXISTS ( SELECT 1
    FROM users
    WHERE userID = @userID )
        INSERT INTO posts
        (userID, post)
    VALUES(@userID, @post)

    ELSE

        PRINT 'Cannot addPost since person is not logged in. Please login';

END
GO
----- End of Add post Stored Procedure ----


-----Add Reply Stored Procedure ------

CREATE OR ALTER PROC spAddReply
    @commentID INT,
    @reply VARCHAR(255)
AS
BEGIN
    IF EXISTS ( SELECT 1
    FROM comments
    WHERE commentID = @commentID )
    INSERT INTO replies (commentID, reply) VALUES(@commentID, @reply)
    ELSE
        PRINT 'You cannot reply since the comment does not exist';
END
GO


-------

spAddPosts @userID = 3, @post = 'goodfeeling' GO

spAddComment @userID = 30, @postID = 3, @comment = 'it is now working' GO

spAddReply @commentID = 456, @reply = 'a reply to this comment' GO
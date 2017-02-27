CREATE TABLE Admin (
   fName VARCHAR(30) NOT NULL,
   lName VARCHAR(30) NOT NULL,
   matricula VARCHAR(50) NOT NULL PRIMARY KEY,
   passwrd VARCHAR(50) NOT NULL
   
); 



INSERT INTO Admin( fName, lName , matricula, passwrd)
VALUES ('Eva', 'Villarreal' , '1195725', '123' )

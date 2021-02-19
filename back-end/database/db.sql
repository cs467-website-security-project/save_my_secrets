
CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  date_added DATETIME DEFAULT NOW(),
  PRIMARY KEY (user_id)
);

CREATE TABLE Secrets (
  secret_id INT NOT NULL AUTO_INCREMENT,
  secret TEXT(120),
  user INT,
  PRIMARY KEY (secret_id),
  FOREIGN KEY (user) REFERENCES Users(user_id)
);

INSERT INTO Users (username, password)
VALUES
  ("admin", "password"),
  ("bob8", "p@ssw0rd"),
  ("andreP3000", "3l!teHaxor"),
  ("shyltontor123", "Brazillionaire"),
  ("chungusamongus", "password123");

INSERT INTO Secrets (secret, user)
VALUES
  ("I'm in love with a stripper", 5),
  ("Shrek is love shrek is life", 2),
  ("Got a new job!", 3),
  ("I'm in love with a stripper 2", 4);

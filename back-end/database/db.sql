
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
  FOREIGN KEY (user) REFERENCES Users(user_id) ON DELETE CASCADE
);

INSERT INTO Users (username, password)
VALUES
  ("admin", "5ac2ac5ba94dbce933c6719ca250bf1752d938f43367af6618ab9e9e30b57df701dcda95287c5af56d8374abf292813efa07e1f287b9e4877ff17969b6735fe1"),
  ("bob8", "f1d43ba8f95b93799d43c922c02dbbe8feff54030a1f8799da017d503fee753d1ce7bf9a79d3ebe10849a5880ee46973169d56189e4f7ee192071fca5bbc8bd8"),
  ("andreP3000", "d9e6762dd1c8eaf6d61b3c6192fc408d4d6d5f1176d0c29169bc24e71c3f274ad27fcd5811b313d681f7e55ec02d73d499c95455b6b5bb503acf574fba8ffe85"),
  ("shyltontor123", "b4e45d9df72179c3bfc30e2111513470b224d85a26e70afff304e60e41208ecf5ccf6f3617962bf92b9b90590dde3f5d1882eae41b0de4f6b25205480333182f"),
  ("chungusamongus", "bed4efa1d4fdbd954bd3705d6a2a78270ec9a52ecfbfb010c61862af5c76af1761ffeb1aef6aca1bf5d02b3781aa854fabd2b69c790de74e17ecfec3cb6ac4bf");

INSERT INTO Secrets (secret, user)
VALUES
  ("I'm in love with a stripper", 5),
  ("Shrek is love shrek is life", 2),
  ("Got a new job!", 3),
  ("I'm in love with a stripper 2", 4),
  ("I'm not the admin", 2),
  ("Bob sucks", 4);

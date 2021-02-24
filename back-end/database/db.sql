
CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  salt VARCHAR(255),
  PRIMARY KEY (user_id)
);

CREATE TABLE Secrets (
  secret_id INT NOT NULL AUTO_INCREMENT,
  secret TEXT(120),
  user INT,
  PRIMARY KEY (secret_id),
  FOREIGN KEY (user) REFERENCES Users(user_id)
);

INSERT INTO Users (username, password, salt)
VALUES
  ("admin",
  "97d0ff0c7c8a9a4583772c9ea405314c33aa5465355c952f55f2d4983f6306dd8e7c3c96e09e6b6712775352e952c7afabf860731651644f8b5e36cdd9113880",
  "samplesalt1"),
  ("bob8",
  "7839f3f7470781786fab51975c6dcdd27b1f668cb793219d0c04f223b186f9db829a55f53493ca8861eda7d05a54ef71ce83b04970ca7ad2ddc0f925b8dfa951",
  "samplesalt2"),
  ("andreP3000",
  "7b12d79bfcd0c090009fc90abadf0997aa2c40b4d12643e8099327c7ebb0b9bb590d8c214eb0dcae39f6a7dae901aa5b46649a81d13120282778dfc1151fb929",
  "samplesalt3"),
  ("shyltontor123",
  "1223054f48eca3b0a7578a191eac38b10eb6bca83d524ab75d96be4d26b25ecf0be9eff4b8e3fcbf69664a9b1b9f337bc9793d1bae2490bc1f86c0c497dac1f8",
  "samplesalt4"),
  ("chungusamongus",
  "bcfc1ec2ed1a76ed05d891b6fda491dbf18f0234cccc409ddcc8761376a569918da24e52913073fa31c5ec0832233c2134f4fc505fab211880a9d28f86ec51ae",
  "samplesalt5");

INSERT INTO Secrets (secret, user)
VALUES
  ("I'm in love with a stripper", 5),
  ("Shrek is love shrek is life", 2),
  ("Got a new job!", 3),
  ("I'm in love with a stripper 2", 4);

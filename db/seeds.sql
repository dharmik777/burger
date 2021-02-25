USE burgers_db;
-- burger_name and devoured are going to be our arguments --
INSERT INTO burgers (burger_name, devoured) VALUES ("Cheeseburger", false);
INSERT INTO burgers (burger_name, devoured) VALUES ("Veggie", false);
INSERT INTO burgers (burger_name, devoured) VALUES ("California", false);
INSERT INTO burgers (burger_name, devoured) VALUES ("Turkey", false);

SELECT * FROM burgers;

-- because the default devoured value is false, when it IS devoured than the boolean value will change to true.

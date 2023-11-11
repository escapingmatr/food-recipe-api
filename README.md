# food-recipe-api

Web app for sharing food recipes developed with NodeJS, providing APIs

DB Structure:
recipes
| Field | Type |
| --- | --- |
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(255) |
| descriptioin | TEXT |
pictures
| id | SERIAL PRIMARY KEY
| recipe_id | INT REFERENCES recipes(id)
| image_path | TEXT
ingredients
| id | SERIAL PRIMARY KEY
| recipe_id | INT REFERENCES recipes(id)
| name | VARCHAR(255) NOT NULL
| quantity | VARCHAR(50)
instructions
| id SERIAL | PRIMARY KEY
| recipe_id | INT REFERENCES recipes(id)
| step_order | INT
| description | TEXT

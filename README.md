# food-recipe-api

This project is a web app for sharing food recipes developed with NodeJS with Express. Providing APIs to view, update and search recipe information stored in PostgreSQL database.

## Starting up the project

To start the server, run the following command from the command line interface.

```
npm init
node app.js
```

The server will be available on localhost:3000,
localhost:3000/recipes to show every recipe,
localhost:3000/id to show the specific recipe,
localhost:3000/id/ingredients for the ingredients for the recipe,
localhost:3000/id/instructions for the instructions to create the dish.

## Content Type: JSON

This REST API only supports JSON contents for requests witha a body and for responses.

## DB Structure:

recipes
| Field | Type |
| --- | --- |
| id | `SERIAL PRIMARY KEY` |
| name | `VARCHAR(255)` |
| descriptioin | `TEXT` |

pictures
| Field | Type |
| --- | --- |
| id | `SERIAL PRIMARY KEY` |
| recipe_id | `INT REFERENCES recipes(id)` |
| image_path | `TEXT` |

ingredients
| Field | Type |
| --- | --- |
| id | `SERIAL PRIMARY KEY` |
| recipe_id | `INT REFERENCES recipes(id)` |
| name | `VARCHAR(255) NOT NULL` |
| quantity | `VARCHAR(50)` |

instructions
| Field | Type |
| --- | --- |
| id SERIAL | `PRIMARY KEY `|
| recipe_id | `INT REFERENCES recipes(id)` |
| step_order | `INT` |
| description | `TEXT` |

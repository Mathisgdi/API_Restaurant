# Restaurant_API

A simple example of an API for managing items, formulas, and categories of a restaurant using Node.js, Express, and MySQL.

## Introduction

This project is a RESTful API that allows the management of restaurant items, formulas, and categories. It utilizes Node.js as the runtime environment, Express as the routing framework, and MySQL workbench as the database.

## Configuration
Before using this API, make sure you have Node.js installed on your machine.
For the project put this command in the terminal and it will install all the dependencies.

```bash
npm install
```

 You will also need to have a MySQL server up and running. Ensure that MySQL is correctly configured for the API.

## Usage

### Endpoints

The API offers the following endpoints for managing restaurant items, formulas, and categories. 

Using Postman
To use the API with Postman, follow these steps:

Open Postman and create a new request.
Set the request method to the desired HTTP method (GET, POST, PUT, DELETE).
Set the request URL to the desired endpoint (http://localhost:3000/{}).
If necessary, add any required request body parameters.
Click the "Send" button to send the request to the API.
The API will respond with the requested data or an error message.

#### items

- `GET /items`: Retrieve all items 
- `GET /items?parameters`: Retrieve all items that match the specified parameters. The parameters are the attributes of the table items. An exemple is http://localhost:3000/items?parameters=name="Salade".
- `description`: The description of the product.
- `GET /items/:id`: Retrieve a product by its ID.
- `POST /items`: Create a new product.
- `PUT /items/:id`: Update an existing product.
- `DELETE /items/:id`: Delete a product.

#### Formulas

- `GET /formulas`: Retrieve all formulas.
- `GET /formulas/:id`: Retrieve a formulas by its ID.
- `POST /formulas`: Create a new formulas.
- `PUT /formulas/:id`: Update an existing formulas.
- `DELETE /formulas/:id`: Delete a formulas.

#### Categories

- `GET /categories`: Retrieve all categories.
- `GET /categories?parameters`: Retrieve all categories that match the specified parameters. The parameters are the attributes of the table categories.An exemple is http://localhost:3000/categories?parameters=price=14.99. 
- `GET /categories/:id`: Retrieve a category by its ID.
- `POST /categories`: Create a new category.
- `PUT /categories/:id`: Update an existing category.
- `DELETE /categories/:id`: Delete a category.
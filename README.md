#  MongoDB and Node.js Lesson 4-&-5

## 1. Data Modeling and Schemas
**Objectives:**

- Understand what a schema is and why it is used in database design.
- Learn about data types in MongoDB.

- Gain a solid understanding of relations in MongoDB, specifically how different kinds of relationships can be modeled (one-to-one, one-to-many).

> Key Learning Content:

- **What is a Schema?**

> A **schema** is a blueprint or structure that defines how data is organized within a database. It acts as a guide for the format and validation rules for data stored in the database. 

In MongoDB (a NoSQL database), a schema refers to the structure of documents (which are essentially JSON-like data), typically defined using a library like Mongoose in a Node.js environment.


> MongoDB Schema Example:
A schema might define a user document with properties like **name**, **email**, and **password**.  

        const mongoose = require('mongoose');
        const userSchema = new mongoose.Schema({
            name: String,
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true }
        });

### Understanding Data Types in MongoDB
MongoDB supports a variety of data types to handle different kinds of information. 
Some common data types include:

* **String**: Used for textual data (e.g., name, email).
* **Number**: Used for integer or floating-point values (e.g., age, price).
* **Boolean**: Represents true or false values.
* **Date**: Represents dates and times.
* **Buffer**: Binary data (e.g., for storing images or files).
* **ObjectId**: A unique identifier for documents in MongoDB.
* **Array**: Used for lists or sets of data (e.g., tags, comments).
* **Embedded Documents**: Documents within documents (e.g., address information embedded within a user document).

### Understanding Relations in MongoDB
MongoDB is a NoSQL database, and while it does not use traditional SQL-style relations, it supports relationships between documents. These relationships can be modeled in a few different ways, 
including:

* **One-to-One Relationship (Embedded)**:

    In a one-to-one relationship, one document is related to only one other document. In MongoDB, this can be represented by embedding a document inside another document.

    > Example: A user with a profile.

        const userSchema = new mongoose.Schema({
            name: String,
            profile: { 
                type: new mongoose.Schema({
                    bio: String,
                    avatar: String
                })
            }
        });

    Here, each user document can have an embedded profile document containing a bio and avatar.

* **One-to-Many Relationship (Embedded)***:

    In a one-to-many relationship, one document is related to multiple documents. MongoDB allows this type of relationship to be modeled by embedding an array of documents inside a parent document.

    > Example: A blog post with multiple comments.


        const blogSchema = new mongoose.Schema({
            title: String,
            content: String,
            comments: [{
                user: String,
                commentText: String
            }]
        });
    In this case, each blog post has an array of comments embedded directly within the blog document.

* **One-to-Many Relationship (References)**:
    In a one-to-many relationship using references, a document will contain a reference (typically the _id) to another document. 
    This approach is more flexible, as it avoids large embedded arrays and allows referencing documents stored in different collections.
    > Example: A user who can have multiple orders, but each order is stored separately.

        const orderSchema = new mongoose.Schema({
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            items: [String],
            total: Number
        });

    In this case, each order document references a user document by the userId. This allows you to keep the orders in a separate collection while still maintaining the relationship between users and their orders.

### Summary of Relationship Types:
* **One-to-One (Embedded)**: One document is embedded inside another (e.g., a user with a profile).
* **One-to-Many (Embedded)**: An array of related documents is embedded in a parent document (e.g., blog posts with comments).
* **One-to-Many (References)**: One document references multiple documents in another collection using ObjectId references (e.g., users with multiple orders).

Understanding these relationships helps in designing MongoDB data models that are both efficient and maintainable. 
While embedding is simpler and faster for small datasets, references allow for better scalability and flexibility when working with larger or more complex datasets.

### Conclusion:
By understanding schemas, data types, and relations, you can design effective and scalable data models in MongoDB. Whether you choose to embed documents or use references depends on the specific use case, and MongoDB provides the flexibility to model data according to your needs.

#
## 2.  Recipe API using Node.js, Express, and MongoDB (with Mongoose).
This structure includes all the necessary files, directories, and a clean separation of concerns to keep your code maintainable as the project grows.

#### Project Structure:
        recipe-api/
        │
        ├── node_modules/               # Node.js dependencies
        ├── models/                     # Mongoose models (schema definitions)
        │   └── Recipe.js               # Recipe model schema
        ├── routes/                     # Express routes for API endpoints
        │   └── recipeRoutes.js         # Recipe API routes (CRUD operations)
        ├── controllers/                # Route handlers (business logic)
        │   └── recipeController.js     # Logic for handling requests
        ├── middlewares/                # Custom middleware (e.g., error handling, validation)
        │   └── validateRecipe.js       # Middleware to validate recipe data
        ├── config/                     # Configuration files
        │   └── db.js                   # Database connection setup
        ├── .gitignore                  # Git ignore file to exclude node_modules, logs, etc.
        ├── package.json                # NPM package descriptor
        ├── index.js                    # Main application file (Express app)
        └── README.md                   # Project documentation
        

### Breakdown of Files and Folders
#### 1. models/
**Mongoose models** - define the structure of your MongoDB collections.
**Recipe.js**: Mongoose schema for recipes, defining fields like **name**, **ingredients**, **instructions**, **cookingTime**, etc.

    // models/Recipe.js
    const mongoose = require('mongoose');

    const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    cookingTime: { type: Number, required: true }, // in minutes
    createdAt: { type: Date, default: Date.now }
    });

    const Recipe = mongoose.model('Recipe', recipeSchema);

    module.exports = Recipe;

#### 2. routes/
Contains the Express route handlers that define the API endpoints.
**recipeRoutes.js**: Defines the RESTful routes for CRUD operations (*Create, Read, Update, Delete*) on recipes.

    // routes/recipeRoutes.js
    const express = require('express');
    const recipeController = require('../controllers/recipeController');
    const router = express.Router();

    // Define API routes and link them to the controller functions
    router.post('/', recipeController.createRecipe);
    router.get('/', recipeController.getAllRecipes);
    router.get('/:id', recipeController.getRecipeById);
    router.put('/:id', recipeController.updateRecipe);
    router.delete('/:id', recipeController.deleteRecipe);

    module.exports = router;

### 3. controllers/
Contains the business logic and handling of requests. Each controller handles specific actions related to your routes (e.g., fetching recipes, creating a new recipe, etc.).
**recipeController.js**: Handles the logic for each of the CRUD operations.

    // controllers/recipeController.js
    const Recipe = require('../models/Recipe');

    // Create a new recipe
    exports.createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Error creating recipe', error: err.message });
    }
    };

    // Get all recipes with pagination
    exports.getAllRecipes = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    try {
        const recipes = await Recipe.find()
        .skip((page - 1) * size)
        .limit(Number(size));
        const totalRecipes = await Recipe.countDocuments();
        res.json({ recipes, totalRecipes, page, totalPages: Math.ceil(totalRecipes / size) });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recipes', error: err.message });
    }
    };

    // Get recipe by ID
    exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recipe', error: err.message });
    }
    };

    // Update a recipe
    exports.updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: 'Error updating recipe', error: err.message });
    }
    };

    // Delete a recipe
    exports.deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting recipe', error: err.message });
    }
    };

#### 4. middlewares/
Custom middleware for validation, error handling, or other request pre-processing.
**validateRecipe.js**: A middleware for validating incoming recipe data before saving to the database (optional, can also use Mongoose or Joi validation).

    // middlewares/validateRecipe.js
    const validateRecipe = (req, res, next) => {
    const { name, ingredients, instructions, cookingTime } = req.body;
    if (!name || !ingredients || !instructions || !cookingTime) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    next();  // Proceed to the next middleware or route handler
    };

    module.exports = validateRecipe;

#### 5. config/
Configuration files for your database connection and other app settings.
**db.js**: Handles the MongoDB connection using Mongoose.

    // config/db.js
    const mongoose = require('mongoose');

    const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/recipeApp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); // Exit the app with failure
    }
    };

    module.exports = connectDB;

#### 6. Main Application File: index.js
The entry point for your Express application. This file sets up the server, routes, and connects to the database.

    // index.js
    const express = require('express');
    const mongoose = require('mongoose');
    const recipeRoutes = require('./routes/recipeRoutes');
    const connectDB = require('./config/db');

    const app = express();

    // Middleware
    app.use(express.json());  // Parse JSON request bodies

    // Connect to MongoDB
    connectDB();

    // Routes
    app.use('/recipes', recipeRoutes);

    // Error Handling Middleware (generic)
    app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
    });

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });


#### 7. Other Files
 * **package.json**: Contains the metadata, dependencies, and scripts for your project.
 * **.gitignore**: Specifies which files or directories Git should ignore, typically including node_modules, .env, and log files.
 * **README.md**: Provides documentation on how to set up and use the project.
>Example .gitignore File:

```gitignore
# Node.js dependencies
node_modules/

# Logs
logs/
*.log

# Environment variables
.env

# MongoDB database
db/

# VS Code settings
.vscode/
```

### Running the Application
* Install dependencies:

        npm install

* Start the server:

        node index.js

Your API will be accessible at http://localhost:3000.

### Testing the API
You can use Postman or Insomnia to test the following endpoints:

* **POST /recipes** — Create a new recipe.
* **GET /recipes** — Get all recipes with pagination.
* **GET /recipes/:id** — Get a specific recipe by ID.
* **PUT /recipes/:id** — Update an existing recipe.
* **DELETE /recipes/:id** — Delete a recipe by ID.

This is a basic structure, and you can build on it as your app grows. You might want to add more complex features such as user authentication, rate limiting, logging, or request validation (using Joi or similar).
# MongoDB and Node.js Lesson 4-&-5

## Data Modeling and Schemas
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
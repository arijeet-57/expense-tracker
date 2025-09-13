const mongoose = require("mongoose");
const cors = require("cors");
const { ParseStatus, number, date } = require("zod/v3");

mongoose.connect("mongodb://localhost:27017/expense-tracker");

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

const expenseSchema = mongoose.Schema({
    username: {type: String, ref: "User"},
    category: String,
    expense: Number,
    date: {type: Date, default: Date.now}
});

const User = mongoose.model("User", userSchema);
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = {
    User,
    Expense
};
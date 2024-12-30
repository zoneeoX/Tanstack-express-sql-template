import express from "express";
import { db, testDBConnection } from "../database/db.js";

export const checkDatabase = async (req, res, next) => {
  try {
    const solution = await testDBConnection();
    res.send(`DB Success: ${solution}`);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("DB failed");
  }
};

export const getTodo = async (req, res, next) => {
  try {
    db.query("SELECT * FROM TODO", (err, results) => {
      if (err) {
        console.error("Error :", err);
        return res.status(500).json({ msg: "Failed" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ msg: "Error" });
  }
};

export const getSingleTodo = async (req, res, next) => {
  try {
    const id = req.params.id;

    db.query("SELECT * FROM todo WHERE id=?", [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500);
      }

      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postTodo = async (req, res, next) => {
  try {
    const { title, description, difficulty, due_date } = req.body;

    db.query(
      `INSERT INTO todo (title, description, difficulty, due_date) VALUES (?, ?, ?, ?)`,
      [title, description, difficulty, due_date],
      (err, result) => {
        if (err) {
          console.log(err);
        }

        res.status(200).json(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

export const editTodo = async (req, res, next) => {
  try {
    const { title, description, difficulty, due_date } = req.body;
    const id = req.params.id;

    db.query(
      `UPDATE todo SET title=?,description=?,difficulty=?,due_date=? WHERE id=?`,
      [title, description, difficulty, due_date, id],
      (err, result) => {
        if (err) {
          console.log(err);
        }

        res.status(200).json(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const id = req.params.id;

    db.query("DELETE FROM todo WHERE id=?", [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "ERROR" });
      }

      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
};

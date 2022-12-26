require("dotenv").config();
const express = require("express");
const myconnections = require("./config/Db_config");
const app = express();
const port = process.env.PORT;

app.use(express.json());

//..........................employeeinfo........................

app.get("/get", (req, res) => {
  myconnections.query("SELECT * FROM `employeeinfo`", (err, results) => {
    if (err) {
      res.status(404).json({ error: err });
    } else {
      res.status(200).json({ results });
    }
  });
});

app.get("/get/:id", (req, res) => {
  myconnections.query(
    "SELECT * FROM `employeeinfo` WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (!results[0]) {
        return res.status(400).json({ message: "Users Not Founds" });
      }
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.post("/post", (req, res) => {
  let emp_firstname = req.body.emp_firstname;
  let emp_lastname = req.body.emp_lastname;
  let department = req.body.department;
  let project = req.body.project;
  let address = req.body.address;
  let dob = req.body.dob;
  let gender = req.body.gender;
  myconnections.query(
    "INSERT INTO `employeeinfo`(`emp_firstname`, `emp_lastname`, `department`, `project`, `address`, `dob`, `gender`) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [emp_firstname, emp_lastname, department, project, address, dob, gender],
    (err, results) => {
      if (err) {
        return res.status(404).json(err);
      } else {
        return res.status(200).json({ message: "Data Posted Sucessfully" });
      }
    }
  );
});

app.put("/put/:id", (req, res) => {
  let emp_firstname = req.body.emp_firstname;
  let emp_lastname = req.body.emp_lastname;
  let department = req.body.department;
  let project = req.body.project;
  let address = req.body.address;
  let dob = req.body.dob;
  let gender = req.body.gender;
  let id = req.params.id;

  myconnections.query(
    "UPDATE `employeeinfo`SET`emp_firstname`= ?,`emp_lastname`= ?,`department`= ?,`project`= ?,`address`= ?,`dob`= ?,`gender`= ?,`updated_at`= CURRENT_TIMESTAMP WHERE id = ?",
    [
      emp_firstname,
      emp_lastname,
      department,
      project,
      address,
      dob,
      gender,
      id,
    ],
    (err, results) => {
      if (results.affectedRows === 0) {
        return res
          .status(400)
          .json({ message: "Id is Undefined or User not Found" });
      }
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json({ message: "Data Updated Sucessfully" });
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  myconnections.query(
    "DELETE FROM `employeeinfo` WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (results.affectedRows === 0) {
        res.status(400).json({ message: "Can't Delete Data, ID is not Found" });
      }
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json({ message: "Data Deleted Sucessfully" });
      }
    }
  );
});
//..................employeepositions................

app.get("/emp/get", (req, res) => {
  myconnections.query("SELECT * FROM `employeepositions`", (err, results) => {
    if (!results[0]) {
      res.status(400).json({ message: "No data Founds" });
    }
    if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(results);
    }
  });
});

app.get("/emp/getall/:id", (req, res) => {
  myconnections.query(
    "SELECT * FROM `employeepositions` WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (!results[0]) {
        res.status(400).json({ message: "No Data Found By Id" });
      }
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.post("/emp/post", (req, res) => {
  let emp_id = req.body.emp_id;
  let emp_positions = req.body.emp_positions;
  let dateofjoining = req.body.dateofjoining;
  let salary = req.body.salary;
  myconnections.query(
    "INSERT INTO `employeepositions`(`emp_id`, `emp_positions`, `dateofjoining`, `salary`) VALUES (?, ?, ?, ?)",
    [emp_id, emp_positions, dateofjoining, salary],
    (err, results) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json({ message: "Data Posted Sucessfully" });
      }
    }
  );
});

app.put("/emp/put/:id", (req, res) => {
  let emp_id = req.body.emp_id;
  let emp_positions = req.body.emp_positions;
  let dateofjoining = req.body.dateofjoining;
  let salary = req.body.salary;
  let id = req.params.id;
  myconnections.query(
    "UPDATE `employeepositions` SET `emp_id`= ?,`emp_positions`= ?,`dateofjoining`= ?,`salary`= ?, `updated_at`= CURRENT_TIMESTAMP WHERE id = ?",
    [emp_id, emp_positions, dateofjoining, salary, id],
    (err, results) => {
      if (results.affectedRows === 0) {
        res.status(400).json({ message: "Can't Update Data, Id is Worng" });
      }
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json({ message: "Updated Sucessfully" });
      }
    }
  );
});

app.delete("/emp/delete/:id", (req, res) => {
  myconnections.query(
    "DELETE FROM `employeepositions` WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (results.affectedRows === 0) {
        res.status(400).json({ message: "Can't Delete Data, ID is Worng" });
      }
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json({ message: "Data Deleted Sucessfully" });
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

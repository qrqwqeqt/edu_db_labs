```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lab4
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS lab4 ;

-- -----------------------------------------------------
-- Schema lab4
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS lab4 DEFAULT CHARACTER SET utf8 ;
USE lab4 ;

-- -----------------------------------------------------
-- Table lab4.FILE
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.FILE ;

CREATE TABLE IF NOT EXISTS lab4.FILE (
  idFILE INT NOT NULL,
  file_name VARCHAR(45) NULL,
  file_description VARCHAR(45) NULL,
  file_upload DATE NULL,
  file_format VARCHAR(45) NULL,
  PRIMARY KEY (idFILE))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table lab4.SEARCH
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.SEARCH ;

CREATE TABLE IF NOT EXISTS lab4.SEARCH (
  idSEARCH INT NOT NULL,
  srch_date DATE NULL,
  srch_keyword VARCHAR(45) NULL,
  srch_format VARCHAR(45) NULL,
  FILE_idFILE INT NOT NULL,
  PRIMARY KEY (idSEARCH),
  INDEX fk_SEARCH_FILE1_idx (FILE_idFILE ASC) VISIBLE,
  CONSTRAINT fk_SEARCH_FILE1
    FOREIGN KEY (FILE_idFILE)
    REFERENCES lab4.FILE (idFILE)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table lab4.REQUEST
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.REQUEST ;

CREATE TABLE IF NOT EXISTS lab4.REQUEST (
  idREQUEST INT NOT NULL,
  SEARCH_idSEARCH INT NOT NULL,
  PRIMARY KEY (idREQUEST),
  INDEX fk_REQUEST_SEARCH1_idx (SEARCH_idSEARCH ASC) VISIBLE,
  CONSTRAINT fk_REQUEST_SEARCH1
    FOREIGN KEY (SEARCH_idSEARCH)
    REFERENCES lab4.SEARCH (idSEARCH)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table lab4.USER
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.USER ;

CREATE TABLE IF NOT EXISTS lab4.USER (
  idUSER INT UNSIGNED NOT NULL,
  user_username VARCHAR(45) NOT NULL,
  user_email VARCHAR(45) NOT NULL,
  user_password VARCHAR(45) NOT NULL,
  user_registration TINYINT NULL,
  user_firstname VARCHAR(45) NULL,
  user_lastname VARCHAR(45) NULL,
  REQUEST_idREQUEST INT NOT NULL,
  PRIMARY KEY (idUSER),
  INDEX fk_USER_REQUEST1_idx (REQUEST_idREQUEST ASC) VISIBLE,
  CONSTRAINT fk_USER_REQUEST1
    FOREIGN KEY (REQUEST_idREQUEST)
    REFERENCES lab4.REQUEST (idREQUEST)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table lab4.STAFFLOGIN
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.STAFFLOGIN ;

CREATE TABLE IF NOT EXISTS lab4.STAFFLOGIN (
  idSTAFFLOGIN VARCHAR(45) NOT NULL,
  IS_staff TINYINT NULL,
  USER_idUSER INT UNSIGNED NOT NULL,
  PRIMARY KEY (idSTAFFLOGIN, USER_idUSER),
  INDEX fk_STAFFLOGIN_USER_idx (USER_idUSER ASC) VISIBLE,
  CONSTRAINT fk_STAFFLOGIN_USER
    FOREIGN KEY (USER_idUSER)
    REFERENCES lab4.USER (idUSER)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table lab4.ADMINISTRATOR
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.ADMINISTRATOR ;
CREATE TABLE IF NOT EXISTS lab4.ADMINISTRATOR (
  idADMINISTRATOR INT UNSIGNED NOT NULL,
  adm_delate TINYINT NULL,
  adm_upload LONGTEXT NULL,
  adm_annotation_chng LONGTEXT NULL,
  adm_control TINYINT NULL,
  STAFFLOGIN_idSTAFFLOGIN VARCHAR(45) NOT NULL,
  PRIMARY KEY (idADMINISTRATOR),
  INDEX fk_ADMINISTRATOR_STAFFLOGIN1_idx (STAFFLOGIN_idSTAFFLOGIN ASC) VISIBLE,
  CONSTRAINT fk_ADMINISTRATOR_STAFFLOGIN1
    FOREIGN KEY (STAFFLOGIN_idSTAFFLOGIN)
    REFERENCES lab4.STAFFLOGIN (idSTAFFLOGIN)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table lab4.EDITOR
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.EDITOR ;

CREATE TABLE IF NOT EXISTS lab4.EDITOR (
  idEDITOR INT NOT NULL,
  STAFFLOGIN_idSTAFFLOGIN VARCHAR(45) NOT NULL,
  PRIMARY KEY (idEDITOR),
  INDEX fk_EDITOR_STAFFLOGIN1_idx (STAFFLOGIN_idSTAFFLOGIN ASC) VISIBLE,
  CONSTRAINT fk_EDITOR_STAFFLOGIN1
    FOREIGN KEY (STAFFLOGIN_idSTAFFLOGIN)
    REFERENCES lab4.STAFFLOGIN (idSTAFFLOGIN)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table lab4.BRANCH
-- -----------------------------------------------------
DROP TABLE IF EXISTS lab4.BRANCH ;

CREATE TABLE IF NOT EXISTS lab4.BRANCH (
  idBRANCH INT NOT NULL,
  branch_chng LONGTEXT NULL,
  EDITOR_idEDITOR INT NOT NULL,
  PRIMARY KEY (idBRANCH),
  INDEX fk_BRANCH_EDITOR1_idx (EDITOR_idEDITOR ASC) VISIBLE,
  CONSTRAINT fk_BRANCH_EDITOR1
    FOREIGN KEY (EDITOR_idEDITOR)
    REFERENCES lab4.EDITOR (idEDITOR)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

# RESTfull сервіс для управління даними

## Початковий файл программи 
```js
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = app;
```

## Встановлення доступу до нашої бази данних
```js
const mysql = require("mysql2");
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19012005",
    database: "lab4",
});

conn.connect();

module.exports = conn;
```

## Контроллер
```js
const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllFiles = (req, res, next) => {
  conn.query("SELECT * FROM file", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};

exports.createFile = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [
    req.body.idFILE,
    req.body.file_name,
    req.body.file_description,
    req.body.file_upload,
    req.body.file_format,

  ];
  conn.query(
    "INSERT INTO file (idFILE, file_name, file_description, file_upload, file_format) VALUES(?)",
    [values],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "file added!",
      });
    }
  );
};

exports.getFileById = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No file id found", 404));
  }
  conn.query(
    "SELECT * FROM file WHERE idFILE = ?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

exports.updateFile = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No file id found", 404));
  }
  conn.query(
    "UPDATE file SET file_name=?, file_description=?, file_upload=?, file_format=? WHERE idFILE=?",
    [
      req.body.file_name,
      req.body.file_description,
      req.body.file_upload,
      req.body.file_format,
      req.params.id,
      
      
    ],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "file info updated!",
      });
    }
  );
};

exports.deleteFile = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  conn.query(
    "DELETE FROM file WHERE idFILE=?",
    [req.params.id],
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "file deleted!",
      });
    }
  );
};
```

## Маршут
```js
const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/file").get(controllers.getAllFiles).post(controllers.createFile);
router
    .route("/file/:id")
    .get(controllers.getFileById)
    .put(controllers.updateFile)
    .delete(controllers.deleteFile);
module.exports = router;
```

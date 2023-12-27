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


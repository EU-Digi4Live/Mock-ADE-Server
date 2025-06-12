-- PostgreSQL database to simulate milking system database

CREATE TABLE animal (
  id INT UNIQUE NOT NULL,
  officialregno VARCHAR(50) UNIQUE DEFAULT NULL,
  animalname VARCHAR(50) DEFAULT NULL,
  sex VARCHAR(25) DEFAULT NULL,
  breed VARCHAR(50) DEFAULT NULL,
  birthdate DATE DEFAULT NULL,
  exitdate TIMESTAMPTZ DEFAULT NULL,
  modified TIMESTAMPTZ DEFAULT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE milkingSession (
  id INT UNIQUE NOT NULL,
  systementrytimestamp TIMESTAMPTZ DEFAULT NULL,
  animalid INT NOT NULL,
  begintime TIMESTAMPTZ DEFAULT NULL,
  endtime TIMESTAMPTZ DEFAULT NULL,
  totalyieldkg FLOAT(24) DEFAULT NULL,
  expectedyieldkg FLOAT(24) DEFAULT NULL,
  milkingdeviceid INT DEFAULT NULL,
  milkingsamplerackno SMALLINT DEFAULT NULL,
  milkingsampletubepos SMALLINT DEFAULT NULL,
  milkingsampletubeid SMALLINT DEFAULT NULL,
  avgconductivity SMALLINT DEFAULT NULL,
  maxblood SMALLINT DEFAULT NULL,
  PRIMARY KEY(Id),
  CONSTRAINT fk_animal
    FOREIGN KEY(AnimalId)
      REFERENCES animal(Id)
);

CREATE TABLE quarterMilking (
  id INT UNIQUE NOT NULL,
  milkflowdurationsec SMALLINT DEFAULT NULL,
  incomplete SMALLINT DEFAULT NULL,
  quarterlfyield FLOAT(24) DEFAULT NULL,
  quarterrfyield FLOAT(24) DEFAULT NULL,
  quarterlryield FLOAT(24) DEFAULT NULL,
  quarterrryield FLOAT(24) DEFAULT NULL,
  meanflowlf FLOAT(24) DEFAULT NULL,
  meanflowrf FLOAT(24) DEFAULT NULL,
  meanflowlr FLOAT(24) DEFAULT NULL,
  meanflowrr FLOAT(24) DEFAULT NULL,
  peakflowlf FLOAT(24) DEFAULT NULL,
  peakflowrf FLOAT(24) DEFAULT NULL,
  peakflowlr FLOAT(24) DEFAULT NULL,
  peakflowrr FLOAT(24) DEFAULT NULL,
  conductivitylf FLOAT(24) DEFAULT NULL,
  conductivityrf FLOAT(24) DEFAULT NULL,
  conductivitylr FLOAT(24) DEFAULT NULL,
  conductivityrr FLOAT(24) DEFAULT NULL,
  bloodlf SMALLINT DEFAULT NULL,
  bloodrf SMALLINT DEFAULT NULL,
  bloodlr SMALLINT DEFAULT NULL,
  bloodrr SMALLINT DEFAULT NULL,
  scc INT DEFAULT NULL,
  CONSTRAINT fk_milkingSession
    FOREIGN KEY(Id)
      REFERENCES milkingSession(Id)
);

\copy animal FROM '../data_example/animal.csv' WITH (FORMAT CSV, DELIMITER ';', HEADER TRUE, NULL "NULL");
\copy milkingSession FROM '../data_example/milkingSession.csv' WITH (FORMAT CSV, DELIMITER ';', HEADER TRUE, NULL "NULL");
\copy quarterMilking FROM '../data_example/quarterMilking.csv' WITH (FORMAT CSV, DELIMITER ';', HEADER TRUE, NULL "NULL");

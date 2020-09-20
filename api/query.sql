-- QUERY PARA USERS

INSERT INTO users
VALUES(DEFAULT, 'gallo@gmail.com', 'soyhenry2020', 'Franco', 'Matus', 'Beraza', '11/04/2002', '1127300569', 'https://www.linedkin.com/in/franmatus6', 'no tengo', 'aceptado', true, DEFAULT, DEFAULT);
INSERT INTO users
VALUES(DEFAULT, 'franco@gmail.com', 'capo123', 'Franco', 'Matus', 'Beraza', '11/04/2002', '1127300569', 'https://www.linedkin.com/in/franmatus6', 'no tengo', 'aceptado', true, DEFAULT, DEFAULT);
INSERT INTO users
VALUES(DEFAULT, 'lucca@gmail.com', 'hola123', 'Lucca', 'Lipisky', 'Santiago', '25/05/1995', '1125235534', 'https://www.linkedin.com/in/luccalipisky', 'no tengo', 'pendiente', false, DEFAULT, DEFAULT);

-- QUERY PARA SUBJECTS

INSERT INTO subjects
VALUES(DEFAULT, 'Matematicas', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Biologia', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Ciencias Naturales', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Ciencias Sociales', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Programacion web', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Literatura', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Practicas del Lenguaje', DEFAULT, DEFAULT);

-- QUERY PARA STUDENTS

INSERT INTO students
VALUES(DEFAULT, 'Don', 'Carlitos', '1152142506','carlos@gmail.com', 'Maria Stephenson', false, 'Literatura', 'Matematicas', 'Futbol', 'Caminar bajo la lluvia', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Jose', 'Pepito', '1120424223', 'pepito@gmail.com', 'Josefa Johnson', false, 'Matematicas', 'Literatura', 'Basquet', 'Nadar por el oceano', true, DEFAULT, DEFAULT);

-- QUERY PARA TYPEOFDIFFICULTIES

INSERT INTO "typeOfDifficulties"
VALUES(DEFAULT, 'Falta de atención', DEFAULT, DEFAULT);
INSERT INTO "typeOfDifficulties"
VALUES(DEFAULT, 'Poca concentración', DEFAULT, DEFAULT);
INSERT INTO "typeOfDifficulties"
VALUES(DEFAULT, 'Sumas y restas', DEFAULT, DEFAULT);
INSERT INTO "typeOfDifficulties"
VALUES(DEFAULT, 'Multiplicación y división', DEFAULT, DEFAULT);
INSERT INTO "typeOfDifficulties"
VALUES(DEFAULT, 'Dislexia', DEFAULT, DEFAULT);
INSERT INTO "typeOfDifficulties"
VALUES(DEFAULT, 'Sordo-mudo', DEFAULT, DEFAULT);
INSERT INTO "typeOfDifficulties"
VALUES(DEFAULT, 'Ciego', DEFAULT, DEFAULT);

-- QUERY PARA DATASHEET

INSERT INTO "dataSheets"
VALUES(DEFAULT, '7', 'presente', '8', '5', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '7', '60', '7', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '5', 'presente', '8', '5', false, null, 'Ha tenido un gran rendimiento en literatura', true, '7', '50', '4', DEFAULT, DEFAULT);


-- QUERY PARA STUDENTSCHEDULE

INSERT INTO "studentSchedules"
VALUES(DEFAULT, '09:00', '10:00', 'Lunes', DEFAULT, DEFAULT, 1);
INSERT INTO "studentSchedules"
VALUES(DEFAULT, '11:00', '12:00', 'Martes', DEFAULT, DEFAULT, 2);


-- QUERY PARA CLASS

INSERT INTO classes
VALUES(DEFAULT, DEFAULT, DEFAULT, 1, 1, 1, 2);
INSERT INTO classes
VALUES(DEFAULT, DEFAULT, DEFAULT, 2, 2, 2, 4);


-- QUERY PARA TIPO DE DIFICULTAD POR ESTUDIANTE

INSERT INTO "TODXStudent"
VALUES(1, 1);
INSERT INTO "TODXStudent"
VALUES(2, 2);

-- QUERY PARA SUBJECTXUSER

INSERT INTO "SubjectXUser"
VALUES(1, 1);
INSERT INTO "SubjectXUser"
VALUES(2, 2);

-- QUERY PARA SUBJECTXSTUDENT

INSERT INTO "SubjectXStudent"
VALUES(1, 1);
INSERT INTO "SubjectXStudent"
VALUES(2, 2);
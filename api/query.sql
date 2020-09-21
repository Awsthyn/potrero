-- QUERY PARA USERS

INSERT INTO users
VALUES(1, 'franco@gmail.com', null, 'Franco', 'Matus', 'Beraza', '11/04/2002', '1127300569', 'https://www.linedkin.com/in/franmatus6', 'no tengo', 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(2, 'lucca@gmail.com', null, 'Lucca', 'Lipisky', 'Santiago', '25/05/1995', '1125235534', 'https://www.linkedin.com/in/luccalipisky', 'no tengo', 'pendiente', false, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(3, 'elebeatrizgonzalez@gmail.com', null, 'Elena', 'Gonzalez', 'San Martin 1213', '11/04/1992', '11454300569', 'https://www.linedkin.com/in/elegonzalez', null, 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(4, 'gustavo@gmail.com', null, 'Gustavo', 'Altamiranda', 'Mendoza', '25/05/1990', '1125005534', 'https://www.linkedin.com/in/gustavo', null, 'pendiente', false, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- QUERY PARA SUBJECTS

INSERT INTO subjects
VALUES(1, 'Matematicas', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(2, 'Biologia', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(3, 'Ciencias Naturales', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(4, 'Ciencias Sociales', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(5, 'Programacion web', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(6, 'Literatura', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(7, 'Practicas del Lenguaje', DEFAULT, DEFAULT);

-- QUERY PARA STUDENTS

INSERT INTO students
VALUES(1, 'Don', 'Carlitos', '1152142506', 'carlos@gmail.com', 'Maria Stephenson', false, 'Literatura', 'Matematicas', 'Futbol', 'Ayudar', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(2, 'Jose', 'Pepito', '1120424223', 'pepito@gmail.com', 'Josefa Johnson', false, 'Matematicas', 'Literatura', 'Basquet', 'Emprender', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(3, 'Juan', 'Perez', '112222506', 'juan@gmail.com', 'Maria Perez', false, 'Literatura', 'Matematicas', 'Futbol', 'Aprender cosas nuevas', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(4, 'Juana', 'Perez', '1100124223', 'juana@gmail.com', 'José Perez', false, 'Matematicas', 'Literatura', 'Basquet', 'Superarse día a día', true, DEFAULT, DEFAULT);


-- QUERY PARA DATASHEET
--concentration,assistance,internetConnection,performance,someoneAccompaniesHim,companionName,comments,hadExam,qualification,
-- duration,attitude,

INSERT INTO "dataSheets"
VALUES(1, '7', 'presente', '8', '5', false, null, 'Ha tenido un gran rendimiento en matematicas', false, '1', '0', '8', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(2, '5', 'presente', '8', '5', false, null, 'Ha tenido un gran rendimiento en literatura', false, '1', '0', '8', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(3, '8', 'presente', '8', '7', false, null, 'Ha tenido un gran rendimiento en fisica', false, '1', '0', '7', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(4, '8', 'presente', '8', '7', false, null, 'Ha tenido un gran rendimiento en fisica', false, '1', '0', '7', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(5, '8', 'ausente', '1', '1', false, null, '', false, '1', '0', '1', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(6, '9', 'presente', '8', '7', false, null, 'Ha tenido un gran rendimiento en fisica', false, '1', '0', '7', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(6, '8', 'ausente', '1', '1', false, null, '', false, '1', '0', '1', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(7, '8', 'ausente', '1', '1', false, null, '', false, '1', '0', '1', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(8, '9', 'presente', '8', '7', false, null, 'Ha tenido un gran rendimiento en fisica', true, '7', '25', '7', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(9, '9', 'presente', '8', '7', false, null, 'Ha tenido un gran rendimiento en fisica', true, '8', '30', '7', DEFAULT, DEFAULT);

INSERT INTO "dataSheets"
VALUES(10, '9', 'presente', '8', '7', false, null, 'Ha tenido un gran rendimiento en fisica', true, '10', '30', '7', DEFAULT, DEFAULT);

-- QUERY PARA CLASS

--id, default, default, dataSheetId, userId, studentId, subjectId

INSERT INTO classes
VALUES(1, DEFAULT, DEFAULT, 1, 1, 1, 1);
INSERT INTO classes
VALUES(2, DEFAULT, DEFAULT, 2, 1, 1, 1);
INSERT INTO classes
VALUES(3, DEFAULT, DEFAULT, 3, 2, 2, 1);
INSERT INTO classes
VALUES(4, DEFAULT, DEFAULT, 4, 2, 2, 1);
INSERT INTO classes
VALUES(5, DEFAULT, DEFAULT, 5, 2, 2, 1);
INSERT INTO classes
VALUES(6, DEFAULT, DEFAULT, 6, 2, 2, 1);
INSERT INTO classes
VALUES(7, DEFAULT, DEFAULT, 7, 2, 2, 1);
INSERT INTO classes
VALUES(8, DEFAULT, DEFAULT, 8, 2, 2, 1);
INSERT INTO classes
VALUES(9, DEFAULT, DEFAULT, 9, 2, 2, 1);
INSERT INTO classes
VALUES(10, DEFAULT, DEFAULT, 10, 2, 2, 1);


-- QUERY PARA TYPEOFDIFFICULTIES

INSERT INTO "typeOfDifficulties"
VALUES(1, 'Falta de atención', DEFAULT, DEFAULT);

INSERT INTO "typeOfDifficulties"
VALUES(2, 'Poca concentración', DEFAULT, DEFAULT);

INSERT INTO "typeOfDifficulties"
VALUES(3, 'Sumas y restas', DEFAULT, DEFAULT);

INSERT INTO "typeOfDifficulties"
VALUES(4, 'Multiplicación y división', DEFAULT, DEFAULT);

INSERT INTO "typeOfDifficulties"
VALUES(5, 'Dislexia', DEFAULT, DEFAULT);

INSERT INTO "typeOfDifficulties"
VALUES(6, 'Sordo-mudo', DEFAULT, DEFAULT);

INSERT INTO "typeOfDifficulties"
VALUES(7, 'No vidente', DEFAULT, DEFAULT);

-- QUERY PARA STUDENTSCHEDULE

INSERT INTO "studentSchedules"
VALUES(1,'09:00', '12:00','Lunes', DEFAULT, DEFAULT, 1);
INSERT INTO "studentSchedules"
VALUES(2,'09:00', '
12:00','Martes', DEFAULT, DEFAULT, 1);

-- QUERY PARA USERSCHEDULE

INSERT INTO "userSchedules"
VALUES(1,'09:00', '12:00','Lunes', DEFAULT, DEFAULT, 1);
INSERT INTO "userSchedules"
VALUES(2,'09:00', '12:00','Martes', DEFAULT, DEFAULT, 1);

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

-- QUERY PARA EDUCATIONLEVEL
INSERT INTO "educationLevels"
VALUES(1, 'Primaria', DEFAULT, DEFAULT);
INSERT INTO "educationLevels"
VALUES(2, 'Secundaria', DEFAULT, DEFAULT);

-- QUERY PARA ACADEMICLEVELXSUBJECT
INSERT INTO "academicLevels"
VALUES(1,'Primer Año', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(2,'Segundo Año', DEFAULT, DEFAULT, 2);

-- QUERY PARA EDUCATIONLEVELTXSUBJECT
INSERT INTO "academicLeveltXSubject"
VALUES(1,1);
INSERT INTO "academicLeveltXSubject"
VALUES(2,2);

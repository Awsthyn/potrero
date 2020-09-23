-- QUERY PARA USERS

INSERT INTO users
VALUES(1, 'franco@gmail.com', null, 'Franco', 'Matus', 'Beraza', '11/04/2002', '1127300569', 'https://www.linedkin.com/in/franmatus6', 'no tengo', 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(2, 'lucca@gmail.com', null, 'Lucca', 'Lipisky', 'Santiago', '25/05/1995', '1125235534', 'https://www.linkedin.com/in/luccalipisky', 'no tengo', 'pendiente', false, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(3, 'elebeatrizgonzalez@gmail.com',null, 'Elena', 'Gonzalez', 'San Martin 1213', '11/04/1992', '11454300569', 'https://www.linedkin.com/in/elegonzalez', null, 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
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
VALUES(DEFAULT, 'Ciencias Sociales', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Programacion web', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAULT, 'Literatura', DEFAULT, DEFAULT);
INSERT INTO subjects
VALUES(DEFAUL, 'Practicas del Lenguaje', DEFAULT, DEFAULT);


-- QUERY PARA STUDENTS

INSERT INTO students
VALUES(DEFAULT, 'Don', 'Carlitos', '1152142506','carlos@gmail.com', 'Maria', 'Stephenson', '1152252406', 'maria@gmail.com', 'Futbol', 'Ayudar', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Jose', 'Pepito', '1120424223', 'pepito@gmail.com', 'Josefa', 'Johnson', '1158584747', 'josefa@gmail.com', 'Basquet', 'Emprender', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Juan', 'Perez', '112222506','juan@gmail.com', 'Maria', 'Perez', '1125454547', 'maria@gmail.com', 'Futbol', 'Aprender cosas nuevas', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Juana', 'Perez', '1100124223', 'juana@gmail.com', 'José', 'Perez', '1126232524', 'jose@gmail.com', 'Basquet', 'Superarse día a día', true, DEFAULT, DEFAULT);

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
VALUES(DEFAULT, 'No vidente', DEFAULT, DEFAULT);

-- QUERY PARA DATASHEET

INSERT INTO "dataSheets"
VALUES(1, '7', 'presente', '8', '5', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '7', '60', '7', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(2, '5', 'presente', '8', '5', false, null, 'Ha tenido un gran rendimiento en literatura', true, '7', '50', '4', DEFAULT, DEFAULT);


-- QUERY PARA STUDENTSCHEDULE

INSERT INTO "studentSchedules"
VALUES(1,'09:00', '12:00','Lunes', DEFAULT, DEFAULT, 1);
INSERT INTO "studentSchedules"
VALUES(2,'09:00', '12:00','Martes', DEFAULT, DEFAULT, 1);

-- QUERY PARA USERSCHEDULE

INSERT INTO "userSchedules"
VALUES(1,'09:00', '12:00','Lunes', DEFAULT, DEFAULT, 1);
INSERT INTO "userSchedules"
VALUES(2,'09:00', '12:00','Martes', DEFAULT, DEFAULT, 1);


-- QUERY PARA CLASS

INSERT INTO classes
VALUES(1, DEFAULT, DEFAULT, 1, 1, 1, 2);
INSERT INTO classes
VALUES(2, DEFAULT, DEFAULT, 2, 2, 2, 4);


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
VALUES(DEFAULT,'Primer Grado', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Primer Grado', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Segundo Grado', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Tercer Grado', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Cuarto Grado', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Quinto Grado', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Sexto Grado', DEFAULT,DEFAULT, 1);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Septimo Grado', DEFAULT,DEFAULT, 1);

INSERT INTO "academicLevels"
VALUES(DEFAULT,'Primer Año', DEFAULT, DEFAULT, 2);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Segundo Año', DEFAULT, DEFAULT, 2);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Tercer Año', DEFAULT, DEFAULT, 2);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Cuarto Año', DEFAULT, DEFAULT, 2);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Quinto Año', DEFAULT, DEFAULT, 2);
INSERT INTO "academicLevels"
VALUES(DEFAULT,'Sexto Año', DEFAULT, DEFAULT, 2);

-- QUERY PARA EDUCATIONLEVELTXSUBJECT
INSERT INTO "academicLeveltXSubject"
VALUES(2,1);
INSERT INTO "academicLeveltXSubject"
VALUES(3,1);
INSERT INTO "academicLeveltXSubject"
VALUES(4,1);
INSERT INTO "academicLeveltXSubject"
VALUES(5,1);
INSERT INTO "academicLeveltXSubject"
VALUES(6,1);
INSERT INTO "academicLeveltXSubject"
VALUES(7,1);

INSERT INTO "academicLeveltXSubject"
VALUES(1,2);
INSERT INTO "academicLeveltXSubject"
VALUES(3,2);
INSERT INTO "academicLeveltXSubject"
VALUES(4,2);
INSERT INTO "academicLeveltXSubject"
VALUES(5,2);
INSERT INTO "academicLeveltXSubject"
VALUES(6,2);
INSERT INTO "academicLeveltXSubject"
VALUES(7,2);

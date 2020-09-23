-- QUERY PARA USERS

INSERT INTO users
VALUES(DEFAULT, 'frank@gmail.com', null, 'Franco', 'Matus', 'Beraza', '11/04/2002', '1127300569', 'https://www.linedkin.com/in/franmatus6', 'no tengo', 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(DEFAULT, 'martinch@gmail.com', null, 'Lucca', 'Lipisky', 'Santiago', '25/05/1995', '1125235534', 'https://www.linkedin.com/in/luccalipisky', 'no tengo', 'pendiente', false, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(DEFAULT, 'sanlorenzo10@gmail.com',null, 'LaLele', 'Sarasasasa', 'San Martin 1213', '11/04/1992', '11454300569', 'https://www.linedkin.com/in/elegonzalez', null, 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(DEFAULT, 'carlitoh@gmail.com', null, 'Markito', 'ATR', 'Mendoza', '25/05/1990', '1125005534', 'https://www.linkedin.com/in/gustavo', null, 'pendiente', false, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(DEFAULT, 'eltumba@gmail.com', null, 'Tirri', 'Joel', 'Beraza', '11/04/2002', '1127300569', 'https://www.linedkin.com/in/franmatus6', 'no tengo', 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(DEFAULT, 'ratatatatat@gmail.com', null, 'Mark', 'Zarasa', 'Santiago', '25/05/1995', '1125235534', 'https://www.linkedin.com/in/luccalipisky', 'no tengo', 'pendiente', false, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(DEFAULT, 'josefo@gmail.com',null, 'Elena', 'Gonzalez', 'San Martin 1213', '11/04/1992', '11454300569', 'https://www.linedkin.com/in/elegonzalez', null, 'aceptado', true, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO users
VALUES(DEFAULT, 'lele@gmail.com', null, 'Gustavo', 'Altamiranda', 'Mendoza', '25/05/1990', '1125005534', 'https://www.linkedin.com/in/gustavo', null, 'pendiente', false, DEFAULT, DEFAULT, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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
VALUES(DEFAULT, 'Manuel', 'Pepe', '1125252242','manu@gmail.com', 'Lamen Shephin', false, 'Literatura', 'Matematicas', 'Futbol', 'Ayudar', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Jose', 'Pepito', '1120424223', 'pepito@gmail.com', 'Josefa Johnson', false, 'Matematicas', 'Literatura', 'Basquet', 'Emprender', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Juan', 'Perez', '112222506','juan@gmail.com', 'Maria Perez', false, 'Literatura', 'Matematicas', 'Futbol', 'Aprender cosas nuevas', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Juana', 'Perez', '1100124223', 'juana@gmail.com', 'José Perez', false, 'Matematicas', 'Literatura', 'Basquet', 'Superarse día a día', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Don', 'Carlitos', '1152142506','carlos@gmail.com', 'Maria Stephenson', false, 'Literatura', 'Matematicas', 'Futbol', 'Ayudar', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Miguel', 'Charlez', '1120424223', 'miguelito@gmail.com', 'Maphi Janth', false, 'Matematicas', 'Literatura', 'Basquet', 'Emprender', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Malinshi', 'Perez', '112222506','joseph@gmail.com', 'Malinshi Perez', false, 'Literatura', 'Matematicas', 'Futbol', 'Aprender cosas nuevas', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Juamarkelna', 'Perez', '1100124223', 'markel@gmail.com', 'José Perez', false, 'Matematicas', 'Literatura', 'Basquet', 'Superarse día a día', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'marshall', 'Pepe', '1125252242','marshall@gmail.com', 'Lamen Shephin', false, 'Literatura', 'Matematicas', 'Futbol', 'Ayudar', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'jopshen', 'Pepito', '1120424223', 'jopshen@gmail.com', 'Josefa Johnson', false, 'Matematicas', 'Literatura', 'Basquet', 'Emprender', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Maria', 'Perez', '112222506','Marialsasa@gmail.com', 'Maria Perez', false, 'Literatura', 'Matematicas', 'Futbol', 'Aprender cosas nuevas', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'giovanna', 'Perez', '1100124223', 'giovanna@gmail.com', 'José Perez', false, 'Matematicas', 'Literatura', 'Basquet', 'Superarse día a día', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Stephenson', 'Carlitos', '1152142506','Stephenson@gmail.com', 'Maria Stephenson', false, 'Literatura', 'Matematicas', 'Futbol', 'Ayudar', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'Mark', 'Pepito', '1120424223', 'markelpepinillo@gmail.com', 'Josefa Johnson', false, 'Matematicas', 'Literatura', 'Basquet', 'Emprender', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'joanmanz', 'Perez', '112222506','joanmanz@gmail.com', 'Maria Perez', false, 'Literatura', 'Matematicas', 'Futbol', 'Aprender cosas nuevas', true, DEFAULT, DEFAULT);
INSERT INTO students
VALUES(DEFAULT, 'jeremepz', 'Perez', '1100124223', 'jeremepz@gmail.com', 'José Perez', false, 'Matematicas', 'Literatura', 'Basquet', 'Superarse día a día', true, DEFAULT, DEFAULT);

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

-- QUERY PARA DATASHEET

INSERT INTO "dataSheets"
VALUES(DEFAULT, '4', 'tardanza', '4', '7', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '9', '60', '7', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '8', 'tardanza', '5', '2', false, null, 'Ha tenido un gran rendimiento en literatura', true, '1', '60', '4', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '1', 'tardanza', '7', '3', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '3', '60', '4', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '3', 'tardanza', '6', '9', false, null, 'Ha tenido un gran rendimiento en literatura', true, '6', '60', '9', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '4', 'tardanza', '4', '7', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '9', '60', '7', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '8', 'tardanza', '5', '2', false, null, 'Ha tenido un gran rendimiento en literatura', true, '1', '60', '4', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '1', 'tardanza', '7', '3', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '3', '60', '4', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '3', 'tardanza', '6', '9', false, null, 'Ha tenido un gran rendimiento en literatura', true, '6', '60', '9', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '4', 'tardanza', '4', '7', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '9', '60', '7', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '8', 'tardanza', '5', '2', false, null, 'Ha tenido un gran rendimiento en literatura', true, '1', '60', '4', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '1', 'tardanza', '7', '3', false, null, 'Ha tenido un gran rendimiento en matematicas', true, '3', '60', '4', DEFAULT, DEFAULT);
INSERT INTO "dataSheets"
VALUES(DEFAULT, '3', 'tardanza', '6', '9', false, null, 'Ha tenido un gran rendimiento en literatura', true, '6', '60', '9', DEFAULT, DEFAULT);


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
VALUES(1, 3);
INSERT INTO "SubjectXUser"
VALUES(1, 5);
INSERT INTO "SubjectXUser"
VALUES(2, 2);
INSERT INTO "SubjectXUser"
VALUES(1, 2);
INSERT INTO "SubjectXUser"
VALUES(2, 4);
INSERT INTO "SubjectXUser"
VALUES(2, 1);
INSERT INTO "SubjectXUser"
VALUES(5, 4);

-- QUERY PARA SUBJECTXSTUDENT

INSERT INTO "SubjectXStudent"
VALUES(1, 1);
INSERT INTO "SubjectXStudent"
VALUES(2, 2);
INSERT INTO "SubjectXStudent"
VALUES(2, 1);
INSERT INTO "SubjectXStudent"
VALUES(1, 2);
INSERT INTO "SubjectXStudent"
VALUES(3, 4);
INSERT INTO "SubjectXStudent"
VALUES(2, 4);
INSERT INTO "SubjectXStudent"
VALUES(1, 3);
INSERT INTO "SubjectXStudent"
VALUES(5, 3);
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

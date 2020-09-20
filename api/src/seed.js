const initialVolunteers = [
    { 
    firstName: "Agustín",
    lastName: "Wagner",
    phone: "3462 641211",
    email: "aguswagner008@gmail.com",
    birthday: Date(),
    linkedin: "https://www.linkedin.com/in/agust%C3%ADn-wagner-3b8468121/",
    adviser: false },
    { 
    firstName: "Elena",
    lastName: "Gonzalez",
    phone: "3794 65-9956",
    birthday: Date(),
    email: "elebeatrizgonzalez@gmail.com",
    state: "acepted",
    linkedin: "https://www.linkedin.com/in/ele-gonzalez/",
    adviser: true },
    { 
    firstName: "Germán",
    lastName: "Moren",
    phone: "3442 67-0833",
    birthday: Date(),
    state: "acepted",
    email: "ingenieriamg91@gmail.com",
    linkedin: "https://www.linkedin.com/in/germanmoren/",
    adviser: true },
    { 
    firstName: "Leandro",
    lastName: "Alvarez",
    phone: "341 5967027",
    birthday: Date(),
    state: "acepted",
    email: "elefantenegro64@gmail.com",
    linkedin: "https://www.linkedin.com/in/leandro-agustin-alvarez/",
    adviser: true },

  ];

const initialUsers = [
    {
    email: "elefantenegro64@gmail.com",
    password: "1234",
    roleId: 1,
    volunteerId: 4
    },
    {
    email: "ingenieriamg91@gmail.com",
    password: "1234",
    roleId: 1,
    volunteerId: 3
    },

    {
    email: "elebeatrizgonzalez@gmail.com",
    password: "1234",
    roleId: 1,
    volunteerId: 2
    },
    {
    email: "martinborchandt@soyhenry.com",
    password: "1234",
    roleId: 1,
    },
    
]
const initialTypeOfDifficulty = [
    {name: "Dislexia",},
    {name: "Discalculia",},
    {name: "Disgrafía",},
    {name: "TEA",},
    {name: "TEL",},
    {name: "TANV",},
    {name: "TDAH",}, 
]
const initialSubjects = [
    {name: "Biología"}, 
    {name: "Matemática"}, 
    {name: "Literatura"}, 
    {name: "Química"}, 
    {name: "Física"}, 
    {name: "Historia"}
]
const initialRoles =
[
    {name: "Administrador"}, 
    {name: "Voluntario"}
]

module.exports = {
    initialTypeOfDifficulty,
    initialRoles,
    initialUsers,
    initialVolunteers,
    initialSubjects,
}
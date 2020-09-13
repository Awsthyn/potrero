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
    linkedin: "https://www.linkedin.com/in/ele-gonzalez/",
    adviser: false },
    { 
    firstName: "Germán",
    lastName: "Moren",
    phone: "3442 67-0833",
    birthday: Date(),
    email: "ingenieriamg91@gmail.com",
    linkedin: "https://www.linkedin.com/in/germanmoren/",
    adviser: false },
  ];

const initialUsers = [
    {
    email: "alfredoromano@romano-group.com",
    password: "1234",
    roleId: 1
    },
    {
    email: "martinborchandt@soyhenry.com",
    password: "1234",
    roleId: 1
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
const initialTODXStudent =
[
    {studentId: 2,typeOfDifficultyId:2}, 
    {studentId: 2,typeOfDifficultyId:3},
    {studentId: 2,typeOfDifficultyId:4}, 
    {studentId: 1,typeOfDifficultyId:5}, 
    {studentId: 1,typeOfDifficultyId:6},
    {studentId: 1,typeOfDifficultyId:7}, 
    {studentId: 1,typeOfDifficultyId:1}, 
    
]

const initialStudents = [
    {
        firstName: "Maria",
        lastName: "DificultTrue",
        phone: "11 54121144",
        email: "loremipsum@gmail.com",
        tutor: "Et Ipsum",
        difficulty: true,
        weakness: "lorem ipsum",
        strengths: "lorem ipsum",
        interests: "lorem ipsum",
        motivations: "lorem ipsum"
    },
    {
        firstName: "José",
        lastName: "DificultTrue",
        phone: "11 541222144",
        email: "joselorem@lorem.com",
        tutor: "Et Lorem",
        difficulty: true,
        weakness: "lorem ipsum",
        strengths: "lorem ipsum",
        interests: "lorem ipsum",
        motivations: "lorem ipsum"
    },
    {
        firstName: "Ipsum",
        lastName: "Spunta",
        phone: "11 533121144",
        email: "ipsumspunta@gmail.com",
        tutor: "Et Spunta",
        difficulty: false,
        weakness: "lorem ipsum",
        strengths: "lorem ipsum",
        interests: "lorem ipsum",
        motivations: "lorem ipsum"
    },
]

module.exports = {
    initialTODXStudent,
    initialTypeOfDifficulty,
    initialRoles,
    initialUsers,
    initialVolunteers,
    initialSubjects,
    initialStudents
}
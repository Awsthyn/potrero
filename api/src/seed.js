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
    rol: "Administrador"
    },
    {
    email: "martinborchandt@soyhenry.com",
    password: "1234",
    rol: "Administrador"
    },
    
]

const initialSubjects = [
    {name: "Biología"}, 
    {name: "Matemática"}, 
    {name: "Literatura"}, 
    {name: "Química"}, 
    {name: "Física"}, 
    {name: "Historia"}
]

const initialStudents = [
    {
        firstName: "Lorem",
        lastName: "Ipsum",
        phone: "11 54121144",
        email: "loremipsum@gmail.com",
        tutor: "Et Ipsum",
        difficulty: false,
        weakness: "lorem ipsum",
        strengths: "lorem ipsum",
        interests: "lorem ipsum",
        motivations: "lorem ipsum"
    },
    {
        firstName: "José",
        lastName: "Lorem",
        phone: "11 541222144",
        email: "joselorem@lorem.com",
        tutor: "Et Lorem",
        difficulty: false,
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
    initialUsers,
    initialVolunteers,
    initialSubjects,
    initialStudents
}
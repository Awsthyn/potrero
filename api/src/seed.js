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

const initialClasses = [
    {nombre: "Biología"}, 
    {nombre: "Matemática"}, 
    {nombre: "Literatura"}, 
    {nombre: "Química"}, 
    {nombre: "Física"}, 
    {nombre: "Historia"}
]

module.exports = {
    initialUsers,
    initialVolunteers,
    initialClasses
}
import mysql from 'mysql2/promise';

import {config} from 'dotenv';
config()

const pool = await mysql.createPool({
    hostname: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

//4a.Create a function/ query that will return all the employee data.

const getEmployee = async ()=>{
    let [data] = await pool.query('SELECT * FROM employees')
    return data
}
console.log (await getEmployee());

//4b.Create a function/ query that will return a single employee based on their
// employee_id.
const getSingleEmployees = async (id)=>{
    let [data]= await pool.query('SELECT * FROM employees WHERE employee_id = ?',[id])
    return data
}
console.log (await getSingleEmployees(3));

// c. Create a function/ query that adds a new employee and then returns all the employees so you can see if the data was added

// const addEmployee = async (employee_id, first_name, last_name, email, phone_number, department, salary)=>{
//     await pool.query ('INSERT INTO pick_n_steal . employees (employee_id,first_name, last_name, email, phone_number, department, salary) VALUES (?,?,?,?,?,?,?)',[employee_id,first_name, last_name, email, phone_number, department, salary]); 
// }
// console.log(await addEmployee(5, "Rafiek", "Booysen", "booysenrafiek@gmail.com", "555-0987", "Developer", "60000.00"));

// const getAllEmployee = async ()=>{
//     let [data] = await pool.query('SELECT * FROM employees')
//     return data
// }
// console.log (await getAllEmployee());

// d. Create a function/ query that will remove an employee from the table based on their employee id and then returns all the employees so you can see if the data was removed.

const removeEmployee = async (id)=>{
   let [data] = await pool.query('DELETE FROM employees WHERE employee_id = ?',[id])   
   return data  
}
console.log(await removeEmployee(2));

// e. Create a function/ query that will be able to update all the values of an employee based on their employee id and then returns the employees new data that was edited.

const editEmployee = async (employee_id, first_name, last_name, email, phone_number, department, salary)=>{
    const [data] = await pool.query('UPDATE employees SET first_name= ?, last_name= ?, email= ?, phone_number= ?, department= ?, salary= ? WHERE employee_id = ?', [employee_id, first_name, last_name, email, phone_number, department, salary ]);
    return data;
}
console.log(await editEmployee("Michael", "Johnson", "michael.johnson@example.com", "555-2994", "Logistics", "69420.00", 3));
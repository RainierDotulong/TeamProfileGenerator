const generateHTML = require('./util/generateHtml')

//team profile
const Manager = require('./lib/Manager')
const Intern = require('./lib/Intern')
const Engineer = require('./lib/Engineer')

//node stuff
const fs = require('fs')
const inquirer = require('inquirer')

//Empty team array
let team = []
//logic
const addManager = () => {
	return inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Who is the manager of this team?',
				validate: (nameInput) => {
					if (nameInput) {
						return true
					} else {
						console.log("Please enter the manager's name!")
						return false
					}
				},
			},
			{
				type: 'input',
				name: 'id',
				message: 'Manager ID',
				validate: (Input) => {
					if (Input) {
						return true
					} else {
						console.log("Please enter the manager's ID!")
						return false
					}
				},
			},
			{
				type: 'input',
				name: 'email',
				message: 'Manager Email',
				validate: (Input) => {
					if (Input) {
						return true
					} else {
						console.log("Please enter the manager's Email!")
						return false
					}
				},
			},
			{
				type: 'input',
				name: 'officeNumber',
				message: 'Manager office number',
				validate: (Input) => {
					if (Input) {
						return true
					} else {
						console.log("Please enter the manager's office number!")
						return false
					}
				},
			},
		])
		.then((managerInput) => {
			const name = managerInput.name
			const id = managerInput.id
			const email = managerInput.email
			const officeNumber = managerInput.officeNumber
			const manager = new Manager(name, id, email, officeNumber)
			team.push(manager)
			console.log('MANAGER HAS JOINED THE TEAM: ' + manager)
		})
}
const addEmployee = () => {
	console.log(`
    ===================
    Recruiting employees...
    ===================`)

	return inquirer
		.prompt([
			{
				type: 'list',
				name: 'role',
				message: "Please choose your employee's role",
				choices: ['Engineer', 'Intern'],
			},
			{
				type: 'input',
				name: 'name',
				message: "What's the name of the employee?",
				validate: (Input) => {
					if (Input) {
						return true
					} else {
						console.log("employee's name!")
						return false
					}
				},
			},
			{
				type: 'input',
				name: 'id',
				message: "employee's ID.",
				validate: (Input) => {
					if (isNaN(Input)) {
						console.log("Enter the employee's ID!")
						return false
					} else {
						return true
					}
				},
			},
			{
				type: 'input',
				name: 'email',
				message: "employee's email.",
				validate: (email) => {
					if (email) {
						return true
					} else {
						console.log('ENTER an email!')
						return false
					}
				},
			},
			{
				type: 'input',
				name: 'github',
				message: "Engineer's github username.",
				when: (input) => input.role === 'Engineer',
				validate: (nameInput) => {
					if (nameInput) {
						return true
					} else {
						console.log("ENTER employee's github")
					}
				},
			},
			{
				type: 'input',
				name: 'school',
				message: "intern's school",
				when: (input) => input.role === 'Intern',
				validate: (nameInput) => {
					if (nameInput) {
						return true
					} else {
						console.log("ENTER intern's school!")
					}
				},
			},
			{
				type: 'confirm',
				name: 'confirm',
				message: 'Would you like to add more team members?',
				default: false,
			},
		])
		.then((response) => {
			let name = response.name
			let id = response.id
			let email = response.email
			let role = response.role
			let github = response.github
			let school = response.school
			let confirm = response.confirm
			let employee
			if (role == 'Engineer') {
				employee = new Engineer(name, id, email, github)
				console.log('NEW ENGINEER: ' + employee)
			} else {
				employee = new Intern(name, id, email, school)
				console.log('NEW INTERN: ' + employee)
			}
			team.push(employee)
			if (confirm) {
				return addEmployee()
			} else {
				return team
			}
		})
}

//write HTML
const writeFile = (data) => {
	fs.writeFile('./index.html', data, (err) => {
		if (err) {
			console.log(err)
		} else {
			console.log('successfully written')
		}
	})
}
addManager()
	.then(addEmployee)
	.then((team) => {
		return generateHTML(team)
	})
	.then((html) => {
		return writeFile(html)
	})
	.catch((err) => {
		console.log(err)
	})

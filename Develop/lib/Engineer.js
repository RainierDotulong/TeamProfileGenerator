// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//Name ID EMAIL GITHUB
const Employee = require('./Employee')

class Engineer extends Employee {
	constructor(name, id, email, github) {
		//inherit
		super(name, id, email)
		//new
		this.github = github
	}
	getGithub() {
		return this.github
	}
	//override employee role
	getRole() {
		return 'Engineer'
	}
}
module.exports = Engineer

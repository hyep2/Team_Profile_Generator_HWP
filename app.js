const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");


//last step where it takes the array and put info call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function makeTeamHtml() {
  let renderHtml = render(employeeArr);
  fs.writeFile(path.join(OUTPUT_DIR, 'team.html'), renderHtml, err=>{
    if (err) {
      console.log(err)
    }
    else {
      console.log('The file has been saved under output folder')
    }
  })

}
//pass in an array containing all employee objects
employeeArr = [];

function createManager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'managerName',
      message: "What is the manager's name?"
    },
    {
      type: 'input',
      name: 'managerId',
      message: "What is the manager's Id?"
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: "What is the manager's email?"
    },
    {
      type: 'input',
      name: 'managerOfficeNumber',
      message: "What is the manager's office number?"
    }
  ])
  .then(ans => {
    const manager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficeNumber);
    employeeArr.push(manager);
    addOtherMembers();
  })
  .catch(err=>console.log(err))

}

//prompts user whether they want to add more members, and if they do, they have option to choose engineer or intern
function addOtherMembers() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'questAdd',
      message: 'Would you like to add more team members?',
      choices: ['Yes', 'No']
    }
  ])
  .then(ans=> {
    if(ans.questAdd==='Yes') {
      inquirer.prompt([{
        type: 'list',
        name: 'memberType',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern']
      }])
      .then(ans=> {
        if (ans.memberType === 'Engineer') {
          createEngineer();
        }
        else {
          createIntern();
        }
      })
    }
    else {
      makeTeamHtml();
    }
    }
  )
  .catch(err=>console.log(err))
}


//prompts user about engineer info and creates engineer obj
function createEngineer() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'engineerName',
      message: "What is the engineer's name?"
    },
    {
      type: 'input',
      name: 'engineerId',
      message: "What is the engineer's Id?"
    },
    {
      type: 'input',
      name: 'engineerEmail',
      message: "What is the engineer's email?"
    },
    {
      type: 'input',
      name: 'engineerGithub',
      message: "What is the engineer's github username?"
    }
  ])
    .then(ans => {
      const engineer = new Engineer(ans.engineerName, ans.engineerId, ans.engineerEmail, ans.engineerGithub);
      employeeArr.push(engineer);
      addOtherMembers();
    })
    .catch(err => console.log(err))

}

//prompts user about intern info and creates intern obj
function createIntern() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'internName',
      message: "What is the intern's name?"
    },
    {
      type: 'input',
      name: 'internId',
      message: "What is the intern's Id?"
    },
    {
      type: 'input',
      name: 'internEmail',
      message: "What is the intern's email?"
    },
    {
      type: 'input',
      name: 'internSchool',
      message: "What is the intern's school name?"
    }
  ])
    .then(ans => {
      const intern = new Intern(ans.internName, ans.internId, ans.internEmail, ans.internSchool);
      employeeArr.push(intern);
      addOtherMembers();
    })
    .catch(err => console.log(err))

}

createManager();



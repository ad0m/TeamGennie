
// TODO: Write Code to gather information about the development team members, and render the HTML file.


const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");

// Define the output directory and the path to the team.html file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Check if "output" folder exsists, if it does not then create it
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

// Import the render function from the page-template.js file
const render = require("./src/page-template.js");

// Create an array to store the team members
const teamMembers = [];

// Function to create a manager object
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email?"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
      }
    ])
    // Create a manager object using the answers from the prompt
    .then(answers => {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        // Push the manager object to the teamMembers array
      teamMembers.push(manager);
        // Call the addTeamMember function to add more team members
      addTeamMember();
    });
}

// Function to add an engineer
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email?"
      },
      {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub username?"
      }
    ])
    // Create an engineer object using the answers from the prompt
    .then(answers => {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        // Push the engineer object to the teamMembers array
      teamMembers.push(engineer);
        // Call the addTeamMember function to add more team members
      addTeamMember();
    });
}

// Function to add an intern
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email?"
      },
      {
        type: "input",
        name: "school",
        message: "What is the intern's school?"
      }
    ])
    // Create a new Intern object with the information provided by the user
    .then(answers => {  
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      // Add the intern to the teamMembers array
      teamMembers.push(intern);
      // Prompt the user to add another team member
      addTeamMember();
    });
}

// Function to add a team member
function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "member",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"],
      },
    ])
    .then((response) => {
        // If the user selects Engineer, call the addEngineer function
      if (response.member === "Engineer") {
        addEngineer();
        // If the user selects Intern, call the addIntern function
      } else if (response.member === "Intern") {
        addIntern();
        // If the user selects "I don't want to add any more team members", call the buildTeam function
      } else {
        buildTeam();
      }
    });
}

// Function to build the team and write the HTML and CSS files
function buildTeam() {
    // Write the HTML file using the render function and the teamMembers array
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

  const css = `
  body {
    font-family: Arial, sans-serif;
    background-color: lightgray;
  }

  h1 {
    text-align: center;
    color: navy;
  }

  .card {
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    margin: 20px;
    padding: 20px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  }

  .card h2 {
    color: navy;
  }

  .card p {
    font-size: 16px;
  }

  .card .role {
    font-style: italic;
    font-size: 14px;
    color: gray;
  }
`;

// Write the HTML file using the render function and the teamMembers array
fs.writeFileSync(path.join(OUTPUT_DIR, "style.css"), css);

}
// Start the app by creating the manager
createManager();


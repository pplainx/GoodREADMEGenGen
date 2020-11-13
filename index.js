const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

getInfo();

async function getInfo() {
    //Asking questions to the user and store all the values inside userData
    const userData = await inquirer.prompt([
        {
            type:"input",
            message: "What is your Github username?",
            name:"username"
        },
        {
            type:"input",
            message: "What would you like your Project Title to be?",
            name:"title"
        },
        {
            type:"input",
            message: "Provide a description of your project?",
            name:"description"
        },
        {
            type:"input",
            message: "What are the steps required to install your project? This could be an install command.",
            name:"install"
        },
        {
            type:"input",
            message: "Provide instructions or command for use.",
            name:"usage"
        },
        {
            type:"input",
            message: "State your License Name.",
            name:"licenseName"
        },
        {
            type:"input",
            message: "Provide your License URL.",
            name:"licenseURL"
        },
        {
            type:"input",
            message: "Provide examples on how to run a test for your application. This could be a test command.",
            name:"test"
        },
        {
            type:"input",
            message: "Please state the names of all the contributors you would like to add. Seperate them with commas.",
            name:"contributors"
        },
        {
            type:"input",
            message: "Provide the github usernames of the contributors as well",
            name:"contributorUser"
        }
    ]);
    
    //destructer
    const {username, title, description, licenseName, licenseURL, install, usage, test, contributors, contributorUser} = userData;

    //GET USERNAME AND INSERT INSIDE URL
    const apiURL = `https://api.github.com/users/${username}`;
    const githubInfo = await axios.get(apiURL);
    let githubData = githubInfo.data;

    //convert contributors section into an array
    var contributorGitName = contributorUser.split(",");
    console.log(contributorGitName);
    
    var info = "";
    for (var i = 0; i < contributorGitName.length; i++){   
        console.log(contributorGitName[i]);
        var contriInfo = await axios.get(`https://api.github.com/users/${contributorGitName[i]}`);
        var contributorProfile = contriInfo.data.avatar_url;
        var contributorURL = contriInfo.data.html_url;
        info = info + `\n[![ProfilePicture](${contributorProfile})](${contributorURL})`
    }
    console.log(info);


    // FORMAT GIVEN DATA 

    var formatInfo = `
        \n# ${title}
        \n${description}
        \n## Table of Contents
        \n* [Installation](#Installation)\n* [Usage](#Usage)\n* [Contributors](#Contributors)\n* [Tests](Tests)\n* [License](#License)\n* [Author](#Author)
        \n## Installation
        \n\`\`\` ${install}\`\`\`
        \n## Usage
        \n\`\`\` ${usage}\`\`\` 
        \n## Contributors
        ${info}
        \n## Tests
        \n${test}
        \n## License
        \n[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)](${licenseURL})
        \n## Author
        \n${githubData.name}
        \n![ProfilePicture](${githubData.avatar_url})
        \nGithub Email: ${githubData.email}
        \nGithub Repos URL: ${githubData.repos_url}
        
        `
    const formatedFile = fs.writeFileSync("readme.md", formatInfo );
    

}

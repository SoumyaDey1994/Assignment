const npmCheck = require('npm-check');
 
npmCheck({ignoreDev: true})
  .then((currentState) => console.log(`All NPM Modules are present inside project`))
  .catch((error)=> {
      console.log(error);
      process.exit(1);
  });
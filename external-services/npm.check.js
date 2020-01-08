const npmCheck = require('npm-check');
 
npmCheck({update: true, ignoreDev: true})
  .then((currentState) => {
      const modules = currentState.get('packages');
      const notInstalledModules = modules.filter(mod => mod.isInstalled === false);
      if(notInstalledModules.length > 0){
        throw new Error(`Module not Installed: \n${JSON.stringify(notInstalledModules)}`);
        process.exit(1)
      }else{
        console.log(`All modules were installed successfully`);
      }
  })
  .catch((error)=> {
      console.log(error);
      process.exit(1);
  });    
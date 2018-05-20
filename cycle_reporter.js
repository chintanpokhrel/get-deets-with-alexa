exports.generateCycleRunTimeReport = function(){
    const exec = require('child_process').exec;
    exec("python visualize.py", (error, stdout, stderror)=>{
      if(error){
        console.log("visualize failed with error code: " + err.code);
      }       
      console.log(stdout);
    });
}
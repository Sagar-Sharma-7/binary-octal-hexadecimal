const chalk = require("chalk");
const figlet = require('figlet');
const enquirer = require("enquirer");
const { AutoComplete } = require('enquirer');

let baseNo;
const baseChange = async () => {
    const base = new AutoComplete({
        name: 'Base',
        message: 'Convert decimal to ==>',
        limit: 3,
        intial: 2,
        choices: [
            "Binary",
            "Octal",
            "Hexadecimal"
        ]
    });

    base.run()
        .then((baseName) => {
            if(baseName == 'Binary'){
                baseNo = 2;
            }else if(baseName == 'Octal'){
                baseNo = 8;
            }else if(baseName == 'Hexadecimal'){
                baseNo = 16;
            }else{
                baseNo = 10;
            };
            const changeBase = async () => {
                const askNum = await enquirer.prompt({
                    type:'input',
                    name:'number',
                    message: 'Type any number you want to convert into ' + baseName,
                });
                const num = askNum.number;
                const result = parseInt(num).toString(baseNo);
                console.log(chalk.bold.cyanBright(`${num} in ${baseName} is ==> ${result}`));

                figlet(result, function(err, data){
                    if(err){
                        console.log('Something went wrong');
                    }
                    console.log(data);
                    console.log(chalk.redBright(`Type 'rs' and press enter to restart.`));
                });
            }
            changeBase();
        })
        .catch(console.error)
}
baseChange();
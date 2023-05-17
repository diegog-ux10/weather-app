import inquirer from 'inquirer';
import colors from 'colors';

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search City`
            },
            {
                value: 2,
                name: `${'2.'.green} History`
            },
            {
                value: 0,
                name: `${'0.'.green} Quit`
            }
        ]
    }
]


export const inquirerMenu = async() => {
    // console.clear();
    console.log('================='.green);
    console.log('  Select Option'.white);
    console.log('=================\n'.green);
    
    const {option} = await inquirer.prompt(questions);
    
    return option;
}

export const pause = async() => {
    const questions = [{
        type: 'input',
        message: `\nPress ${'ENTER'.green} to continue\n`,
        name: 'response'
    
    }]
    await inquirer.prompt(questions);
    return true
}

export const readInput = async(message) => {
    const questions = [{
        type: 'input',
        message: message,
        name: 'desc'
    
    }]
    const { desc } = await inquirer.prompt(questions);
    return desc
}

export const listPlaces = async( places = []) => {
    const choices = places.map((place, i) => {
        const idx = i + 1;
        return {
            value: place.id,
            name: `${colors.green(idx)} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);

    return id;
}

export const confirm = async(message) => {
    const questions = [{
        type: 'confirm',
        message,
        name: 'ok'
    }];
    const { ok } = await inquirer.prompt(questions);
    return ok;
}

export const listTaskToCheck = async(task = []) => {
    const choices = task.map((task, i) => {
        const idx = i + 1;
        return {
            value: task.id,
            name: `${colors.green(idx)} ${task.desc}`,
            checked: task.doneAt ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(questions);

    return ids;
}
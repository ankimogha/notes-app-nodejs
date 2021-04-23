// //const fs = require('fs')
// /*
// /// writeFileSync function is used to write content in the file
// /// if file doesn't exist it will create the file and then write
// /// content in the file.
// fs.writeFileSync('notes.txt','This file is created by Nodejs')
// /// if file already exist it content will b overwriten.  
// fs.writeFileSync('notes.txt','hello')
// */
// //fs.appendFileSync('notes.txt',' world')
// const addFunc = require('./utils')
// console.log(addFunc(2,3))

// const validator = require('validator')
// const getNotes = require('./notes')

// console.log(getNotes())

// console.log(validator.isURL('https:/www.npmjs.com/package/validator'))
// console.log(validator.isEmail('ankitmogha.amgmail.com'))

const chalk = require('chalk')
const { argv } = require('yargs')
//const { describe, demandOption } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes')

// customize yargs version 
yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title,argv.body)
    }
})

// create remove command 
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

// create list command 
yargs.command({
    command: 'list',
    describe: 'List of notes',
    handler(){
        notes.listNotes()
    }
})

// create read command 
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse() 


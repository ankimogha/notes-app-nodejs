const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return 'Your notes..'
}

const addNote = (title,body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    // const duplicateNotes = notes.filter(function (note) {
    //   return note.title === title
    // })
    // const duplicateNotes = notes.find(function (note) {
    //  return note.title === title
    // })
    // if (duplicateNotes.length === 0) {
    //   notes.push({
    //     title:title,
    //     body:body
    //   })
    //   saveNotes(notes)
    //   console.log(chalk.green.inverse.bold('New Note Added'))
    // }else {
    //   console.log(chalk.red.inverse.bold('Note title already exist'))
    // }
    
    if (!duplicateNote) {
      notes.push({
        title:title,
        body:body
      })
      saveNotes(notes)
      console.log(chalk.green.inverse.bold('New Note Added'))
    }else {
      console.log(chalk.red.inverse.bold('Note title already exist'))
    }
}

const removeNote = (title) =>{
  const notes = loadNotes()
  const remainingNotes = notes.filter((note) => note.title !== title)
  // const remainingNotes = notes.filter(function (note) {
  //   return note.title !== title
  // })
  if (remainingNotes.length === notes.length){
    console.log(chalk.red.inverse.bold('Note Title : ' + title + ' not found'))
  }else {
    saveNotes(remainingNotes)
    console.log(chalk.green.inverse.bold('Note Removed'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.blue.inverse('Notes List'))
  notes.forEach((note)=> {
    console.log(note.title)
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)
  if (note) {
    console.log(chalk.blue.inverse('Note Title'))
    console.log(note.title)
    console.log(chalk.blue.inverse('Note Body'))
    console.log(note.body)
    }else {
    console.log(chalk.red.inverse('Notes not found'))
  }
}

const saveNotes = (notes) => {
   const notesJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json',notesJSON)
}


const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  }catch(e) {
     return []
  }
}

module.exports = {
  getNotes:getNotes,
  addNote:addNote,
  removeNote:removeNote,
  listNotes:listNotes,
  readNote:readNote
}
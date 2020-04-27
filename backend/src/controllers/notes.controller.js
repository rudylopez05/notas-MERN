const notesCtrl = {};

const noteModel = require('../models/note');


notesCtrl.getNotes = async (req, res) => {

    const notes = await noteModel.find(); 

    res.json(notes);

}

notesCtrl.createNote = async (req, res)  => { 
try{
    const {title, content, date, author} = req.body;
   const newNote =  new noteModel({
        title,
        content,
        date,
        author
    })

    console.log(newNote);

    await newNote.save();

    res.json({message: 'Nota creada'})
}catch (e){
    res.json({message:'Error'})
}

}

notesCtrl.getNote = async (req, res) => {
   const nota = await noteModel.findOneAndUpdate(req.params.id);
   res.json(nota)
}

notesCtrl.updateNote = async (req, res) => {
    await noteModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "Actualizado con exito"})
}

notesCtrl.deleteNotes = async(req, res) =>
{
    const { id } = req.params;
    await noteModel.findByIdAndDelete(id);
    res.json({message: "Nota eliminada"})
}




module.exports = notesCtrl;
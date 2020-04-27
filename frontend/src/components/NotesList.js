import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'



export default class NotesList extends Component {


    state = {

        notes: [],
        apiNotes: "http://localhost:4000/api/notes",
    }

    async getNotes() {

        const res = await (await axios(this.state.apiNotes));
        this.setState({ notes: res.data });

    }


    componentDidMount() {
        this.getNotes();

    }

    deleteNote = async (id) => {

        await axios.delete(this.state.apiNotes+'/'+id);
        this.getNotes();
    }

    updateNote = async (id) => {

        alert(id);
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h3>{note.title}</h3>
                                   <Link 
                                   className = "btn btn-secondary"
                                   to ={"edit/" + note._id}
                                   >
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(note.date)}</p>
                                </div>

                                <div className="card-footer">

                                    <button
                                        className="btn  btn-danger"
                                        onClick={() => this.deleteNote(note._id)}
                                    >delete note</button>

                                 

                                </div>

                            </div>

                        </div>


                    ))
                }
            </div>
        )
    }
}

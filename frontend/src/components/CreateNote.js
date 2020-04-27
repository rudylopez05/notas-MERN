import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        apiUsers: "http://localhost:4000/api/users",
        apiNotes: "http://localhost:4000/api/notes",
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    cleanState = () => {

        this.setState({
            title: '',
            content: '',
            date: new Date()
        })

    }

    getUsers = async () => {

        const res = await axios.get(this.state.apiUsers);
        this.setState({ users: res.data.map(user => user.userName) });

        this.setState({ userSelected: this.state.users[0] })
    }

    async componentDidMount() {


        this.getUsers();
        
        if (this.props.match.params.id){ 
            const res = await axios.get(this.state.apiNotes + '/' + this.props.match.params.id);
            this.setState({
            editing: true,
            _id: this.props.match.params.id,
            title: res.data.title,
            content : res.data.content,
            date: new Date(res.data.date),
            userSelected: res.data.author

        })
        }
    





    }


    createNote = async (e) => {
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };

        if (this.state.editing) {

            await axios.put(this.state.apiNotes + '/' + this.state._id, newNote);

        } else {


            await axios.post(this.state.apiNotes, newNote);
            this.cleanState();

        }

        window.location.href = '/';




    }

    onInputChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onChangeDate = date => {
        this.setState({ date })
    }

    render() {
        return (

            <div className="col-md-6 offset-md-3" >
                <div className="card card-body">
                    <h4>Create a Note</h4>

                    {/** SELECT USER*/}
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                            value = {this.state.userSelected}
                        >
                            {
                                this.state.users.map(user =>
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
                            required
                            onChange={this.onInputChange}
                            value = {this.state.title}
                        />
                    </div>


                    <div className="form-group">
                        <textarea type="text"
                            className="form-control"
                            name="content"
                            placeholder="Descripcion"
                            required
                            onChange={this.onInputChange}
                            value = {this.state.content}
                        >
                        </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            value = {this.state.date}
                        >

                        </DatePicker>
                    </div>


                    <form onSubmit={this.createNote} >
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>

                    </form>
                </div>
            </div>

        )
    }
}

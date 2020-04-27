import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        userName: "",
        apiUsers : "http://localhost:4000/api/users"
    }

    getUsers = async () => {

        const res = await axios.get(this.state.apiUsers);
        this.setState({ users: res.data });

    }

    componentDidMount() {

        this.getUsers();

    }

    onChangeUserName = (e) => {
        this.setState({
            userName: e.target.value
        })

    }

    saveUSer = async e => {
        e.preventDefault();
        await axios.post(this.state.apiUsers, {
            userName: this.state.userName
        })


        this.getUsers();

        this.setState({ userName: "" })



    }

    deleteUser = async (id) => {
        
        await axios.delete(this.state.apiUsers+'/'+id);
        this.getUsers();
        

    }

    render() {
        return (
            <div className="row">

                <div className="col-md-4">

                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.saveUSer}>
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    value={this.state.userName}
                                    onChange={this.onChangeUserName}
                                />

                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>

                        </form>
                    </div>

                </div>

                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => 
                            (
                                <li className="list-group-item list-group-item-action"
                                 key={user._id}
                                 onDoubleClick = { () => this.deleteUser(user._id)}
                                 >

                                    { user.userName }

                                </li>)
                            )
                        }
                    </ul>
                </div>


            </div>
        )
    }
}

import React, {Component} from 'react';
import '../styles/LoginPage.sass';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            error: ''
        };
    }

    handleChange = (e) => {
        this.setState({room: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.room.length < 5)
            this.setState({error: 'Room id must be at least 5 characters long'});
        else
            this.props.history.push('/room/' + this.state.room);
    };

    componentWillMount() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 10; i++)
            id += chars[Math.floor(Math.random() * chars.length)];
        this.setState({room: id});
    }

    render() {
        return (
            <div>
                <div id="login-wrapper" className="container">
                    <h1 className="title">WebRTC demo app</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="six columns offset-by-three">
                                <input type="text" placeholder="Room" className="u-full-width"
                                       onChange={this.handleChange} value={this.state.room}/>
                                <p id="error">{this.state.error}</p>
                                <input className="button-primary u-full-width" type="submit" value="Join"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
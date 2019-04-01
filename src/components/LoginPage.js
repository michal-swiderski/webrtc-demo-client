import React, {Component} from 'react';
import '../styles/LoginPage.sass';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
            error: '',
            recentRooms: []
        };
    }

    handleChange = (e) => {
        this.setState({room: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.room.length < 5)
            this.setState({error: 'Room id must be at least 5 characters long'});
        else {
            localStorage.setItem('recentRooms', JSON.stringify([this.state.room, ...this.state.recentRooms.slice(0, 4)]));
            this.props.history.push('/room/' + this.state.room);
        }
    };

    componentWillMount() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 10; i++)
            id += chars[Math.floor(Math.random() * chars.length)];
        this.setState({room: id});
        if (localStorage) {
            if (localStorage.getItem('recentRooms') !== null) {
                let recentRooms = JSON.parse(localStorage.getItem('recentRooms'));
                this.setState({recentRooms});
            } else {
                localStorage.setItem('recentRooms', JSON.stringify([]));
                this.setState({recentRooms: []});
            }
        }
    }

    render() {
        const recentRoomsList = this.state.recentRooms.map((room) => {
            return (<li><a href={'/room/' + room}>{room}</a></li>);
        });
        return (
            <div>
                <div id="login-wrapper" className="container">
                    <h1 className="title">WebRTC demo app</h1>
                    <div className="row">
                        <div className="six columns offset-by-three">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Room" className="u-full-width"
                                       onChange={this.handleChange} value={this.state.room}/>
                                <p id="error">{this.state.error}</p>
                                <input className="button-primary u-full-width" type="submit" value="Join"/>
                            </form>
                            <h2>Recent rooms: </h2>
                            <ul className="recent-rooms-list">
                                {recentRoomsList}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default LoginPage;
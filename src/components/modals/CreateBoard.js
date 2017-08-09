import React, {Component} from 'react';
import onClickOutside from 'react-onclickoutside';

import './CreateBoard.css';
import  api from '../../api.js'
var limitOfDescriptionValue = 80;

class CreateBoard extends Component {
    constructor(props) {
        super(props);
        this.defaultProps = {
            callbackFromParent: '',
        }
        this.state = {
            error: '',
            descriptionValue: ''

        };
    }

    handleClickOutside = () => {
        this.props.closeCreateElement();
    }

    handleDescriptionInput = (event) => {
        if ((event.target.value !== this.state.descriptionValue) && (event.target.value.length <= limitOfDescriptionValue)) {
            this.setState({
                descriptionValue: event.target.value
            })
        }
    }

    _handleCreateBoard = (e) => {
        e.preventDefault();
        if (this.refs.title.value.length > 0 && this.refs.description.value.length > 0 && this.refs.description.value.length <= limitOfDescriptionValue) {
            api.createBoard(this.refs.title.value, this.refs.description.value)
                .then(res => {
                    this.props.callbackFromParent(res.body)
                    if (this.state.error !== '') {
                        this.setState({error: ''})
                    }
                })
                .catch(err => this.setState(console.error))
        } else {
            this.setState({error: "Please enter a title and description"})
        }
    }

    render() {
        let {show} = this.props;
        return (
            <div className={`createBoard ${show ? "show" : ""}`}>
                <h1>Create New Board</h1>
                <form className="createBoardForm" onSubmit={this._handleCreateBoard}>
                    <p>Title: </p>
                    <input ref="title" placeholder="Board title"/>
                    <hr/>
                    <h2 className="error">{this.state.error}</h2>
                    <p>Description: </p>

                    <textarea ref="description" placeholder="Description of the board"
                              onInput={this.handleDescriptionInput} value={this.state.descriptionValue}/>
                    <p style={{
                        color: 'darkblue',
                        textAlign: 'right'
                    }}>
                        {limitOfDescriptionValue - this.state.descriptionValue.length}/{this.state.descriptionValue.length}
                    </p>
                    <div className="createBoardButton">
                        <button type="submit">Create Board</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default onClickOutside(CreateBoard);
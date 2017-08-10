import api from './api';

module.exports = {

    signup(email, pass) {

        if (localStorage.token) {
            throw new Error('Already logged in'); //revise it later
        }
        else {
            return api.requestSignup(email, pass);
        }
    },

    login(email, pass) {
        if (localStorage.token) {
            throw new Error('Already logged in');
        }
        else {
            return api.requestLogin(email, pass)
            .then(res => {
                // console.log(`Login res Body=${JSON.stringify(res.body)}`);
                localStorage.token = res.body.token;
            })
            .catch(err => {
                console.log(`Auth Error=${err}`);
                throw new Error(`Error from server: ${err.message}`);
            });
        }
    },

    getToken() {
        return localStorage.token
    },

    logout() {
        return api.requestLogout(localStorage.token)
            .then(res => delete localStorage.token)
            .catch(err => delete localStorage.token)
    },

    isLoggedIn() {
        //console.log(`Token=${localStorage.token}`);
        return !!localStorage.token
    },

    getUser() {
        // console.log(`Get User Token=${localStorage.token}`)
        if(localStorage.token) {
            return api.getUser(localStorage.token)
            .then(res => {
                console.log(`Me response=${JSON.stringify(res)}`);
                localStorage.id = res.body.id;
                localStorage.email = res.body.email;
                localStorage.avatarurl = res.body.avatarUrl;
                return localStorage;
            })
            .catch(err => {
                delete localStorage.token;
            });
        }
        else {
            return {};
        }
    },

    createBoard(title, description) {
        return api.createBoard(localStorage.token, title, description)
        .then(res => {
            console.log(`Success, boardID=`,res.body);
            return res.body; //Fix to send boardId
        })
        .catch(err => {
            throw new Error(err);
        });
    },
    
    deleteBoard(boardId) {
        return api.deleteBoard(localStorage.token, boardId)
        .then(res=> {
            return res.body; //No body for delete
        })
        .catch(err => {
            throw new Error(err);
        });
    },
    
    createBookmark(boardId, title, url, description) {
        console.log("sending=",boardId);
        return api.createBookmark(localStorage.token, boardId, title, url, description)
        .then(res=> {
            return res.body;
        })
        .catch(err => {
            throw new Error(err);
        });
    },
    
    deleteBookmark(bookmarkId) {
        return api.deleteBookmark(localStorage.token, bookmarkId)
        .then(res=> {
            return res.body;
        })
        .catch(err => {
            throw new Error(err);
        });
    }
    
    // getUserId() {
    //     return localStorage.id;
    //
    // }
    // getAvatar() {
    //     return localStorage.avatarurl;
    // }
};

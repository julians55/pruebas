const user = require('./api/user');
const auth = require('./auth/local');
const move = require('./api/moves');

function routes(app){
    app.use('/api/user', user);
    app.use('/auth/local', auth);
    app.use('/api/moves', move);
}

module.exports = routes;
const LocalStrategy = require('passport-local')

function initialize (passport){
    passport.use(new LocalStrategy({}))
}
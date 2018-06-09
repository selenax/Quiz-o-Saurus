//passport configuration file
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '742940875432-d88m20e2l2110l3m3jd24ag46v2a3pbm.apps.googleusercontent.com',
            clientSecret: 'LfaK1hn8P-3KDjsIAdv9tWQf',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};
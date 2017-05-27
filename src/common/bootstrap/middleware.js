/**
 * this file will be loaded before server started
 * you can register middleware
 * https://thinkjs.org/doc/middleware.html
 */

/**
 *
 * think.middleware('xxx', http => {
 *
 * })
 *
 */
/*
import passport from 'passport';
import LocalStrategy  from 'passport-local';

think.middleware('xxx', passport.use(new LocalStrategy.Strategy()*/

import passport from 'passport';
import local  from 'passport-local';

think.middleware('passport', async (http,data) => {
   /* let localStrategy = function(){
        let localStrategyPromise = think.promisify(local.Strategy,local);
        return localStrategyPromise;
    }
    passport.use(localStrategy().then(function(username, password, done){
        console.log(11111);
    }))*/

    /*passport.use(new qqStrategy({
            clientID: client_id,
            clientSecret: client_secret,
            callbackURL: "http://127.0.0.1:3000/auth/qq/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({ qqId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ))*/

});

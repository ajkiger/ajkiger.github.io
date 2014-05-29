/*jslint browser: true, devel: true */
if (window.location.hostname === 'games.iwin.com') {
    window._fbclientid = '128296273850064';
    window._gpclientid = '238531725567-d93kvm0isfq740t15a0btdc3m4gq8lif.apps.googleusercontent.com';
} else {
    window._fbclientid = '641925045863763';
    window._gpclientid = '936408393205-rjnu5h7285010dqjv5470t0s5gfgu1sb.apps.googleusercontent.com';
}


(function() {
    "use strict";
    // Initialisation of the Facebook integration. Note that this will need updating to the correct application ID,
    // as it currently is using an application I have defined for a specific set of webhosts, including localhost and
    // doublecoconut.com
    /**
     *
     * @method fbAsyncInit
     * @return
     */
    window.fbAsyncInit = function() {
        FB.init({
            appId      : window._fbclientid,
            status     : false, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
        });

        // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
        // for any authentication related change, such as login, logout or session refresh. This means that
        // whenever someone who was previously logged out tries to log in again, the correct case below
        // will be handled.
        FB.Event.subscribe('auth.authResponseChange', function(response) {
            // Here we specify what we do with the response anytime this event occurs.
            if (response.status === 'connected') {
                // The response object is returned with a status field that lets the app know the current
                // login status of the person. In this case, we're handling the situation where they
                // have logged in to the app.
                iwinGameServices.auth.facebookLoggedIn(response.authResponse);
            }
        });
    };

    /**
     *
     * @method gsigninCallback
     * @param {} authResult
     * @return
     */
    window.gsigninCallback = function(authResult) {
        iwinGameServices.auth.googleLoggedIn(authResult);
    };
})();

/**
 *
 * @method initialiseFB
 * @param {} d
 * @return
 */
var initialiseFB = function(d){
    "use strict";
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
};

/**
 *
 * @method initialiseGoogle
 * @param {} d
 * @return
 */
var initialiseGoogle = function(d) {
    "use strict";
    var po = d.createElement('script'), id = 'googleplus-jssdk'; po.type = 'text/javascript'; po.async = true; po.id = id;
    if (d.getElementById(id)) {return;}
    po.src = 'https://apis.google.com/js/client:plusone.js';
    var s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
};
/**
 * @class iwinGameServices
 * @type {iwinGameServices|*|{}}
 */
var iwinGameServices = (function()
{
    "use strict";
    return $.extend(true, iwinGameServices,
        {

            /**
             * Initializes this API
             * @method init
             * @param {Object} params an object containing one key
             * <br>id: string - the game's id/code
             * @return 
             */
            init: function( params )
            {
                if (typeof(params) !== 'undefined') {
                    if (typeof(params.debugEnabled) !== 'undefined') {
                        iwinGameServicesUtil.debug_enabled = params.debugEnabled;
                        iwinChatServices.internal.log.debug_enabled = params.debugEnabled;
                    }
                    if (typeof(params.errorEnabled) !== 'undefined') {
                        iwinGameServicesUtil.error_enabled = params.errorEnabled;
                        iwinChatServices.internal.log.error_enabled = params.errorEnabled;
                    }
                }
                var g = iwinGameServices.game;
                var u = iwinGameServices.user;
                iwinGameServicesEvent.init(params);
                iwinGameServicesUtil.log.debug( 'iwinGameServices.init', params );

                g.game_id = params.id;
                if ( !iwinGameServicesUtil.validation.is_string( g.game_id ) || iwinGameServicesUtil.validation.is_empty( g.game_id ))
                {
                    throw 'iwinGameServices.init must be called with a game_id parameter, which must be a non empty string';
                }
                // Prepare the user's game_mapping for the game
                u.getGameMapping(g.game_id, function(game_mapping, freshlyCreated){
                    if (freshlyCreated) {
                        game_mapping.current_level = 0;
                        u.pushCurrentUserToStorage();
                    }
                    // Revert all local and memory storage of the game to null
                    g.storage = null;
                    g.game_data_for_level = null;
                });
                iwinGameServices.setExitButtonDomain();
            },

            /**
             * @class iwinGameServices.game
             * @type {iwinGameServices.game|*|{}}
             */
            game:
            {
                loadedFlag: false,
                /**
                 * Notifies the system that it has finished loading
                 * so any advert can be dismissed if it is still playing.
                 * @method loaded
                 * @param {Object} params - not used at present
                 * @return returns a deferred promise object that will be resolve()'d when the pre-game advert dialog
                 * disappears
                 */
                loaded: function( params )
                {
                    iwinGameServicesEvent.gameLoaded(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.game.loaded', params );

                    //Create a promise that the caller can use to determine when the advert has stopped playing
                    var deferred = $.Deferred();
                    var advert_modal = $('#advertModal');
                    var resolve_modal = function (e) {
                        deferred.resolve();
                        advert_modal.off('hidden.bs.modal', resolve_modal);
                    };
                    advert_modal.on('hidden.bs.modal', resolve_modal);
                    iwinGameServices.game.loadedFlag = true;
                    return deferred.promise();
                },


                /**
                 * Retrieves the users level data. If the user's logged in - call server to get users game data,
                 * otherwise - get data from client
                 * @method getLevelData
                 * @param {Object} params - an object containing keys
                 * <br>level: integer
                 * @return returns a deferred promise object that will be resolve()'d with the level data when the
                 * server responds with the game data
                 */
                getLevelData: function( params )
                {
                    iwinGameServicesEvent.gameGetLevelData(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.game.getLevelData', params );

                    var current_level = params.level;
                    if ( !iwinGameServicesUtil.validation.is_integer( current_level ) )
                    {
                        throw 'iwinGameServices.game.getLevelData must be called with a level parameter, which must be an integer, you supplied ' + current_level;
                    }

                    //Create a promise that the caller can use to determine when the server/client has processed this call
                    var deferred = $.Deferred();

                    var game_data = iwinGameServices.gameDataFromGameLevelData(iwinGameServices.game.getGameDataForLevel(params));
                    iwinGameServices.user.setLevel(params, function() {
                        deferred.resolve( game_data );
                    });
                    return deferred.promise();
                },


                //return user object via promise or null if not logged in ?
                //
                //accepts keys
                //
                /**
                 * Stores the users level data. If logged in - call server to store users game data,
                 * otherwise - store on client
                 * @method setLevelData
                 * @param {Object} params an object containing keys
                 * <br>score: integer
                 * <br>level: integer
                 * <br>time: integer
                 * <br>won: boolean
                 * <br>data: string (arbitrary block of text data to be stored)
                 * @return returns a deferred promise object which will be resolve()'d with the user data
                 */
                setLevelData: function( params )
                {
                    var v = iwinGameServicesUtil.validation;
                    iwinGameServicesEvent.gameSetLevelData(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.game.setLevelData', params );
                    if ( params.data === undefined ) {
                        params.data = '';
                    }

                    var score = params.score;
                    if ( score === undefined || !v.is_integer( score ) )
                    {
                        score = 0;
                    }

                    var level = params.level;
                    if ( level === undefined || !v.is_integer( level ) )
                    {
                        throw 'iwinGameServices.game.setLevelData must be called with a level parameter, which must be an integer, you supplied ' + level;
                    }

                    var time = params.time;
                    if ( time === undefined || !v.is_integer( time ) )
                    {
                        time = 0;
                    }

                    var won = params.won;
                    if ( won === undefined || !v.is_boolean( won ) )
                    {
                        won = false;
                    }

                    var data = params.data;
                    if ( data === undefined || !v.is_string( data ) )
                    {
                        throw 'iwinGameServices.game.setLevelData must be called with a data parameter, which must be a string';
                    }

                    //Create a promise that the caller can use to determine when the server/client has processed this call
                    var deferred = $.Deferred();
                    var game_data = iwinGameServices.game.getGameDataForLevel(params);

                    // Check to see if the user has beaten their previous score or time on this level, and if so, update the details
                    game_data.highscore = score;
                    game_data.time = time;
                    game_data.won = won;
                    game_data.level = level;
                    game_data.data = data;
                    iwinGameServices.game.pushCurrentGameLevelToStorage();
                    iwinGameServices.user.increaseLifetimePoints(game_data.time);
                    var user_data = iwinGameServices.userDataFromAllGamesAllLevels(iwinGameServices.user.currentUser());
                    deferred.resolve( user_data  );
                    return deferred.promise();
                },

                /**
                 * This is provided to enable a game to store information about the current user, regardless of the
                 * level they are playing. It uses a special level -MAXINT to store this information in.
                 * @method getGameData
                 * @param {Object} params not used currently
                 * @return returns the string object of the users data stored at a game wide level
                 */
                getGameData: function(params) {
                    iwinGameServicesEvent.gameGetGameData(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.game.getGameData', params);
                    var g = iwinGameServices.game;
                    var current_level = g.current_level;
                    g.current_level = null;
                    var game_data = g.getGameDataForLevel({level: g.game_storage_level});
                    g.current_level = null;
                    if (current_level !== null) {
                        g.getGameDataForLevel({level: current_level});
                    }
                    return game_data.data;

                },

                /**
                 * This is provided to enable a game to store information about the current user, regardless of the
                 * level they are playing. It uses a special level -MAXINT to store this information in.
                 * @method setGameData
                 * @param {Object} params an object containing keys
                 * <br>data: string containing arbitrary data
                 * @return 
                 */
                setGameData: function(params) {
                    iwinGameServicesEvent.gameSetGameData(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.game.setGameData', params);
                    var v = iwinGameServicesUtil.validation;
                    var data = params.data;
                    if ( data === undefined || !v.is_string( data ) )
                    {
                        throw 'iwinGameServices.game.setGameData must be called with a data parameter, which must be a string';
                    }
                    var g = iwinGameServices.game;
                    var current_level = g.current_level;
                    g.current_level = null;
                    var game_data = g.getGameDataForLevel({level: g.game_storage_level});
                    game_data.data = data;
                    g.pushCurrentGameLevelToStorage(true);
                    g.current_level = null;
                    g.getGameDataForLevel({level: current_level});
                },

                /**
                 * This is provided to enable a game to post a high score for the user. Currently this is only storing
                 * this in the game storage level, but later will be storing in a separate service
                 * @method postHighScore
                 * @param {Object} params an object containing keys
                 * <br>score: a number
                 * @return 
                 */
                postHighScore: function(params) {
                    iwinGameServicesEvent.gamePostHighScore(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.game.postHighScore', params);
                    var v = iwinGameServicesUtil.validation;
                    var score = params.score;
                    if ( score === undefined || !v.is_integer ( score ) )
                    {
                        throw 'iwinGameServices.game.setHighScore must be called with a score parameter, which must be an integer';
                    }
                    var g = iwinGameServices.game;
                    var current_level = g.current_level;
                    g.current_level = null;
                    var game_data = g.getGameDataForLevel({level: g.game_storage_level});
                    game_data.score = score;
                    g.pushCurrentGameLevelToStorage(true);
                    g.current_level = null;
                    g.getGameDataForLevel({level: current_level});
                }
            },

            /**
             * @class iwinGameServices.auth
             * @type {iwinGameServices.auth|*|{}}
             */
            auth: {
                /**
                 * if logged in - return user object via promise
                 * otherwise returns error via promise
                 * @method getSession
                 * @param {Object} params not used at present
                 * @return returns a deferred promise object that will be resolve()'d with the user's data
                 */
                getSession: function( params )
                {
                    iwinGameServicesEvent.authGetSession(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.auth.getSession', params );

                    //Create a promise that the caller can use to determine when the user info is available or an error has occurred
                    var deferred = $.Deferred();

                    //#############################################################
                    // MOCK IMPLEMENTATION
                    //#############################################################
                    //simulate check to see if we are logged in and return user data
                    var user_data = iwinGameServices.userDataFromAllGamesAllLevels(iwinGameServices.user.currentUser());
                    setTimeout(function() { iwinGameServicesUtil.log.debug( "Mock behaviour - calling back after get session" ); deferred.resolve( user_data  ); }, 2000);
                    //#############################################################

                    return deferred.promise();
                },

                /**
                 * Attempts to login the user if params.autoLogIn is defined, and regardless, returns a promise object
                 * that can be used to monitor when the user has logged in (or failed to log in)
                 * @method login
                 * @param {Object} params an object containing keys
                 * <br>autoLogIn a boolean flag used to determine if this call should attempt to carry out an automatic
                 * log in. If this is true, it will attempt facebook first, then google+
                 * @return a deferred promise object that will be resolved or rejected when the user successfully or
                 * unsuccessfully attempts to log in (either automatically or via the UI)
                 */
                login: function( params )
                {
                    iwinGameServicesEvent.authLogin(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.auth.login', params );
                    var autoLogIn = params.autoLogIn;
                    if (autoLogIn && !iwinGameServicesUtil.validation.is_boolean( autoLogIn )) {
                        throw 'iwinGameServices.auth.login was called with autoLogIn that wasn\'t a boolean';
                    }
                    //Create a promise that the caller can use to determine when the login process has completed
                    iwinGameServices.auth.login_deferred = $.Deferred();
                    if (autoLogIn) {
                        var repeatingIntervalForFBbeingDefined = window.setInterval(
                            function () {
                                if (typeof(FB) !== 'undefined' && typeof(FB.getLoginStatus) !== 'undefined') {
                                    window.clearInterval(repeatingIntervalForFBbeingDefined);
                                    FB.getLoginStatus(function(fbresponse) {
                                        if (fbresponse.status === 'unknown') {
                                            var repeatingIntervalForGAPIBeingDefined = window.setInterval(
                                                function () {
                                                    if (typeof(gapi) !== 'undefined' && typeof(gapi.auth) !== 'undefined' && typeof(gapi.auth.authorize) !== 'undefined') {
                                                        window.clearInterval(repeatingIntervalForGAPIBeingDefined);
                                                        gapi.auth.authorize(
                                                            {
                                                                'client_id' : window._gpclientid,
                                                                'immediate' : true,
                                                                'response_type' : 'token',
                                                                'scope':'https://www.googleapis.com/auth/plus.login email'
                                                            }, function(gpresponse){
                                                                if (gpresponse === null) {
                                                                    iwinGameServices.auth.loginDeferred().reject({});
                                                                } else {
                                                                    window.gsigninCallback(gpresponse);
                                                                }
                                                            });
                                                    }
                                                }, 200);
                                        }
                                    });
                                }
                            }, 200);


                    }
                    return iwinGameServices.auth.login_deferred.promise();
                },

                /**
                 * Remove all user information from memory and from the localStorage. This will return a user to an initial
                 * anonymous level from the iwinGameServices side of the fence.
                 * @method logout
                 * @param {Object} params unused
                 * @return a deferred promise object that is resolved when the user has been logged out and all
                 * traces in localstorage have been removed
                 */
                logout: function( params )
                {
                    var u = iwinGameServices.user;
                    var o = iwinGameServices.oauth;
                    iwinGameServicesEvent.authLogOut(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.auth.logout', params );

                    //Create a promise that the caller can use to determine when the logout process has completed
                    iwinGameServices.auth.logout_deferred = $.Deferred();

                    // We need to traverse through all the games and all the levels to remove their localStorage of the game
                    // data
                    var current_user = iwinGameServices.user.currentUser();
                    var removeMappings = function(key) {
                        u.getGameMapping(key, function(game_mapping){
                            for (var level in game_mapping.all_levels_played) {
                                if (game_mapping.all_levels_played.hasOwnProperty(level)) {
                                    var storage = $.initNamespaceStorage('iwgs_g' + key + 'l' + level).localStorage;
                                    storage.removeAll();
                                }
                            }
                        });
                    };
                    for (var key in current_user.game_mappings) {
                        if (current_user.game_mappings.hasOwnProperty(key)) {
                            removeMappings(key);
                        }
                    }
                    u.assertStorageDefined().removeAll();
                    u.storage = null;
                    u.current_user = null;
                    o.assertStorageDefined().removeAll();
                    o.storage = null;
                    o.logged_in = false;
                    iwinGameServices.auth.logout_deferred.resolve({});
                    return iwinGameServices.auth.logout_deferred.promise();
                },

                /**
                 * Attempts to sign in to google +
                 * @method googleplusSignIn
                 * @return 
                 */
                googleplusSignIn: function() {
                    gapi.auth.authorize(
                        {
                            'client_id' : window._gpclientid,
                            'immediate' : false,
                            'response_type' : 'token',
                            'scope':'https://www.googleapis.com/auth/plus.login email'
                        }, window.gsigninCallback);
                },

                /**
                 * Determines a suitable URL for the facebook sign in, taking into account the client id.
                 * @method facebookSignInHREF
                 * @return BinaryExpression returns a url you can use in an anchor tag to launch facebook sign in
                 */
                facebookSignInHREF: function() {
                    // IE Fix as window.location.origin doesn't exist
                    if (!window.location.origin) {
                        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
                    }
                    var href = 'https://www.facebook.com/dialog/oauth/?client_id='+ window._fbclientid + '&response_type=token&scope=email,user_location&redirect_uri=';
                    var callback = window.location.origin + window.location.pathname.substr(0,window.location.pathname.lastIndexOf('/'))+'/site-console/views/facebookcallback.html';
                    return href + callback;
                }
            },

            /**
             * @class iwinGameServices.user
             * @type {iwinGameServices.user|*|{}}
             */
            user: {

                /**
                 * Show a popup/overlay showing the specified users Profile, with button to dismiss.
                 * @method showProfile
                 * @param {Object} params an object containing keys
                 * <br>userid: string
                 * @return 
                 */
                showProfile: function( params )
                {
                    iwinGameServicesEvent.userShowProfile(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.auth.showProfile', params );

                    var user_id = params.userid;
                    if ( !iwinGameServicesUtil.validation.is_string( user_id ) || iwinGameServicesUtil.validation.is_empty( user_id ) )
                    {
                        throw 'iwinGameServices.user.showProfile must be called with a user_id parameter, which must be a non empty string';
                    }

                    if (user_id === 'me') {
                        var user = $.extend({},iwinGameServices.user.currentUser());
                        user.avatar = user.photo_url;
                        iwinGameServices.user.updateProfileModal(user);
                    } else {
                        iwinGameServices.oauth.call_endpoint('/user/'+user_id, 'GET', null, function(user) {
                            iwinGameServices.user.updateProfileModal(user);
                        }, function() {}, false);
                    }

                    $('#profileModal').on('hidden.bs.modal', function (e) {
                        iwinGameServicesUtil.log.debug( "Profile display hidden by user" );
                    });
                },

                // Mapping for obtaining the lifetime level based upon the lifetime points
                lifetimeLevelPoints: [-1, 0, 11, 105, 288, 864, 2160, 4320, 6480, 9720, 14580, 18225, 22781, 28477, 31324, 34457, 37902, 41693, 45862, 50448, 52970, 55619, 58400, 60152, 61956, 63815, 65730, 67701, 69732, 71824, 73979, 76199, 78484, 80839, 83264, 85762, 88335, 90985, 93715, 96526, 98457, 100426, 102434, 104483, 106573, 108704, 110878, 113096, 115358, 117665, 120018, 122418],
                /**
                 * Determines the users lifetime level based upon their lifetime points
                 * @method getLifeTimeLevel
                 * @param {number} lifetimePoints the amount of points the user has
                 * @return returns an object with enough information to display the users level, and their progress
                 * through that level
                 */
                getLifeTimeLevel: function(lifetimePoints) {
                    var u = iwinGameServices.user;
                    if (lifetimePoints === undefined) { lifetimePoints = u.currentUser().lifetime_points; }
                    var lifeTimeLevel;
                    var maxed = false;
                    var gap;
                    var basepoints = u.lifetimeLevelPoints[0];
                    var percent = 100;
                    for (lifeTimeLevel = 1; lifeTimeLevel < u.lifetimeLevelPoints.length; lifeTimeLevel += 1) {
                        gap = u.lifetimeLevelPoints[lifeTimeLevel] - basepoints;
                        if (lifetimePoints < u.lifetimeLevelPoints[lifeTimeLevel]) {
                            break;
                        }
                        basepoints = u.lifetimeLevelPoints[lifeTimeLevel];
                    }
                    lifeTimeLevel -= 1;
                    if (lifetimePoints >= u.lifetimeLevelPoints[u.lifetimeLevelPoints.length - 1]) {
                        maxed = true;
                    } else {
                        percent = 100 * (lifetimePoints - basepoints) / gap;
                    }
                    return {
                        level: lifeTimeLevel,
                        percentInLevel: percent,
                        pointsLeft: maxed ? 0 : gap - (lifetimePoints - basepoints),
                        maxed: maxed
                    };
                },

                /**
                 * A helper function that determines the amount of XP a user should earn for a given length of time.
                 * The accrual is one point per minute played or part thereof
                 * @method xpForGameTime
                 * @param {number} gameTime the number of seconds the user has played that level for
                 * @return CallExpression
                 */
                xpForGameTime: function(gameTime) {
                    return Math.ceil(gameTime / 60);
                }
            },

            /**
             * @class iwinGameServices.chat
             * @type {iwinGameServices.chat|*|{}}
             */
            chat: {
                //NOTE more chat apis to follow once chat backend has been selected/reviewed/installed/etc

                /**
                 * if logged in - call chat system to broadcast the message on behalf of the current_user and notify
                 * promise, otherwise return error
                 * @method broadcast
                 * @param {Object} params an object containing keys
                 * <br>message: string - the message to broadcast
                 * @return a deffered promise that is resolve()'d when the message has been posted to the chat window.
                 */
                broadcast: function( params )
                {
                    iwinGameServicesEvent.chatBroadcast(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.chat.broadcast', params );

                    var message = params.message;
                    if ( !iwinGameServicesUtil.validation.is_string( message ) || iwinGameServicesUtil.validation.is_empty( message ) )
                    {
                        throw 'iwinGameServices.chat.broadcast must be called with a message parameter, which must be a non empty string';
                    }

                    //Create a promise that the caller can use to determine when the chat system has received the broad casted message
                    var deferred = $.Deferred();

                    //#############################################################
                    // MOCK IMPLEMENTATION
                    //#############################################################
                    //simulate the chat broadcast process which should be a quick thing
                    iwinGameServicesUtil.log.debug( "Mock behaviour - calling chat system for current user, with message=" + message );
                    setTimeout(function() { iwinGameServicesUtil.log.debug( "Mock behaviour - calling back after chat broadcast complete" ); deferred.resolve(); }, 100);
                    //#############################################################

                    return deferred.promise();
                }
            },

            /**
             * @class iwinGameServices.ads
             * @type {iwinGameServices.ads|*|{}}
             */
            ads: {
                //indication of whether the advert is playing
                advert_deferred: null,

                /**
                 * Show a popup/overlay showing an advert
                 * @method show
                 * @param {Object} params unused
                 * @return a deferred promise that is resolved when the advert is dismissed (manually or automatically)
                 */
                show: function( params )
                {
                    iwinGameServicesEvent.adsShow(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.ads.show', params );

                    //Create a promise that the caller can use to determine when the advert has completed
                    iwinGameServices.ads.advert_deferred = $.Deferred();

                    $('section.modals').show();
                    $('#advertModal').show();

                    iwinGameServicesUtil.ads.startCountDowns();

                    return iwinGameServices.ads.advert_deferred.promise();
                },

                /**
                 * a helper function that is called when the advert is dismissed
                 * @method hideAdvertOverlay
                 * @return 
                 */
                hideAdvertOverlay: function () {
                    $('section.modals').hide();
                    $('#advertModal').hide();
                    iwinGameServicesUtil.log.debug( "Mock behaviour - calling back after advert displayed" );
                    iwinGameServices.ads.advert_deferred.resolve();
                }

            },


            /**
             * Sets the exit button on the console to the correct location depending upon where we've been launched from
             * or whether we've got the ref query string parameter set
             * @method setExitButtonDomain
             * @return 
             */
            setExitButtonDomain: function() {
                var exitButton = $('.exit-game.btn');
                var dom = window.location.origin;
                var regex = new RegExp("[\\?&]ref=([^&#]*)")
                var results = regex.exec(location.search);
                var dest;
                if (results === null) {
                    if (dom === "http://s.games.iwin.com") {
                        dest = "http://s.m.iwin.com";
                    } else {
                        dest = "http://m.iwin.com";
                    }
                } else {
                    dest = decodeURIComponent(results[1].replace(/\+/g, " "));
                }

                $( exitButton ).click(function() {
                    document.location.href = dest;
                });
            }

        });
})();

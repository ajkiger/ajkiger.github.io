//#############################################################################
//Introduction
//#############################################################################
//This file provides all the support functionality for most of the methods. It
//is declared separately to keep the public facing API clean.
//
//#############################################################################
//Todo
//#############################################################################
//Todo add mock data store and switching logic to allow states to be setup for easy testing
//Todo javascript unit tests
//
/*jslint browser: true, devel: true */
/**
 * @class iwinGameServices
 * @type {iwinGameServices|*|{}}
 */
var iwinGameServices = (function()
{
    "use strict";
    return $.extend(true, iwinGameServices,
        {
            /** Game Data Model returned by this API - not strictly required in JS lingo as everything is an object -
             * but nice for an API
             * @method gameDataFromGameLevelData
             * @param {Object} game_level_data
             * @return game_data an {Object} that contains nothing but the structured data we need
             */
            gameDataFromGameLevelData: function( game_level_data ) {
                var game_data = {};
                game_data.highscore = game_level_data.highscore;
                game_data.time = game_level_data.time;
                game_data.won = game_level_data.won;
                game_data.data = game_level_data.data;
                return game_data;
            },

            /**
             * The underlying data stored by the localStorage
             * @method gameLevelData
             * @param {number} highscore
             * @param {number} level
             * @param {number} time
             * @param {boolean} won
             * @param {string} data
             * @return game_data an {Object} that contains nothing but the structured data we need
             */
            gameLevelData: function(highscore, level, time, won, data) {
                var game_data = {};
                game_data.highscore = highscore;
                game_data.time = time;
                game_data.won = won;
                game_data.data = data;
                return game_data;
            },

            /**
             * User Data Model returned by this API - not strictly required in JS lingo as everything is an object - but nice for an API
             * @method userDataFromAllGamesAllLevels
             * @param {Object} user_all_games_all_levels
             * @param {string} game_id
             * @return user
             */
            userDataFromAllGamesAllLevels : function( user_all_games_all_levels, game_id ) {
                var user = {};
                user.id = user_all_games_all_levels.id;
                user.name = user_all_games_all_levels.name;
                user.location = user_all_games_all_levels.location;
                user.photo_url = user_all_games_all_levels.photo_url;
                user.email = user_all_games_all_levels.email;
                user.lifetime_level = user_all_games_all_levels.lifetime_level;
                user.lifetime_points = user_all_games_all_levels.lifetime_points;
                if (user_all_games_all_levels.game_mappings && user_all_games_all_levels.game_mappings[game_id] !== null && user_all_games_all_levels.game_mappings[game_id] !== undefined) {
                    user.game_level = user_all_games_all_levels.game_mappings[game_id].current_level;
                } else {
                    user.game_level = 0;
                }
                user.signed_in = user_all_games_all_levels.signed_in;
                user.type = user_all_games_all_levels.type;
                return user;
            },

            /**
             * The underlying data stored by the localStorage
             * @method userDataAllGamesAllLevels
             * @param {string} id
             * @param {string} name
             * @param {string} location
             * @param {string} photo_url
             * @param {string} email
             * @param {boolean} signed_in
             * @param {number} lifetime_level
             * @param {number} lifetime_points
             * @param {Object} game_mappings
             * @param {string} type
             * @return user
             */
            userDataAllGamesAllLevels: function(id, name, location, photo_url, email, signed_in, lifetime_level, lifetime_points, game_mappings, type) {
                var user = {};
                user.id = id;
                user.name = name;
                user.location = location;
                user.photo_url = photo_url;
                user.email = email;
                user.signed_in = signed_in;
                user.lifetime_level = lifetime_level;
                user.lifetime_points = lifetime_points;
                user.game_mappings = game_mappings;
                user.type = type;
                return user;
            },

            /**
             * The underlying data stored by the localStorage
             * @method gameMapping
             * @param {string} game_id
             * @param {number} current_level
             * @param {Object} all_levels_played
             * @return game_mapping
             */
            gameMapping: function(game_id, current_level, all_levels_played) {
                var game_mapping = {};
                game_mapping.game_id = game_id;
                game_mapping.current_level = current_level;
                game_mapping.all_levels_played = all_levels_played;
                return game_mapping;
            },

            /**
             * @class iwinGameServices.game
             * @type {iwinGameServices.game|*|{}}
             */
             game: {
                /**
                 * current game id
                 * @property game_id
                 * @type string
                 */
                game_id: null,

                /**
                 * The current level we have an object and local storage for
                 * @property current_level
                 * @type number
                 */
                current_level: null,

                /**
                 * the object storage of this data
                 * @property game_data_for_level
                 * @type Object
                 */
                game_data_for_level: null,

                /**
                 * The localStorage namespace for this game/level storage
                 * @property storage
                 * @type Object
                 */
                storage: null,

                /**
                 * This number is used to store the games overall data against
                 * @property game_storage_level
                 * @type number
                 */
                game_storage_level: -2147483648,

                /**
                 * This method will either return the in-memory object of the localStorage object, or create one if we
                 * have a null reference
                 * @method assertStorageDefined
                 * @return a JQueryStorage object
                 */
                assertStorageDefined: function() {
                    var g = iwinGameServices.game;
                    if (g.storage === null) {
                        g.storage = $.initNamespaceStorage('iwgs_g' + g.game_id + 'l' + g.current_level).localStorage;
                    }
                    return iwinGameServices.game.storage;
                },

                /**
                 * This function is used to push the current state of the user into a local storage
                 * @method pushCurrentGameLevelToStorage
                 * @param {boolean} pushToServer
                 * @return 
                 */
                pushCurrentGameLevelToStorage: function(pushToServer) {
                    if (typeof pushToServer === 'undefined') { pushToServer = true; }
                    var u = iwinGameServices.user;
                    var g = iwinGameServices.game;
                    g.assertStorageDefined().set(g.game_data_for_level);
                    if (pushToServer) {
                        var endpoint = '/user/me/game/' + g.game_id;
                        iwinGameServices.oauth.call_endpoint(endpoint + '/level/' + g.current_level, 'POST', g.game_data_for_level, function() {}, function() {
                            // Failed to update... most likely because the user signed in before the call to level started/set level, so we must prepare the end point
                            // with the game information
                            u.getGameMapping(g.game_id, function(game_mapping){
                                game_mapping.current_level = g.current_level;
                                game_mapping.all_levels_played[g.current_level] = true;
                                u.pushCurrentUserToStorage();
                                iwinGameServices.oauth.call_endpoint('/user/me/game/' + g.game_id, 'POST', { current_level : game_mapping.current_level === g.game_storage_level ? 0 : game_mapping.current_level }, function() {
                                    iwinGameServices.oauth.call_endpoint(endpoint + '/level/' + g.current_level, 'POST', g.game_data_for_level, function() {}, function() {});
                                }, function() {});
                            });

                        });
                    }
                },

                /**
                 * This function pulls the current state of the user from the local storage
                 * @method pullCurrentGameLevelFromStorage
                 * @return the game data for the level or null if there aren't any
                 */
                pullCurrentGameLevelFromStorage: function() {
                    var g = iwinGameServices.game;
                    if (g.assertStorageDefined().keys().length > 0) {
                        g.game_data_for_level = g.assertStorageDefined().get(g.assertStorageDefined().keys());
                        return g.game_data_for_level;
                    } else {
                        return null;
                    }
                },

                /**
                 * This method will fetch the users game data for the current game/level from object storage if exists
                 * and if not, will fetch it from local storage. Later on, it could fetch this from an API call. If this
                 * detects we are on a different level, it will use this opportunity as a last ditch attempt to ensure we
                 * save all information about this level to the various storage locations.
                 * @method getGameDataForLevel
                 * @param {Object} params an object containing keys
                 * params.level - The level you want to get game data for
                 * @return returns the game data for the level
                 */
                getGameDataForLevel: function(params) {
                    var level = params.level;
                    var g = iwinGameServices.game;
                    if ( level === undefined || !iwinGameServicesUtil.validation.is_integer( level ) )
                    {
                        throw 'iwinGameServices.game.getGameDataForLevel must be called with a level parameter, which must be an integer, you supplied ' + level;
                    }
                    if (g.game_id === null)
                    {
                        throw 'iwinGameServices.game.getGameDataForLevel cannot be called until the iwinGameServices.init function has been called with a non-null game id';
                    }
                    if (g.game_data_for_level === null) {
                        g.current_level = params.level;
                        if (g.pullCurrentGameLevelFromStorage() === null) {
                            g.game_data_for_level = iwinGameServices.gameLevelData(0,0,-1,false,'');
                            g.pushCurrentGameLevelToStorage();
                        }
                    } else {
                        if (params.level !== g.current_level) {
                            // Push the current game state
                            g.pushCurrentGameLevelToStorage(g.current_level !== null);
                            // Revert the local storage location to null and prepare the parameters
                            g.storage = null;
                            g.current_level = level;
                            g.game_data_for_level = null;
                            return g.getGameDataForLevel(params);
                        }
                    }
                    return g.game_data_for_level;
                }
            },

            /**
             * @class iwinGameServices.auth
             * @type {iwinGameServices.auth|*|{}}
             */
            auth: {
                /**
                 * object to callback upon successful login
                 * @property login_deferred
                 * @type Object
                 */
                login_deferred: null,

                /**
                 * Helper function to obfuscate whether or not the login_deferred object exists and is resolveable or
                 * rejectable
                 * @method loginDeferred
                 * @return an object that reflects the JQuery deferred reject/resolve functions but prevents the calls
                 * being made when they shouldn't be made
                 */
                loginDeferred: function(){
                    return {
                        reject: function(param) {
                            var login_deferred = iwinGameServices.auth.login_deferred;
                            if (login_deferred && login_deferred.state() === 'pending') {
                                iwinGameServices.auth.login_deferred = null;
                                login_deferred.reject(param);
                            }
                        },
                        resolve: function(param) {
                            var login_deferred = iwinGameServices.auth.login_deferred;
                            if (login_deferred && login_deferred.state() === 'pending') {
                                iwinGameServices.auth.login_deferred = null;
                                login_deferred.resolve(param);
                            }
                        }
                    };
                },

                /**
                 * object to callback upon successful logout
                 * @property logout_deferred
                 * @type Object
                 */
                logout_deferred: null,

                /**
                 * This function is called when we receive notification from the Facebook API that the user has logged
                 * in Successfully. Periodically, when the access token is refreshed, this is also called. This function
                 * sets up the users local storage of the user account (both in memory and in HTML5 localStorage)
                 * @method facebookLoggedIn
                 * @param {} params not used
                 * @return 
                 */
                facebookLoggedIn: function(params) {
                    var a = iwinGameServices.auth;
                    var u = iwinGameServices.user;
                    var g = iwinGameServices.game;
                    iwinGameServicesEvent.authFacebookLoggedIn(params);
                    iwinGameServicesUtil.log.debug( 'iwinGameServices.auth.facebookLoggedIn', params);
                    var user = u.currentUser();
                    var access_token = (params && params.access_token) ? params.access_token : ((params && params.accessToken) ? params.accessToken : FB.getAccessToken());
                    FB.api('/me', {"access_token": access_token}, function(response) {
                        if (response.error) {
                            a.loginDeferred().reject('Facebook Login Failure');
                        } else if ((user.type !== 'Facebook' && user.type !== 'anonymous') || (response.id !== user.thirdpartyid && user.id !== 'anonymous')) {
                            // The user we have in memory is a different user, so we must clear everything
                            // out about the current user
                            a.logout().then(function(){
                                // Once we have cleared out the user storage, then call this function again.
                                a.facebookLoggedIn(params);
                            }, function() {
                                a.loginDeferred().reject('User already logged in to another account');
                            });
                        } else {
                            user.name = response.name;
                            if(response.location !== undefined && iwinGameServicesUtil.validation.is_string(response.location.name)) {
                                user.location = response.location.name;
                            } else {
                                user.location = 'No Location';
                            }
                            user.email = response.email;
                            user.thirdpartyid = response.id;
                            FB.api('/me/picture', {"access_token": access_token, "redirect": false, "type": "large" },function(response) {
                                if (response.error) {
                                    a.loginDeferred().reject('Facebook Login Failure');
                                } else {
                                    user.photo_url = response.data.url;
                                    user.signed_in = true;
                                    user.type ='Facebook';
                                    iwinGameServices.oauth.login_facebook(access_token, a.synchronizeUserFromServer, function(jqXHR){
                                        a.loginDeferred().reject('Failed to remotely log in to facebook - ' + jqXHR.status);
                                    });
                                }
                            });
                        }
                    });
                },

                /**
                 * This function is called when we receive notification from the Google+ API that the user has logged
                 * in Successfully. This function sets up the users local storage of the user account (both in memory
                 * and in HTML5 localStorage)
                 * @method googleLoggedIn
                 * @param {Object} params an object which contains keys of either
                 * access_token {string} the access token from Google+ or
                 * error {Object} the error we got from Google+
                 * @return 
                 */
                googleLoggedIn: function(params) {
                    var a = iwinGameServices.auth;
                    var u = iwinGameServices.user;
                    var g = iwinGameServices.game;
                    iwinGameServicesEvent.authGoogleLoggedIn(params);
                    iwinGameServicesUtil.log.debug('iwinGameServices.auth.googleLoggedIn', params);
                    if (params) {
                        if (params.access_token) {
                            gapi.auth.setToken(params);
                        }
                        if (params.error === undefined){
                            var user = u.currentUser();
                            gapi.client.load('plus','v1', function(){
                                var request = gapi.client.plus.people.get( {'userId' : 'me'} );
                                request.execute(function(obj) {
                                    if ((user.type !== 'Google+' && user.type !== 'anonymous') || (obj.id !== user.thirdpartyid && user.id !== 'anonymous')) {
                                        // The user we have in memory is a different google+ user, so we must clear everything
                                        // out about the current user
                                        a.logout().then(function(){
                                            // Once we have cleared out the user storage, then call this function again.
                                            a.googleLoggedIn(params);
                                        }, function() {
                                            a.loginDeferred().reject('User already logged in to another account');
                                        });
                                    } else {
                                        // Filter the emails object to find the user's primary account, which might
                                        // not always be the first in the array. The filter() method supports IE9+.
                                        user.thirdpartyid = obj.id;
                                        user.email = obj.emails.filter(function(v) {
                                            return v.type === 'account'; // Filter out the primary email
                                        })[0].value; // get the email from the filtered results, should always be defined.
                                        user.name = obj.displayName;
                                        user.photo_url = obj.image.url;
                                        user.signed_in = true;
                                        user.type = 'Google+';
                                        iwinGameServices.oauth.login_googleplus(gapi.auth.getToken().access_token, a.synchronizeUserFromServer, function(jqXHR){
                                            a.loginDeferred().reject('Failed to remotely log in to googleplus - ' + jqXHR.status);
                                        });
                                    }
                                });
                            });  // Trigger request to get the email address.
                        } else {
                            if (params.error !== 'immediate_failed') {
                                a.loginDeferred().reject('Google+ Login Failure');
                            }
                        }
                    } else {
                        a.loginDeferred().reject('Google+ Login Failure');
                    }
                },
                /**
                 * This takes the data we've received from the server and synchronise this with the user we've got
                 * locally
                 * @method synchronizeUserFromServer
                 * @param {Object} userFromServer the user object we've obtained from the server call to login to the
                 * log on server
                 * @return 
                 */
                synchronizeUserFromServer: function(userFromServer){
                    var u = iwinGameServices.user;
                    var g = iwinGameServices.game;
                    var a = iwinGameServices.auth;
                    u.synchronizeUsers(userFromServer);
                    u.pushCurrentUserToStorage();
                    g.storage = null;
                    u.getGameMapping(g.game_id, function() {
                        var user_data = iwinGameServices.userDataFromAllGamesAllLevels(u.currentUser(), g.game_id);
                        a.loginDeferred().resolve(user_data);
                    }, true);
                }
            },

            /**
             * @class iwinGameServices.user
             * @type {iwinGameServices.user|*|{}}
             */
            user: {
                /**
                 * Namespace for localStorage
                 * @property storage
                 * @type Object
                 */
                storage: null,

                /**
                 * This method will either return the in-memory object of the localStorage object, or create one if we
                 * have a null reference
                 * @method assertStorageDefined
                 * @return a JQueryStorage object
                 */
                assertStorageDefined: function() {
                    var u = iwinGameServices.user;
                    if (u.storage === null) {
                        u.storage = $.initNamespaceStorage('iwgs_user').localStorage;
                    }
                    return u.storage;
                },

                /**
                 * current user object
                 * @property current_user
                 * @type Object
                 */
                current_user: null,

                /**
                 * backend timeout for sending users data... used to minimise multiple post calls to the server. This is
                 * a Window.setTimeOut value
                 * @property backend_timeout
                 * @type number
                 */
                backend_timeout: null,

                /**
                 * This is the last user object that we have updated prior to sending it to the server
                 * @property backend_user_to_save
                 * @type Object
                 */
                backend_user_to_save: null,

                /**
                 * This function will either return the current user from the object storage if it exists, and if not,
                 * it will retrieve it from the local storage.
                 * @method currentUser
                 * @return a user object
                 */
                currentUser: function() {
                    var u = iwinGameServices.user;
                    if (u.current_user === null) {
                        if (u.pullCurrentUserFromStorage() === null) {
                            u.current_user = iwinGameServices.userDataAllGamesAllLevels( 'anonymous', 'Anonymous User', 'No Location', 'test/photo.png', '', false, 0, 0, {}, 'anonymous' );
                            u.pushCurrentUserToStorage();
                        }
                        u.current_user = $.extend({progress: iwinGameServices.user.getLifeTimeLevel}, u.current_user);
                    }
                    return u.current_user;
                },

                /**
                 * This function is used to push the current state of the user into a local storage
                 * @method pushCurrentUserToStorage
                 * @param {boolean} pushToServer
                 * @return 
                 */
                pushCurrentUserToStorage: function(pushToServer) {
                    if (typeof pushToServer === 'undefined') { pushToServer = true; }
                    var u = iwinGameServices.user;
                    var o = iwinGameServices.oauth;
                    var user = $.extend(true, {}, u.current_user);
                    delete user.signed_in;
                    u.assertStorageDefined().set(user);
                    if (pushToServer) {
                        if (u.backend_timeout === null) {
                            u.backend_timeout = window.setTimeout(function() {
                                o.call_endpoint('/user/me', 'POST', u.backend_user_to_save, function() {}, function() {});
                                window.clearTimeout(u.backend_timeout);
                                u.backend_timeout = null;
                            }, 500);
                        }
                        var user_to_save = $.extend(true, {}, user);
                        delete user_to_save.id;
                        delete user_to_save.game_mappings;
                        delete user_to_save.progress;
                        delete user_to_save.thirdpartyid;
                        delete user_to_save.type;
                        u.backend_user_to_save = user_to_save;
                    }
                },

                /**
                 * This function pulls the current state of the user from the local storage
                 * @method pullCurrentUserFromStorage
                 * @return a user object
                 */
                pullCurrentUserFromStorage: function() {
                    var u = iwinGameServices.user;
                    if (u.assertStorageDefined().keys().length > 0) {
                        var b = u.current_user === null;
                        u.current_user = u.assertStorageDefined().get(u.assertStorageDefined().keys());
                        if (b) {
                            u.current_user.signed_in = false;
                        }
                        return u.current_user;
                    } else {
                        return null;
                    }
                },

                /**
                 * This function will return a game_mapping object for the given game_id, creating one and pushing to
                 * the users local storage if needed.
                 * @method getGameMapping
                 * @param {String} game_id the game id you need a mapping for
                 * @param {function} callbackFunction This function is asyncronous, so you need to supply a callback
                 * function to call when the game mapping is obtained. This will be called with two parameters, the
                 * first is an object which is the game data, the second is a boolean that determines if a new game
                 * mapping was being created (true) or an existing one found (false).
                 * @param {boolean} force a flag to indicate that you want to force a request to fetch the information
                 * from the server
                 * @return 
                 */
                getGameMapping: function(game_id, callbackFunction, force) {
                    if (typeof force === 'undefined') { force = false; }
                    var u = iwinGameServices.user;
                    var o = iwinGameServices.oauth;
                    var g = iwinGameServices.game;
                    var game_mapping = u.currentUser().game_mappings[game_id];
                    if (game_mapping === undefined || game_mapping === null || force) {
                        o.call_endpoint('/user/me/game/' + game_id, 'GET', null, function(data){
                            game_mapping = iwinGameServices.gameMapping(g.game_id, data.current_level,{});
                            var current_level = g.current_level;
                            $.each(data.levels, function(index, value) {
                                game_mapping.all_levels_played[value.level] = true;
                                g.current_level = value.level;
                                g.game_data_for_level = value;
                                g.pushCurrentGameLevelToStorage(false);
                                g.storage = null;
                            });
                            g.current_level = current_level;
                            u.currentUser().game_mappings[game_id] = game_mapping;
                            u.pushCurrentUserToStorage(false);
                            callbackFunction(game_mapping, false);
                        }, function(jqXHR){
                            game_mapping = iwinGameServices.gameMapping(game_id, 0, {});
                            u.currentUser().game_mappings[game_id] = game_mapping;
                            u.pushCurrentUserToStorage(false);
                            callbackFunction(game_mapping, true);
                        });
                    } else {
                        callbackFunction(game_mapping, false);
                    }
                },

                /**
                 * This method is used to set the level of the user, and will push an update to the associated storage
                 * @method setLevel
                 * @param {Object} params an object containing keys
                 * accepts: params.level : integer
                 * @param {function} callbackFunction a function to call when the level has been set
                 * @return 
                 */
                setLevel: function(params, callbackFunction) {
                    var u = iwinGameServices.user;
                    var g = iwinGameServices.game;
                    var level = params.level;
                    if ( level === undefined || !iwinGameServicesUtil.validation.is_integer( level ) )
                    {
                        throw 'iwinGameServices.user.setLevel must be called with a level parameter, which must be an integer, you supplied ' + level;
                    }
                    u.getGameMapping(g.game_id, function(game_mapping){
                        game_mapping.current_level = level;
                        game_mapping.all_levels_played[level] = true;
                        u.pushCurrentUserToStorage();
                        iwinGameServices.oauth.call_endpoint('/user/me/game/' + g.game_id, 'POST', { current_level : game_mapping.current_level }, function() {}, function() {});
                        callbackFunction();
                    });
                },

                /**
                 * call this method to set the lifetime points, and it will calculate the lifetime level on the fly.
                 * @method setLifeTimePoints
                 * @param {number} lifetimePoints the lifetime points to set
                 * @param {boolean} pushToServer a flag to determine if we need to push this to the server
                 * @return 
                 */
                setLifeTimePoints: function(lifetimePoints, pushToServer) {
                    if (typeof pushToServer === 'undefined') { pushToServer = true; }
                    var u = iwinGameServices.user;
                    var user = u.currentUser();
                    user.lifetime_points = lifetimePoints;
                    user.lifetime_level = u.getLifeTimeLevel().level;
                    if (pushToServer) {
                        u.pushCurrentUserToStorage();
                    }
                },

                /**
                 * Takes the user provided and updates the user profile modal with this information
                 * @method updateProfileModal
                 * @param {Object} user the user object
                 * @return 
                 */
                updateProfileModal: function(user) {
                    var userScores = iwinGameServices.user.getLifeTimeLevel(user.lifetime_points);

                    var percentageLevelComplete = userScores.percentInLevel + '%';
                    var pointsInLevel = userScores.pointsLeft;
                    var lifetimePoints = user.lifetime_points;
                    var lifetimeLevel = userScores.level;
                    var isMaxed = userScores.maxed;
                    
                    if (isMaxed){
                        $('#userlifetimepointsProg').hide();
                    } else {
                        $('#userlifetimepointsProg').show();
                    }
                    $('#username').html(user.name);
                    $('#userlocation').html(user.location);
                    $('#userphoto').attr('src',user.avatar);
                    $('#userlifetimelevel').html(lifetimeLevel);
                    $('#userlifetimepointsProg').css('width',percentageLevelComplete);
                    $('#pointsRem span').html(pointsInLevel + " xp to next level");
                    $('#lifetimePoints').html(lifetimePoints);
                    $('#profileModal').show();
                },

                /**
                 * Synchronises the user data from the server with the local user
                 * @method synchronizeUsers
                 * @param {Object} userDataFromServer
                 * @return 
                 */
                synchronizeUsers: function(userDataFromServer) {
                    var u = iwinGameServices.user;
                    var localUser = u.currentUser();
                    u.setLifeTimePoints(Math.max(localUser.lifetime_points, userDataFromServer.lifetime_points), false);
                    localUser.id = '' + userDataFromServer.id;
                },

                /**
                 * Increases the lifetime points of the user by time passed
                 * @method increaseLifetimePoints
                 * @param {number} gameTime amount of time in seconds the user played for to add lifetime points
                 * @return 
                 */
                increaseLifetimePoints: function(gameTime) {
                    var u = iwinGameServices.user;
                    var xp = u.xpForGameTime(gameTime);
                    u.setLifeTimePoints(u.currentUser().lifetime_points + xp );
                }
            }
        });
})();

// Adding in callback for Facebook logging in via callback method
$(window).bind('storage', function (e) {
    "use strict";
    if (e.originalEvent.newValue !== null) {
        if (e.originalEvent.key === 'iwgs_facebook') {
            iwinGameServices.auth.facebookLoggedIn(JSON.parse(e.originalEvent.newValue));
        }
        else if (e.originalEvent.key === 'iwgs_googleplus') {
            iwinGameServices.auth.googleLoggedIn(JSON.parse(e.originalEvent.newValue));
        }
    }
});
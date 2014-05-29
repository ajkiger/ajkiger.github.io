/*jslint browser: true, devel: true */
/**
 * This file provides all the OAuth functionality to communicate to our back end
 * server
 *
 * @class iwinGameServices.oauth
 * @type {iwinGameServices.oauth|*|{}}
 */
var iwinGameServices = (function()
{
    "use strict";
    return $.extend(true, iwinGameServices, {
        oauth: {
            endpoint:                   window.location.host === 'games.iwin.com' ? 'https://l.iwin.com' : "https://sl.iwin.com",
            login_facebook_path:        "/login/facebook",
            login_googleplus_path:      "/login/googleplus",
            oauth_token_fetch_path:     "/oauth/authorize",
            oauth_client_id:            "030928fca0e8e83aacf38074ef06c0cd2c55c2a0a38eec7894c282d71af124bf",
            redirect_uri:               "urn:ietf:wg:oauth:2.0:oob",
            oauth_refresh_token_path:   "/oauth/token",

            // Namespace for sessionStorage
            storage: null,

            logged_in: false,

            /**
             * This method will either return the in-memory object of the sessionStorage object, or create one if we
             * have a null reference
             * @method assertStorageDefined
             * @return a JQueryStorage object
             */
            assertStorageDefined: function() {
                if (iwinGameServices.oauth.storage === null) {
                    iwinGameServices.oauth.storage = $.initNamespaceStorage('iwgs_oauth').sessionStorage;
                }
                return iwinGameServices.oauth.storage;
            },

            /**
             * This method is used to make a backend request to the logon server that the user has locally logged in
             * with facebook. You need to pass the OAuth token you have for facebook to this, as the backend attempts to
             * connect to facebook with that OAuth token to verify your user.
             * @method login_facebook
             * @param {string} token the Facebook OAuth token
             * @param {function} callbackSuccess a function to call when the user's signed in. This function is called
             * with one parameter, an {Object} of the user's data
             * @param {function} callbackFailure a function to call when the call to connect has failed. This function
             * is called with the same three parameters are passed to $.ajax error.
             * @return 
             */
            login_facebook: function(token, callbackSuccess, callbackFailure) {
                var o = iwinGameServices.oauth;
                $.ajax({
                    type: 'POST',
                    url: o.endpoint + o.login_facebook_path,
                    data: {
                        'token' : token
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(data) {
                        o.logged_in = true;
                        callbackSuccess(data);
                    },
                    error: callbackFailure
                });
            },

            /**
             * This method is used to make a backend request to the logon server that the user has locally logged in
             * with google+. You need to pass the OAuth token you have for google+ to this, as the backend attempts to
             * connect to google+ with that OAuth token to verify your user.
             * @method login_googleplus
             * @param {} token the Google+ OAuth token
             * @param {} callbackSuccess a function to call when the user's signed in. This function is called
             * with one parameter, an {Object} of the user's data
             * @param {} callbackFailure a function to call when the call to connect has failed. This function
             * is called with the same three parameters are passed to $.ajax error.
             * @return 
             */
            login_googleplus: function(token, callbackSuccess, callbackFailure) {
                var o = iwinGameServices.oauth;
                $.ajax({
                    type: 'POST',
                    url: o.endpoint + o.login_googleplus_path,
                    data: {
                        'token' : token
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(data) {
                        o.logged_in = true;
                        callbackSuccess(data);
                    },
                    error: callbackFailure
                });
            },

            /**
             * This function is a convenience function to call the login server endpoints, and where an access token is
             * required, automatically append an OAuth token, or if this has timed out, re-request a refreshed access
             * token, and repeat the call.
             * @method call_endpoint
             * @param {string} api the api endpoint you are trying to reach
             * @param {string} type the HTTP request type 'GET', 'POST', 'PUT', 'DELETE' etc... limited to what the browser
             * supports
             * @param {Object} data an object of data you can pass back to the server
             * @param {function} callbackSuccess a function to call when the request completes. This function is called
             * with one parameter, an {Object} of the data received from the server
             * @param {function} callbackFailure a function to call when the call to connect has failed. This function
             * is called with the same three parameters are passed to $.ajax error.
             * @param {boolean} requireAccessToken whether the end point is known to require an access token. If this is
             * true, the request to the endpoint will have the OAuth token applied if the user has logged in. If the
             * user hasn't logged in, and this is true, then callbackFailure is called immediately with 'User not logged
             * in'
             * @return 
             */
            call_endpoint: function(api, type, data, callbackSuccess, callbackFailure, requireAccessToken){
                if (typeof requireAccessToken === 'undefined') { requireAccessToken = true; }
                var o = iwinGameServices.oauth;

                if (o.logged_in){
                    o.access_token(function(access_token){
                        o._call_endpoint(access_token, api, type, data, callbackSuccess, function(xhr) {
                            if (xhr.status === 401){
                                o.refresh_token(function(access_token) {
                                    o._call_endpoint(access_token, api, type, data, callbackSuccess, callbackFailure, true);
                                }, callbackFailure);
                            } else {
                                callbackFailure();
                            }
                        }, true);
                    }, function(error) {
                        callbackFailure(error);
                    });
                } else {
                    if (requireAccessToken) {
                        callbackFailure('User not logged in');
                    } else {
                        o._call_endpoint(null, api, type, data, callbackSuccess, callbackFailure);
                    }
                }
            },

            _call_endpoint: function(access_token, api, type, data, callbackSuccess, callbackFailure, requireAccessToken) {
                $.ajax({
                    type: type,
                    url: iwinGameServices.oauth.endpoint + api,
                    data: data,
                    beforeSend: function (xhr) {
                        if (requireAccessToken){
                            xhr.setRequestHeader('Authorization', "Bearer " + access_token);
                        }
                        xhr.setRequestHeader('Accept',        "application/json");
                    },
                    success: function(data) {
                        callbackSuccess(data);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        callbackFailure(jqXHR, textStatus, errorThrown);
                    }
                });
            },

            /**
             * This function will attempt to return the access_token if it exists, or if not, will attempt to fetch it
             * for the current logged in user
             * @method access_token
             * @param {function} callbackSuccess If this was successful, this will be called with a single parameter,
             * the access token to use in the Authorization: Bearer ACCESS_TOKEN http header
             * @param {function} callbackFailure If this was not successful, this will be called with a single parameter
             * containing the exception that was thrown
             * @return
             */
            access_token: function(callbackSuccess, callbackFailure) {
                var o = iwinGameServices.oauth;
                var s = o.assertStorageDefined();
                var access_token = s.get('access_token');
                if (! access_token ) {
                    $.ajax({
                        type: 'POST',
                        url: o.access_token_fetch_path(),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Accept', 'application/json');
                        },
                        success: function(response) {
                            access_token = response.token;
                            s.set('access_token', access_token);
                            s.set('refresh_token', response.refresh_token);
                            callbackSuccess(access_token);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            callbackFailure(errorThrown);
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    });
                } else {
                    callbackSuccess(access_token);
                }
            },

            /**
             * This function will attempt to refresh the user's OAuth token from the log on server by requesting a new
             * token providing the refresh token it was supplied with on connection
             * @method refresh_token
             * @param {function} callbackSuccess If this was successful, this will be called with a single parameter,
             * the access token to use in the Authorization: Bearer ACCESS_TOKEN http header
             * @param {function} callbackFailure If this was not successful, this will be called with a single parameter
             * containing the exception that was thrown
             * @return 
             */
            refresh_token: function(callbackSuccess, callbackFailure) {
                var o = iwinGameServices.oauth;
                var s = o.assertStorageDefined();
                var ref_token = s.get('refresh_token');
                if ( ref_token ) {
                    var data = {
                        'client_id': o.oauth_client_id,
                        'grant_type': 'refresh_token',
                        'refresh_token': ref_token
                    };
                    $.ajax({
                        type: 'POST',
                        url: o.refresh_token_fetch_path(),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader('Accept', 'application/json');
                        },
                        data: data,
                        success: function(response) {
                            var access_token = response.access_token;
                            s.set('access_token', access_token);
                            s.set('refresh_token', response.refresh_token);
                            callbackSuccess(access_token);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            callbackFailure(errorThrown);
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    });
                } else {
                    callbackFailure("oAuth token does not have a refresh token");
                }
            },

            /**
             * A helper function that returns the endpoint URL for requesting an OAuth token
             * @method access_token_fetch_path
             * @return {string} a URL that can be used to fetch an OAuth token
             */
            access_token_fetch_path: function() {
                var o = iwinGameServices.oauth;
                return o.endpoint + o.oauth_token_fetch_path + '?client_id=' + o.oauth_client_id + '&redirect_uri=' + o.redirect_uri + '&response_type=token';
            },

            /**
             * A helper function that returns the endpoint URL for requesting a refreshed OAuth token
             * @method refresh_token_fetch_path
             * @return {string} a URL that can be used to fetch an OAuth token
             */
            refresh_token_fetch_path: function() {
                var o = iwinGameServices.oauth;
                return o.endpoint + o.oauth_refresh_token_path;
            }
        }
    });
})();

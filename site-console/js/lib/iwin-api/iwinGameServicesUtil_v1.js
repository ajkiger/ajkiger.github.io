/*jslint browser: true, devel: true */
/**
 * @class iwinGameServicesUtil
 * @type {iwinGameServicesUtil|*|{}}
 */
var iwinGameServicesUtil = (function()
{
    "use strict";
    return $.extend(iwinGameServicesUtil,
        {
            debug_enabled: true,
            error_enabled: true,
            advertSkipCountdown: 5000,
            gameReadyCountdown: 10000,
            dismissAdvertCountdown: 30000,
            /**
             * @class iwinGameServicesUtil.log
             * @type {iwinGameServicesUtil.log|*|{}}
             */
            log: {
                /**
                 * Logs a debug message to the javascript console if debug logging has been enabled
                 * @method debug
                 * @param {string} message the message you want to debug
                 * @param {object} params any parameters you want to debug log out
                 * @return 
                 */
                debug: function( message, params )
                {
                    if (window.console && iwinGameServicesUtil.debug_enabled)
                    {
                        console.log( "Called " + message );
                        if ( params !== undefined && params )
                        {
                            console.log( "with params object" );
                            console.log( params );
                        }
                    }
                },
                /**
                 * Logs an error message to the javascript console if error logging has been enabled
                 * @method error
                 * @param {string} message the message you want to error out
                 * @return 
                 */
                error: function( message )
                {
                    if (window.console && iwinGameServicesUtil.error_enabled)
                    {
                        console.log( "ERROR:" + message );
                    }
                }
            },

            /**
             * @class iwinGameServicesUtil.ads
             * @type {iwinGameServicesUtil.ads|*|{}}
             */
            ads: {
                /**
                 * Start the advert timer for pre-game adverts
                 * @method startCountDowns
                 * @return 
                 */
                startCountDowns: function(){
                    iwinGameServicesUtil.ads.prepareButtons();
                    iwinGameServicesUtil.ads.updateCountdown(iwinGameServicesUtil.advertSkipCountdown);
                    setTimeout(function() {
                        console.log("countdown dismissAdvertCountdown has finished");
                        var gameLoadedPrevention = setInterval(function() {
                            if (iwinGameServices.game.loadedFlag) {
                                iwinGameServicesUtil.ads.dismissAdvertAfterCountdown();
                                clearInterval(gameLoadedPrevention);
                            }
                        }, 100);

                    }, iwinGameServicesUtil.dismissAdvertCountdown);
                },

                /**
                 * Hide the close and skip buttons and show the loading progress dialog
                 * @method prepareButtons
                 * @return 
                 */
                prepareButtons: function() {
                    $('#advertModal .modal-header .close').hide();
                    $('#advertModal .modal-footer .btn-success').hide();
                    $('.loading').show();
                },

                /**
                 * Hide the loading progress button, and show and add callback handlers to the skip and close buttons
                 * @method displayButtons
                 * @return 
                 */
                displayButtons: function() {
                    $('#advertModal .modal-header .close').show();
                    $('#advertModal .modal-footer .btn-success').show();
                    $('.loading').hide();
                    $('button.skip').click(function(e){
                        iwinGameServices.ads.hideAdvertOverlay();
                    });
                    $('button.close').click(function(e){
                        iwinGameServices.ads.hideAdvertOverlay();
                    });
                },

                /**
                 * Helper function that actually starts the timer interval that elapses the period of time the advert
                 * should be displayed before it times out.
                 * @method updateCountdown
                 * @param {number} delay the time in millis the advert should delay for
                 * @return 
                 */
                updateCountdown: function(delay) {
                    var cnt = delay;
                    function uiCountdown(){
                        if (cnt <= 0 && iwinGameServices.game.loadedFlag){
                            stopUiCountdown();
                        }
                        cnt = cnt - 200;
                    }
                    var countDown = setInterval(uiCountdown, 200);

                    function stopUiCountdown(){
                        clearInterval(countDown);
                        iwinGameServicesUtil.ads.displayButtons();
                    }
                },

                /**
                 * Hide the advert overlay (if it exists)
                 * @method dismissAdvertAfterCountdown
                 * @return 
                 */
                dismissAdvertAfterCountdown: function() {
                    var advertModal = $('#advertModal');
                    if (advertModal.length > 0) {
                        iwinGameServices.ads.hideAdvertOverlay();
                    }
                }

            },

            /**
             * @class iwinGameServicesUtil.validation
             * @type {iwinGameServicesUtil.validation|*|{}}
             */
            validation: {
                /**
                 * is the number an integer
                 * @method is_integer
                 * @param {Object} value the value to test it's integer status
                 * @return true if the number is an integer or false otherwise
                 */
                is_integer: function( value )
                {
                    return !isNaN(parseInt(value, 10)) && parseInt(value, 10) === parseFloat(value);
                },
                /**
                 * is the value a string
                 * @method is_string
                 * @param {Object} value the value to test it's string status
                 * @return true if the value is a string or false otherwise
                 */
                is_string: function( value )
                {
                    return $.type( value ) === 'string';
                },
                /**
                 * is the array or string empty
                 * @method is_empty
                 * @param {Object} value the value to test the emptiness of
                 * @return true if the value.length is equal to 0 or false otherwise
                 */
                is_empty: function( value )
                {
                    return value.length === 0;
                },
                /**
                 * is the value a boolean
                 * @method is_boolean
                 * @param {Object} value the value to test the boolean status of
                 * @return true if the value's type is boolean, otherwise false
                 */
                is_boolean: function( value )
                {
                    return $.type( value ) === 'boolean';
                }
            }
        });
})();

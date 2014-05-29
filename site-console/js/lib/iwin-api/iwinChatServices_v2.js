/*jslint browser: true, devel: true */
/* global $ */
/**
 * <br>#############################################################################
 * <br>Introduction
 * <br>#############################################################################
 * <br>Main interface to iWin Chat System.
 * <br>See documentation for detailed flow of calls, but quick version is
 * <br>iwinChatServices.init( ... );                        - init the chat system
 * <br>iwinChatServices.registerXXXXXXXXCallback( ... );    - register callbacks you are interested in - most likely all of them :)
 * <br>iwinChatServices.connect( ... );                     - make connection to chat system
 * <br>Then user/chat UI initiated actions to
 * <br>iwinChatServices.hasBlockedUser     - determine if current user has blocked a specified user.
 * <br>iwinChatServices.broadcastFromUser  - send a message from the user.
 * <br>iwinChatServices.logout             - logout.
 * <br>iwinChatServices.isCurrentRoom      - test if room id matches room id user is currently in.
 * <br>iwinChatServices.blockUser          - block a specific user.
 * <br>iwinChatServices.allowUser          - allow a specified user.
 * <br>iwinChatServices.reportUser         - report a user.
 * <br>iwinChatServices.rooms              - retrieve list of rooms and occupancy levels.
 * <br>iwinChatServices.changeRoom         - change to a different room.
 * <br>And game initiated actions to
 * <br>iwinChatServices.broadcastFromGame  - send a message from the game.
 * <br>
 * <br>The only areas likely to change much are the handling of connection interruption/loss
 * as we have yet to decide if we will automatically manage the disconnect
 * or allow the client to be notified and it can decide what to do.
 *
 * @class iwinChatServices
 * @type {iwinChatServices|*|{}}
 */
var iwinChatServices = iwinChatServices || {};

(function()
{
    "use strict";
    $.extend(true, iwinChatServices,
    {

        //params - object containing keys

        /**
         * Initializes the chat session, it does some basic checking of the values we are going to connect
         * with. It will throw an exception if any of the values supplied are junk
         * @method init
         * @param {Object} params object containing keys
         * <br> identity - the external public identity of the real user, i.e. an email address
         * <br> oauthToken - the oauth token we will validate security against
         * <br> nickname - the nickname the user will be known by
         * <br> game - the name of the game the user is playing
         * <br> uid - the unique identifier for this user
         * <br> avatar - the http url for the users avatar
         * @return 
         */
        init: function( params )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.init', params );
            iwinChatServices.internal.initSuccess = false;
            iwinChatServices.internal.identity = params.identity;
            iwinChatServices.internal.oauthToken = params.oauthToken;
            iwinChatServices.internal.nickname = params.nickname;
            iwinChatServices.internal.game = params.game;
            iwinChatServices.internal.uid = params.uid;
            iwinChatServices.internal.avatar = params.avatar;
            iwinChatServices.internal.validate( iwinChatServices.internal.identity, "identity" );
            iwinChatServices.internal.validate( iwinChatServices.internal.oauthToken, "oauthToken" );
            iwinChatServices.internal.validate( iwinChatServices.internal.nickname, "nickname" );
            iwinChatServices.internal.validate( iwinChatServices.internal.game, "game" );
            iwinChatServices.internal.validate( iwinChatServices.internal.uid, "uid" );
            iwinChatServices.internal.validate( iwinChatServices.internal.avatar, "avatar" );
            iwinChatServices.internal.initSuccess = true;
        },

        /**
         * You can and will need to set a number of handlers to listen for important events that occur, both system and user initiated.
         * <br>All calls are by their nature non synchronous.
         * <br>
         * <br>The registered function, if set, will be called back when the chat session is established
         * <br>Method signature: function () {}
         * <br>Typically there is nothing for the client to do in this case.
         * @method registerOnOpenCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnOpenCallback: function( handlerFunction )              { iwinChatServices.handlers.onOpenFunction = handlerFunction;               },

        /**
         * The registered function, if set, will be called back when the user has logged out.
         * <br>Method signature: function () {}
         * @method registerOnLogOutCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnLogOutCallback: function( handlerFunction )             { iwinChatServices.handlers.onLogOutFunction = handlerFunction;              },

        /**
         * The registered function, if set, will be called back when the user joins a room.
         * <br>On initial chat session connect this will be called with data relating to the users current room/profile/etc.
         * <br>Method signature: function ( jsonObject ) {}
         * <br>jsonObject has structure
         * <br>{
         * <br>    "user": {
         * <br>    "uid": "...",
         * <br>        "nickname": "...",
         * <br>        "avatar": "..."
         * <br>    },
         * <br>    "room": {
         * <br>        "roomId": "jewelquest57000",
         * <br>        "roomName": "jewelquest57000",
         * <br>        "maxSize": 50,
         * <br>        "population": 1,
         * <br>        "users": [
         * <br>        {
         * <br>            "uid": "...",
         * <br>            "nickname": "...",
         * <br>            "avatar": "..."
         * <br>        },
         * <br>        ...
         * <br>        ]
         * <br>    }
         * <br>}
         * @method registerOnMyJoinedRoomCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnMyJoinedRoomCallback: function( handlerFunction )    { iwinChatServices.handlers.onMyJoinedRoomFunction = handlerFunction;    },

        /**
         * The registered function, if set, will be called back when another user joins the room.
         * <br>Method signature: function ( jsonObject ) {}
         * <br>jsonObject has structure
         * <br>{"user":{"uid":"...","nickname":"...","avatar":"..."}}
         * @method registerOnOtherUserJoinedCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnOtherUserJoinedCallback: function( handlerFunction )            { iwinChatServices.handlers.onOtherUserJoinedFunction = handlerFunction;            },

        /**
         * The registered function, if set, will be called back when another user leaves the room.
         * <br>Method signature: function ( jsonObject ) {}
         * <br>jsonObject has structure
         * <br>{"user":{"uid":"...","nickname":"...","avatar":"..."}}
         * @method registerOnOtherUserLeftCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnOtherUserLeftCallback: function( handlerFunction )              { iwinChatServices.handlers.onOtherUserLeftFunction = handlerFunction;              },

        /**
         * The registered function, if set, will be called when a message from another user is available for rendering.
         * You will not receive callbacks for messages from users that the user has blocked.
         * <br>Method signature: function ( jsonObject ) {}
         * <br>jsonObject has structure
         * <br>{"content":"some message to be displayed","user":{"uid":"...","nickname":"...","avatar":"..."}}
         * @method registerOnOtherUsersMessageCallback
         * @param {} handlerFunction
         * @return 
         */
        registerOnOtherUsersMessageCallback: function( handlerFunction )     { iwinChatServices.handlers.onOtherUsersMessageFunction = handlerFunction;     },

        /**
         * The registered function, if set, will be called when a message sent by the current user is available for rendering.
         * <br>Method signature: function ( jsonObject ) {}
         * <br>jsonObject has structure
         * <br>{"content":"some message to be displayed","user":{"uid":"...","nickname":"...","avatar":"..."}}
         * @method registerOnMyMessageCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnMyMessageCallback: function( handlerFunction )         { iwinChatServices.handlers.onMyMessageFunction = handlerFunction;         },

        /**
         * The registered function, if set, will be called when a message from another users game is available for rendering.
         * You will not receive callbacks for messages from users that the user has blocked.
         * <br>Method signature: function ( jsonObject ) {}
         * <br>jsonObject has structure
         * <br>{"content":"some message to be displayed","user":{"uid":"...","nickname":"...","avatar":"..."}}
         * @method registerOnOtherUsersGameMessageCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnOtherUsersGameMessageCallback: function( handlerFunction )     { iwinChatServices.handlers.onOtherUsersGameMessageFunction = handlerFunction;     },

        /**
         * The registered function, if set, will be called when a message sent by the current users game is available for rendering.
         * <br>Method signature: function ( jsonObject ) {}
         * <br>jsonObject has structure
         * <br>{"content":"some message to be displayed","user":{"uid":"...","nickname":"...","avatar":"..."}}
         * @method registerOnMyGameMessageCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnMyGameMessageCallback: function( handlerFunction )         { iwinChatServices.handlers.onMyGameMessageFunction = handlerFunction;         },

        /**
         * The registered function, if set, will be called when a list of rooms is returned by the server, in response to calling, iwinChatServices.rooms.
         * <br>Method signature: function ( roomsArrayObject ) {}
         * <br>roomsArrayObject has structure
         * <br>[
         * <br>{
         * <br>    "roomId": "jewelquest57000",
         * <br>    "roomName": "jewelquest57000",
         * <br>    "maxSize": 50,
         * <br>    "population": 1,
         * <br>},
         * <br>...,
         * <br>...,
         * <br>]
         * @method registerOnRoomsCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnRoomsCallback: function( handlerFunction )             { iwinChatServices.handlers.onRoomsFunction = handlerFunction;             },

        /**
         * The registered function, if set, will be called when the server failed to change the users room, in response to calling, iwinChatServices.changeRoom.
         * <br>Method signature: function ( reason ) {}
         * <br>reason : a string reason for the failure, may not be suitable for display to end user.
         * @method registerOnChangeRoomFailedCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnChangeRoomFailedCallback: function( handlerFunction )  { iwinChatServices.handlers.onChangeRoomFailedFunction = handlerFunction;  },

        /**
         * The registered function, if set, will be called when the server has logged your wish to report a user, in response to calling, iwinChatServices.reportUser.
         * <br>Method signature: function ( ) {}
         * @method registerOnUserReportedCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnUserReportedCallback: function( handlerFunction )      { iwinChatServices.handlers.onUserReportedFunction = handlerFunction;      },

        /**
         * The registered function, if set, will be called when the API has determined that chat is not working correctly.
         * You may reattempt a connection via init and connect but it is unlikely to work.
         * <br>Method signature: function ( ) {}
         * @method registerOnChatNotWorkingCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnChatNotWorkingCallback: function( handlerFunction)     { iwinChatServices.handlers.onChatNotWorkingFunction = handlerFunction;    },

        /**
         * The registered function, if set, will be called when the API has failed to send the chat message
         * <br>Method signature: function ( messageBody ) {}
         * @method registerOnMyMessageFailedCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnMyMessageFailedCallback: function( handlerFunction)     { iwinChatServices.handlers.onMyMessageFailedFunction = handlerFunction;    },

        /**
         * The registered function, if set, will be called when the API has failed to send the chat message
         * <br>Method signature: function ( messageBody ) {}
         * @method registerOnMyGameMessageFailedCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnMyGameMessageFailedCallback: function( handlerFunction)     { iwinChatServices.handlers.onMyGameMessageFailedFunction = handlerFunction;    },

        /**
         * The registered function, if set, will never be called
         * @method registerOnDisconnectedCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnDisconnectedCallback: function( handlerFunction)       {  },

        /**
         * The registered function, if set, will never be called
         * @method registerOnReconnectAttemptCallback
         * @param {function} handlerFunction
         * @return 
         */
        registerOnReconnectAttemptCallback: function( handlerFunction)   {  },

        /**
         * Makes a connection to the chat server with the data passed into the init method
         * It will throw an exception if init has not succeeded
         * @method connect
         * @return 
         */
        connect: function()
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.connect', null );
            iwinChatServices.internal.makeConnection( );
        },

        /**
         * Broadcasts a chat message
         * @method broadcastFromUser
         * @param {Object} params object containing keys
         * <br>message - the message to send to the chat system
         * @return 
         */
        broadcastFromUser: function( params )
        {
            if ( iwinChatServices.isMessageTooLong( params.message ) )
            {
                iwinChatServices.internal.log.error('iwinChatServices.broadcastFromUser - sending message failed it was too long.');
                iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyMessageFailedFunction ,  params.message );
            }
            else
            {
                iwinChatServices.internal.log.debug( 'iwinChatServices.broadcastFromUser', params );
                var connectionAttempt = iwinChatServices.internal.connectionAttempt;
                $.post( iwinChatServices.internal.buildEntryPointUrl('broadcastFromUser'),
                        { msg : params.message, uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken }
                      ).done( function()
                        {
                            var jsonMessage = { content : params.message, user : iwinChatServices.internal.user };
                            iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyMessageFunction , jsonMessage );
                        }
                      ).fail( function()
                        {
                            iwinChatServices.internal.log.error('iwinChatServices.broadcastFromUser - sending message failed.');
                            iwinChatServices.internal.addFailedMessage(iwinChatServices.broadcastFromUser, params, connectionAttempt);
                            iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyMessageFailedFunction ,  params.message );
                            iwinChatServices.internal.incrementErrorCount();
                        }
                );
            }
        },

        /**
         * Broadcasts a message from the game
         * @method broadcastFromGame
         * @param {Object} params object containing keys
         * <br>message - the message to send to the chat system
         * @return 
         */
        broadcastFromGame: function( params )
        {
            if ( iwinChatServices.isMessageTooLong( params.message ) )
            {
                iwinChatServices.internal.log.error('iwinChatServices.broadcastFromGame - sending message failed it was too long.');
                iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyGameMessageFailedFunction ,  params.message );
            }
            else
            {
                iwinChatServices.internal.log.debug( 'iwinChatServices.broadcastFromGame', params );
                var connectionAttempt = iwinChatServices.internal.connectionAttempt;
                $.post( iwinChatServices.internal.buildEntryPointUrl('broadcastFromGame'),
                        { msg : params.message, uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken }
                      ).done( function()
                        {
                            var jsonMessage = { content : params.message, user : iwinChatServices.internal.user };
                            iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyGameMessageFunction , jsonMessage );
                        }
                      ).fail( function()
                        {
                            iwinChatServices.internal.log.error('iwinChatServices.broadcastFromGame - sending message failed.');
                            iwinChatServices.internal.addFailedMessage(iwinChatServices.broadcastFromGame, params, connectionAttempt);
                            iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyGameMessageFailedFunction ,  params.message );
                            iwinChatServices.internal.incrementErrorCount();
                        }
                );
            }
        },

        /**
         * Logs out closing any connections
         * @method logout
         * @param {Object} params object for future API extension
         * @return 
         */
        logout: function( params )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.logout', params );
            $.post( iwinChatServices.internal.buildEntryPointUrl('logout'),
                    { msg : params.message, uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken }
            ).done( function()
                {
                    iwinChatServices.internal.log.debug('iwinChatServices.logout - session closed after log out.');
                    iwinChatServices.internal.performCallback( iwinChatServices.handlers.onLogOutFunction , null );
                }
            ).always( function ()
                {
                    iwinChatServices.internal.stopAllTasks();
                }
            );
        },

        /**
         * Checks to see if the roomId is the room we are currently in.
         * @method isCurrentRoom
         * @param {string} roomId a string identifying the room (normally retrieved from a room object).
         * @return BinaryExpression
         */
        isCurrentRoom: function( roomId )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.isCurrentRoom', roomId );
            return iwinChatServices.internal.room.roomId === roomId;
        },

        /**
         * Blocks the selected users messages from appearing.
         * @method blockUser
         * @param {string} uid a string identifying the user (normally retrieved from a user object).
         * @return 
         */
        blockUser: function( uid )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.blockUser', uid );
            var index = $.inArray(uid, iwinChatServices.internal.filter);
            if (index === -1)
            {
                iwinChatServices.internal.filter.push( uid );
                iwinChatServices.internal.namespacedLocalStorage.set( 'filter', iwinChatServices.internal.filter );
                //$.post( iwinChatServices.internal.buildEntryPointUrl('blockUser'),
                //    { uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken, blockedUid: uid }
                //);
            }
        },

        /**
         * Determines if the user has been blocked based on the users filter.
         * @method hasBlockedUser
         * @param {string} uid a string identifying the user (normally retrieved from a user object).
         * @return BinaryExpression
         */
        hasBlockedUser: function( uid )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.hasBlockedUser', uid );
            var index = $.inArray(uid, iwinChatServices.internal.filter);
            return index !== -1;
        },

        /**
         * Allows the selected users messages to appear.
         * @method allowUser
         * @param {string} uid a string identifying the user (normally retrieved from a user object).
         * @return 
         */
        allowUser: function( uid )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.allowUser', uid );
            var index = $.inArray(uid, iwinChatServices.internal.filter);
            if (index >= 0)
            {
                iwinChatServices.internal.filter.splice(index, 1);
                iwinChatServices.internal.namespacedLocalStorage.set( 'filter', iwinChatServices.internal.filter );
                //$.post( iwinChatServices.internal.buildEntryPointUrl('allowUser'),
                //    { uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken, allowedUid: uid }
                //);
            }
        },

        /**
         * Allows the selected user to be reported for misconduct.
         * @method reportUser
         * @param {string} uid a string identifying the user (normally retrieved from a user object).
         * @return 
         */
        reportUser: function( uid )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.reportUser', uid );
            var connectionAttempt = iwinChatServices.internal.connectionAttempt;
            $.post( iwinChatServices.internal.buildEntryPointUrl('reportUser'),
                    { uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken, reportedUid: uid }
                  ).done( function()
                    {
                        iwinChatServices.internal.log.debug('iwinChatServices.reportUser success - reported user.');
                        iwinChatServices.internal.performCallback( iwinChatServices.handlers.onUserReportedFunction , null );
                    }
                  ).fail( function()
                {
                    iwinChatServices.internal.log.error('iwinChatServices.reportUser failed');
                    iwinChatServices.internal.addFailedMessage(iwinChatServices.reportUser, uid, connectionAttempt);
                    iwinChatServices.internal.incrementErrorCount();
                }
            );
        },

        /**
         * Allows a list of other available rooms to be retrieved.
         * @method rooms
         * @param {Object} params object for future API extension
         * @return 
         */
        rooms: function( params )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.rooms', params );
            var connectionAttempt = iwinChatServices.internal.connectionAttempt;
            $.get( iwinChatServices.internal.buildEntryPointUrl('rooms') , { "_": $.now() , "game": iwinChatServices.internal.game }
                 ).done( function( jsonMessage )
                    {
                        iwinChatServices.internal.log.debug('iwinChatServices.rooms success - received rooms');
                        iwinChatServices.internal.performCallback( iwinChatServices.handlers.onRoomsFunction , jsonMessage.rooms );
                    }
                 ).fail( function()
                    {
                        iwinChatServices.internal.log.error('iwinChatServices.rooms failed');
                        iwinChatServices.internal.addFailedMessage(iwinChatServices.rooms, params, connectionAttempt);
                        iwinChatServices.internal.incrementErrorCount();
                    }
            );
        },

        /**
         * Allows user to change to the specified room.
         * @method changeRoom
         * @param {string} roomId a string identifying the room (normally retrieved from a room object).
         * @return 
         */
        changeRoom: function( roomId )
        {
            iwinChatServices.internal.log.debug( 'iwinChatServices.changeRoom', roomId );
            var connectionAttempt = iwinChatServices.internal.connectionAttempt;
            $.post( iwinChatServices.internal.buildEntryPointUrl('changeRoom'),
                { uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken, roomId: roomId }
            ).done( function( jsonMessage )
                {
                    iwinChatServices.internal.log.debug('iwinChatServices.changeRoom success - changed room');
                    iwinChatServices.internal.handleJoinRoom( jsonMessage );
                }
            ).fail( function( jsonMessage )
                {
                    iwinChatServices.internal.log.error('iwinChatServices.changeRoom failed - changed room failed.');
                    iwinChatServices.internal.addFailedMessage(iwinChatServices.changeRoom, roomId, connectionAttempt);
                    iwinChatServices.internal.performCallback( iwinChatServices.handlers.onChangeRoomFailedFunction , jsonMessage.reason );
                    iwinChatServices.internal.incrementErrorCount();
                }
            );
        },

        /**
         * A check to determine if the given message exceeds the maximum supported length of messages
         * @method isMessageTooLong
         * @param {} message the message you want to test
         * @return BinaryExpression returns true if the message is too long, otherwise false
         */
        isMessageTooLong: function( message )
        {
            if ( message === null )
            {
                return false;
            }
            return message.length > iwinChatServices.internal.maxMessageLength;
        },

        //Callback handlers for important events in a chat sessions lifecycle.
        //DO NOT reference in your code !!
        handlers:
        {
            onOpenFunction: null,
            onLogOutFunction: null,
            onOtherUserJoinedFunction: null,
            onOtherUserLeftFunction: null,
            onMyJoinedRoomFunction: null,
            onOtherUsersMessageFunction: null,
            onMyMessageFunction: null,
            onOtherUsersGameMessageFunction: null,
            onMyGameMessageFunction: null,
            onRoomsFunction: null,
            onChangeRoomFailedFunction: null,
            onUserReportedFunction: null,
            onChatNotWorkingFunction: null,
            onMyMessageFailedFunction: null,
            onMyGameMessageFailedFunction: null
        },

        //Utility methods.
        //Note all code/variables in here is subject to change
        //DO NOT reference in your code !!
        /**
         * @class iwinChatServices.internal
         * @type {iwinChatServices.internal|*|{}}
         */
        internal:
        {
            connectionString: null,
            identity: null,
            oauthToken: null,
            nickname: null,
            game: null,
            uid: null,
            avatar: null,
            user: null,
            room: {},
            filter: [],
            initSuccess: false,
            messageHeadInterval: null,
            messageHeadPollDelay: 7000,
            messageHeadId: -1,
            messageTailId: -1,
            maxMessageLength: 256,
            presenceSendDelay: 60000,
            presenceInterval: null,
            namespacedLocalStorage: null,
            errorCount: 0,
            errorThreshold: 0,
            connectionAttempt: -1,

            /**
             * @method makeConnection
             * @return 
             */
            makeConnection: function()
            {
                iwinChatServices.internal.validateInitSuccess();
                iwinChatServices.internal.buildConnectionString();
                var data = { };
                data.identity = iwinChatServices.internal.identity;
                data.oauthToken = iwinChatServices.internal.oauthToken;
                data.nickname = iwinChatServices.internal.nickname;
                data.game = iwinChatServices.internal.game;
                data.uid = iwinChatServices.internal.uid;
                data.avatar = iwinChatServices.internal.avatar;
                iwinChatServices.internal.namespacedLocalStorage = $.initNamespaceStorage('iwinchat_' + iwinChatServices.internal.uid).localStorage;
                if ( iwinChatServices.internal.namespacedLocalStorage.isSet( 'filter' ) )
                {
                    iwinChatServices.internal.filter = iwinChatServices.internal.namespacedLocalStorage.get( 'filter' );
                }
                iwinChatServices.internal.errorCount = 0;
                if ( iwinChatServices.internal.namespacedLocalStorage.isSet( 'room' ) )
                {
                    data.room = iwinChatServices.internal.namespacedLocalStorage.get( 'room' );
                }

                iwinChatServices.internal.connectionAttempt += 1;
                $.post( iwinChatServices.internal.buildEntryPointUrl('connect'), data
                      ).done( function( jsonMessage )
                        {
                            iwinChatServices.internal.log.debug('iwinChatServices.connect - connection opened.');
                            iwinChatServices.internal.handleJoinRoom( jsonMessage );
                            iwinChatServices.internal.performCallback( iwinChatServices.handlers.onOpenFunction , null );
                            iwinChatServices.internal.startPollForMessagesHead();
                            iwinChatServices.internal.startSendingPresence();
                            iwinChatServices.internal.retransmitFailedMessages();
                        }
                      ).fail( function()
                        {
                            iwinChatServices.internal.log.debug('iwinChatServices.connect - connection failed.');
                            iwinChatServices.internal.stopAllTasks();
                            iwinChatServices.internal.performCallback( iwinChatServices.handlers.onChatNotWorkingFunction, null);
                        }
                );
            },

            // a list of all messages we want to re-transmit on the next connection
            failedMessagesForReTransmission: [],

            /**
             * When we have a failed message, we'll potentially add this to the failed message stack
             * @method addFailedMessage
             * @param {function} func
             * @param {Object} params
             * @param {number} connectionAttempt
             * @return 
             */
            addFailedMessage: function (func, params, connectionAttempt) {
                if (func) {
                    if (connectionAttempt === iwinChatServices.internal.connectionAttempt) {
                        // We've failed in the current connection attempt, so we must add this attempt to add this
                        // message onto the stack
                        var failedMessage = {
                            func: func,
                            params: params
                        };
                        switch (func) {
                            case iwinChatServices.broadcastFromUser:
                                iwinChatServices.internal.failedMessagesForReTransmission.push(failedMessage);
                                break;
                            case iwinChatServices.broadcastFromGame:
                                iwinChatServices.internal.failedMessagesForReTransmission.push(failedMessage);
                                break;
                            case iwinChatServices.reportUser:
                                iwinChatServices.internal.removePreDuplicateFailedMessage(func, params, true);
                                iwinChatServices.internal.failedMessagesForReTransmission.push(failedMessage);
                                break;
                            case iwinChatServices.rooms:
                                break;
                            case iwinChatServices.changeRoom:
                                iwinChatServices.internal.removePreDuplicateFailedMessage(func, null, false);
                                iwinChatServices.internal.failedMessagesForReTransmission.push(failedMessage);
                                break;
                        }
                    } else {
                        // This message came from a different connection attempt, so we will try and re-issue it instead
                        switch (func) {
                            case iwinChatServices.broadcastFromGame:
                            case iwinChatServices.broadcastFromUser:
                            case iwinChatServices.reportUser:
                            case iwinChatServices.changeRoom:
                                func(params);
                                break;
                        }
                    }
                }
            },

            /**
             * When we are looking to add a failed message, you can call this to remove any existing message that
             * matches the message you are wanting to add... do this to prevent unnecessary network traffic.
             * @method removePreDuplicateFailedMessage
             * @param {function} func
             * @param {} params
             * @param {} testParams
             * @return 
             */
            removePreDuplicateFailedMessage: function (func, params, testParams) {
                for (var i = 0; i < iwinChatServices; i+= 1) {
                    var failedMessage = iwinChatServices.internal.failedMessagesForReTransmission[i];
                    if (failedMessage.func === func && (testParams || (JSON.stringify(failedMessage.params) === JSON.stringify(params)))) {
                        iwinChatServices.split(i, 1);
                        i -= 1;
                    }
                }
            },

            /**
             * Call this on connection/reconnection to ensure that any messages that are queued up are sent out.
             * @method retransmitFailedMessages
             * @return 
             */
            retransmitFailedMessages: function () {
                // Store the existing array just in case new messages are added on to the back of the original array
                var failedMessagesForReTransmission = iwinChatServices.internal.failedMessagesForReTransmission;
                // Set the failed messages array back to empty
                iwinChatServices.internal.failedMessagesForReTransmission = [];
                for (var i = 0; i < failedMessagesForReTransmission.length; i += 1) {
                    var failedMessage = failedMessagesForReTransmission[i];
                    if (failedMessage.func) {
                        failedMessage.func(failedMessage.params);
                    }
                }
            },

            /**
             * @method shouldAllowMessage
             * @param {} uid
             * @return BinaryExpression
             */
            shouldAllowMessage: function( uid )
            {
                return $.inArray(uid, iwinChatServices.internal.filter) === -1;
            },

            /**
             * @method buildEntryPointUrl
             * @param {} entryPoint
             * @return BinaryExpression
             */
            buildEntryPointUrl: function( entryPoint )
            {
                return iwinChatServices.internal.connectionString + '/' + entryPoint;
            },

            /**
             * @method buildConnectionString
             * @return 
             */
            buildConnectionString: function()
            {
                iwinChatServices.internal.connectionString = 'https://' + iwinChatServices.internal.determineChatHost() + '/chat';
                iwinChatServices.internal.log.debug( 'iwinChatServices.internal.buildConnectionString - connection string=' + iwinChatServices.internal.connectionString );
            },

            /**
             * @method determineChatHost
             * @return 
             */
            determineChatHost: function()
            {
                if ( window.location.host === '127.0.0.1'   ||
                     window.location.host === 'localhost'   ||
                     window.location.host === 'sc.iwin.com' ||
                     window.location.host === 'c.iwin.com'  ||
                     window.location.host === 'c.iplay.mobi')
                {
                    return window.location.host;
                }
                else if ( window.location.host === 's.games.iwin.com' ||
                          window.location.host === 'local.games.iwin.com' )
                {
                    return 'sc.iwin.com';
                }
                else
                {
                    return 'c.iwin.com';
                }
            },

            /**
             * @method incrementErrorCount
             * @return 
             */
            incrementErrorCount: function()
            {
                iwinChatServices.internal.errorCount += 1;
                if ( iwinChatServices.internal.errorCount > iwinChatServices.internal.errorThreshold )
                {
                    iwinChatServices.internal.log.debug('iwinChatServices.internal.incrementErrorCount - threshold reached.');
                    iwinChatServices.internal.stopAllTasks();
                    iwinChatServices.internal.performCallback( iwinChatServices.handlers.onChatNotWorkingFunction, null);
                }
            },

            /**
             * @method stopAllTasks
             * @return 
             */
            stopAllTasks: function()
            {
                iwinChatServices.internal.cancelPollForMessageHead();
                iwinChatServices.internal.cancelSendingPresence();
            },

            /**
             * @method validateInitSuccess
             * @return 
             */
            validateInitSuccess: function()
            {
                if (!iwinChatServices.internal.initSuccess)
                {
                    throw 'Cannot establish chat session as the data passed to init is invalid';
                }
            },

            /**
             * @method isCurrentUser
             * @param {} uid
             * @return BinaryExpression
             */
            isCurrentUser: function( uid )
            {
                return iwinChatServices.internal.user.uid === uid;
            },

            /**
             * @method validate
             * @param {} value
             * @param {} fieldName
             * @return 
             */
            validate: function( value, fieldName )
            {
                if ( !iwinChatServices.internal.is_string( value ) || iwinChatServices.internal.is_empty( value ) )
                {
                    throw "Cannot initialize the chat system with an empty or non string value for " + fieldName + " you specified " + value;
                }
            },

            /**
             * @method is_string
             * @param {} value
             * @return BinaryExpression
             */
            is_string: function( value )
            {
                return $.type( value ) === 'string';
            },

            /**
             * @method is_empty
             * @param {} value
             * @return BinaryExpression
             */
            is_empty: function( value )
            {
                return value.length === 0;
            },

            /**
             * @method performCallback
             * @param {} theFunction
             * @param {} callbackContent
             * @return 
             */
            performCallback: function( theFunction, callbackContent )
            {
                if ( theFunction !== 'undefined' && theFunction )
                {
                    if ( callbackContent !== null )
                    {
                        theFunction( callbackContent );
                    }
                    else
                    {
                        theFunction();
                    }
                }
            },

            /**
             * @method performFilteredMessageCallback
             * @param {} jsonMessage
             * @return 
             */
            performFilteredMessageCallback: function( jsonMessage )
            {
                if ( iwinChatServices.internal.isCurrentUser(jsonMessage.user.uid) )
                {
                    iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyMessageFunction , jsonMessage );
                }
                else if ( iwinChatServices.internal.shouldAllowMessage( jsonMessage.user.uid ) )
                {
                    iwinChatServices.internal.performCallback( iwinChatServices.handlers.onOtherUsersMessageFunction , jsonMessage );
                }
            },

            /**
             * @method performFilteredGameMessageCallback
             * @param {} jsonMessage
             * @return 
             */
            performFilteredGameMessageCallback: function( jsonMessage )
            {
                if ( iwinChatServices.internal.isCurrentUser(jsonMessage.user.uid) )
                {
                    iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyGameMessageFunction , jsonMessage );
                }
                else if ( iwinChatServices.internal.shouldAllowMessage( jsonMessage.user.uid ) )
                {
                    iwinChatServices.internal.performCallback( iwinChatServices.handlers.onOtherUsersGameMessageFunction , jsonMessage );
                }
            },

            /**
             * @method performFilteredActionCallback
             * @param {} theFunction
             * @param {} jsonMessage
             * @return 
             */
            performFilteredActionCallback: function( theFunction, jsonMessage )
            {
                if ( theFunction !== 'undefined' && theFunction )
                {
                    if ( iwinChatServices.internal.shouldAllowMessage( jsonMessage.user.uid ) )
                    {
                        theFunction( jsonMessage );
                    }
                }
            },

            /**
             * @method removeUserFromRoom
             * @param {} uid
             * @return 
             */
            removeUserFromRoom: function( uid )
            {
                var removed = false;
                var users = iwinChatServices.internal.room.users;
                for(var i = 0; i < users.length; i++)
                {
                    if(users[i].uid === uid)
                    {
                        users.splice(i, 1);
                        removed = true;
                    }
                }
                if ( removed )
                {
                    iwinChatServices.internal.room.population = iwinChatServices.internal.room.population - 1;
                }
            },

            /**
             * @method addUserToRoom
             * @param {} joiningUser
             * @return 
             */
            addUserToRoom: function( joiningUser )
            {
                var addToRoom = true;
                var users = iwinChatServices.internal.room.users;
                for(var i = 0; i < users.length; i++)
                {
                    if(users[i].uid === joiningUser.uid)
                    {
                        addToRoom = false;
                        break;
                    }
                }
                if ( addToRoom )
                {
                    iwinChatServices.internal.room.users.push( joiningUser );
                    iwinChatServices.internal.room.population = iwinChatServices.internal.room.population + 1;
                }
            },

            /**
             * @method associateUserJoinedRoomData
             * @param {} jsonMessage
             * @return 
             */
            associateUserJoinedRoomData: function( jsonMessage )
            {
                iwinChatServices.internal.user = jsonMessage.user;
                iwinChatServices.internal.room = jsonMessage.room;
                iwinChatServices.internal.namespacedLocalStorage.set( 'room' , iwinChatServices.internal.room.roomId);
                //iwinChatServices.internal.filter = jsonMessage.filter;
            },

            /**
             * @method handleJoinRoom
             * @param {} jsonMessage
             * @return 
             */
            handleJoinRoom: function( jsonMessage )
            {
                iwinChatServices.internal.associateUserJoinedRoomData( jsonMessage );
                iwinChatServices.internal.performCallback( iwinChatServices.handlers.onMyJoinedRoomFunction, jsonMessage);
            },

            /**
             * @method startPollForMessagesHead
             * @return 
             */
            startPollForMessagesHead: function()
            {
                iwinChatServices.internal.log.debug( 'iwinChatServices.internal.startPollForMessagesHead' );
                iwinChatServices.internal.messageHeadInterval = setInterval(iwinChatServices.internal.pollForMessageHead, iwinChatServices.internal.messageHeadPollDelay);
            },

            /**
             * @method startSendingPresence
             * @return 
             */
            startSendingPresence: function()
            {
                iwinChatServices.internal.log.debug( 'iwinChatServices.internal.startSendingPresence' );
                iwinChatServices.internal.presenceInterval = setInterval(iwinChatServices.internal.sendPresence, iwinChatServices.internal.presenceSendDelay);
            },

            /**
             * @method cancelSendingPresence
             * @return 
             */
            cancelSendingPresence: function()
            {
                if ( iwinChatServices.internal.presenceInterval !== null )
                {
                    iwinChatServices.internal.log.debug( 'iwinChatServices.internal.cancelSendingPresence' );
                    clearInterval( iwinChatServices.internal.presenceInterval );
                }
            },

            /**
             * @method cancelPollForMessageHead
             * @return 
             */
            cancelPollForMessageHead: function()
            {
                if ( iwinChatServices.internal.messageHeadInterval !== null )
                {
                    iwinChatServices.internal.log.debug('iwinChatServices.cancelPollForMessageHead');
                    clearInterval(iwinChatServices.internal.messageHeadInterval);
                }
            },

            /**
             * @method sendPresence
             * @return 
             */
            sendPresence: function()
            {
                iwinChatServices.internal.log.debug( 'iwinChatServices.internal.sendPresence' );
                $.get( iwinChatServices.internal.buildEntryPointUrl('userPresence') ,
                    { "_": $.now(), uid: iwinChatServices.internal.uid, oauthToken: iwinChatServices.internal.oauthToken }
                ).fail( function()
                    {
                        iwinChatServices.internal.log.error('iwinChatServices.internal.sendPresence failed');
                        iwinChatServices.internal.incrementErrorCount();
                    }
                );
            },

            /**
             * @method pollForMessageHead
             * @return 
             */
            pollForMessageHead: function()
            {
                iwinChatServices.internal.log.debug('iwinChatServices.internal.pollForMessageHead');
                $.get( iwinChatServices.internal.buildEntryPointUrl('getMessagesForRoom') , { "_": $.now(), roomId : iwinChatServices.internal.room.roomId }
                ).done( function( jsonMessages )
                    {
                        iwinChatServices.internal.log.debug('iwinChatServices.internal.pollForMessageHead success');
                        for(var i=0; i<jsonMessages.length; i++)
                        {
                            iwinChatServices.internal.handleMessage( jsonMessages[i], true );
                        }
                    }
                ).fail( function()
                    {
                        iwinChatServices.internal.log.error('iwinChatServices.internal.pollForMessageHead failed');
                        iwinChatServices.internal.incrementErrorCount();
                    }
                );
            },


            /**
             * @method handleMessage
             * @param {} jsonMessage
             * @param {} ignoreMyMessages
             * @return 
             */
            handleMessage: function( jsonMessage, ignoreMyMessages )
            {
                //Remember the first message we ever received so we can tell if remote server has been bounced
                if ( iwinChatServices.internal.messageTailId === 0 )
                {
                    iwinChatServices.internal.messageTailId = jsonMessage.id;
                }

                //if remote server has been bounced we need to reset the messageHeadId + messageTailId back so we can display the messages
                if ( jsonMessage.id < iwinChatServices.internal.messageTailId )
                {
                    iwinChatServices.internal.messageTailId = jsonMessage.id;
                    iwinChatServices.internal.messageHeadId = jsonMessage.id;
                }

                if ( jsonMessage.id > iwinChatServices.internal.messageHeadId )
                {
                    iwinChatServices.internal.log.debug('iwinChatServices.internal.handleMessage');
                    var myMessage = iwinChatServices.internal.isCurrentUser( jsonMessage.user.uid );
                    if ( jsonMessage.type === 'MSG' && (!myMessage || !ignoreMyMessages) )
                    {
                        iwinChatServices.internal.performFilteredMessageCallback( jsonMessage );
                    }
                    else if ( jsonMessage.type === 'GAMEMSG' && (!myMessage || !ignoreMyMessages))
                    {
                        iwinChatServices.internal.performFilteredGameMessageCallback( jsonMessage );
                    }
                    else if ( jsonMessage.type === 'JOINED' && !myMessage )
                    {
                        iwinChatServices.internal.addUserToRoom( jsonMessage.user );
                        iwinChatServices.internal.performFilteredActionCallback( iwinChatServices.handlers.onOtherUserJoinedFunction, jsonMessage );
                    }
                    else if ( jsonMessage.type === 'LEFT' && !myMessage )
                    {
                        iwinChatServices.internal.removeUserFromRoom( jsonMessage.user.uid );
                        iwinChatServices.internal.performFilteredActionCallback( iwinChatServices.handlers.onOtherUserLeftFunction, jsonMessage );
                    }
                    iwinChatServices.internal.messageHeadId = jsonMessage.id;
                }
            },

            /**
             * @class iwinChatServices.internal.log
             * @type {iwinChatServices.internal.log|*|{}}
             */
            log:
            {
                debug_enabled: true,
                error_enabled: true,
                consoleArea: $('#console-area'),

                /**
                 * log a debug message
                 * @method debug
                 * @param {string} message a string containing text you want to debug out
                 * @param {object} params an object containing the parameters to debug
                 * @return 
                 */
                debug: function( message, params )
                {
                    if (window.console && iwinChatServices.internal.log.debug_enabled)
                    {
                        console.log( "Called " + message );
                        if ( params !== 'undefined' && params )
                        {
                            console.log( "with params object" );
                            console.log( params );
                        }
                    }
                    iwinChatServices.internal.log.showInFakeConsole('DEBUG', message, params );
                },
                /**
                 * log an error message
                 * @method error
                 * @param {string} message a string containing text you want to error out
                 * @return 
                 */
                error: function( message )
                {
                    if (window.console && iwinChatServices.internal.log.error_enabled)
                    {
                        console.log( "ERROR:" + message );
                    }
                    iwinChatServices.internal.log.showInFakeConsole('ERROR', message, null );
                },

                /**
                 * @method showInFakeConsole
                 * @param {} messageType
                 * @param {} message
                 * @param {} params
                 * @return 
                 */
                showInFakeConsole: function( messageType, message, params )
                {
                    if ( iwinChatServices.internal.log.consoleArea.length > 0 )
                    {
                        var log = '<div class="well"><p>' + messageType + ' : ' + message + '</p></div>';

                        if ( params !== 'undefined' && params )
                        {
                            log = '<div class="well"><p>' + messageType + ' : ' + message + ' : ' + JSON.stringify( params ) + '</p></div>';
                        }
                        iwinChatServices.internal.log.consoleArea.append( log );
                    }
                }
            }
        }

    });

})();

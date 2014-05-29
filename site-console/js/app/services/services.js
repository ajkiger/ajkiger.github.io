define(['angular'], function (angular) {
	angular.module('iWinConsoleApp.services', [])
		.value('config', {
			gameContainerClass: 'game-container',
			gameUrl: 'game/',
			gameIframe: 'iconsole-plugin-session_iframe__'
		})
		.factory('xdmService', ['config', function (Config) {
			return {
				pendingSockets: {},
				sockets: {},
				isReady: true,

				init: function (data) {
					$($.proxy(function () {
						this.isReady = true;
						for (var id in this.pendingSockets) {
							if (this.pendingSockets.hasOwnProperty(id)) {
								this.createSocket(this.pendingSockets[id]);
							}
						}
						this.pendingSockets = {};
					}, this));
				},

				createSocket: function (socketData) {
					var id = socketData.id;
					if (this.isReady) {
						this.sockets[id] = new easyXDM.Socket(socketData);
					} else {
						this.pendingSockets[id] = socketData;
					}
				},

				openSocket: function (id, data) {
					var url = data.url;
					var container = data.container ?
						data.container.attr('id') : 'game-frame';
					var props = data.props ? data.props : {};
					props.id = id;
					props.name = name;
					var socketData = {
						id: id,
						hash: true,
						remote: url, // the path to the provider,
						//usePost:true,
						container: container,
						props: props,
						onMessage: $.proxy(function (message, origin) {
							var request = this.getRequestFromMessage(message);
							if (data.onMessage) {
								data.onMessage(request);
							}
						}, this),
						onReady: $.proxy(function () {
							if (data.onReady) {
								data.onReady();
							}
						}, this)
					};
					this.createSocket(socketData);
				},

				getSocket: function (id) {
					return this.sockets[id];
				},

				sendCommand: function (id, name, data, type) {
					if (!data) {
						data = {};
					}
					var socket = this.getSocket(id);
					if (socket) {
						var request = {
							command: name,
							type: type,
							data: data
						};
						var requestJson = JSON.stringify(request);
						setTimeout($.proxy(function () {
							socket.postMessage(requestJson);
						}), 1);
					} else {
						console.warn("console:sendCommand - no socket opened");
					}
				},

				getRequestFromMessage: function (message) {
					var xdmService = this;
					var request = $.parseJSON(message);
					request.result = function (data) {
						xdmService.sendResponse(this, data);
					};
					return request;
				},

				sendResponse: function (request, data) {
					if (!data) {
						data = {};
					}
					var response = {
						command: "onCommandResult",
						type: "response",
						id: request.id,
						data: data,
						requestData: request.data
					};
					this.sockets[Config.gameIframe]
						.postMessage(JSON.stringify(response));
				},

				closeSocket: function (id) {
					var socket = sockets[id];
					socket.destroy();
					delete this.sockets[id];
				}

			};
		}])
		.factory('iWinService', ['$log', function ($log) {
			return {

				init: function (id) {
					try {
						iwinGameServices.init({id: id, debugEnabled: false, errorEnabled: true});
						return true;
					}
					catch (consumed) {
						$log.error(consumed);
						return false;
					}
				},

				login: function (initial, success, error) {
					try {
						iwinGameServices.auth.login({autoLogIn: initial}).then(function () {
								success();
							},
							function () {
								error();
							});
					}
					catch (consumed) {
						$log.error(consumed);
						error();
					}
				},

				logout: function (success, error) {
					try {
						FB.logout(function (response) {
							success({type: 'fb', response: response});
						});
					}
					catch (consumed) {
						$log.error(consumed);
					}
					try {
						gapi.auth.signOut();
						success({type: 'gp'});
					}
					catch (consumed) {
						$log.error(consumed);
					}
					try {
						iwinGameServices.auth.logout({}).then(function () {
								success({type: 'iwin'});
							},
							function () {
								error();
							});
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

				hasSession: function () {
					try {
						iwinGameServices.auth.getSession({})
							.then(function (res) {
								return res.signed_in;
							},
							function (err) {
							});
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

				getCurrentUser: function () {
					return iwinGameServices.user.currentUser();
				},

				showAd: function (gameCode, force, onClose) {
					try {
						iwinGameServices.ads.show({gameCode: gameCode, force: force}).then(function () {
								onClose();
							},
							function () {
								onClose();
							});
					}
					catch (consumed) {
						onClose();
						$log.error(consumed);
					}
				},


				handleGameLoaded: function () {
					try {
						iwinGameServices.game.loaded({})
							.then(function () {

							},
							function () {

							});
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

                handleGetLevelData: function (level, success, error) {
					try {
						iwinGameServices.game.getLevelData({level: level})
							.then((success !== null && typeof(success) === 'function') ? success : function () {},
                                  (  error !== null && typeof( error ) === 'function') ? error   : function () {});
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

                handleSetLevelData: function (data) {
					try {
						iwinGameServices.game.setLevelData(data)
							.then(function () {
							},
							function () {
							});
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

                handleGetGameData: function (data) {
                    try {
                        return iwinGameServices.game.getGameData(params);
                    } catch (consumed) {
                        $log.error(consumed);
                    }
                },

                handleSetGameData: function (data) {
                    try {
                        iwinGameServices.game.setGameData(data);
                    } catch (consumed) {
                        $log.error(consumed);
                    }
                },

                handlePostHighScore: function (data) {
                    try {
                        iwinGameServices.game.postHighScore(data);
                    } catch (consumed) {
                        $log.error(consumed);
                    }
                },

				sendChatMessage: function (message, success, error) {
					try {
						iwinGameServices.chat.broadcast({ message: message })
							.then(function () {
								success();
							},
							function () {
								error();
							});
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

				showProfile: function (data, isBlocked, $scope) {
                    iwinGameServices.user.showProfile(data);
                    $('section.modals').show();

                    $('section.modals').click(function(e){
                        hideProfile();
                    });

                    $('button.close').click(function(e){
                        hideProfile();
                    });

                    $('.btn.unignore').click(function(e){
                        $scope.allowUser($scope.userIdDataValue);
                        setBlockedButtonsState();
                        hideProfile();
                    });

                    $('.btn.ignore').click(function(e){
                        $scope.blockUser($scope.userIdDataValue);
                        setBlockedButtonsState();
                        hideProfile();
                    });

                    $('.btn.report').click(function(e){
                        $scope.reportUser($scope.userIdDataValue);
                        hideProfile();
                    });

                    var setBlockedButtonsState = function () {

                        if (isBlocked == true) {
                            $scope.showIgnoreBtn = false;
                            $scope.showUnignoreBtn = true;
                        } else {
                            $scope.showIgnoreBtn = true;
                            $scope.showUnignoreBtn = false;
                        }
                    };
                    setBlockedButtonsState();

                    var hideProfile = function () {
                        $('section.modals').hide();
                        $('#profileModal').hide();
                        $('section.modals').off('click');
                        $('button.close').off('click');
                        $('.btn.unignore').off('click');
                        $('.btn.ignore').off('click');
                        $('.btn.report').off('click');
                        $scope.userIdDataValue = "";
                        $scope.$apply();
                    };

				},

                preGameAdvertDisplayTime: function() {
                    return iwinGameServicesUtil.advertSkipCountdown;
                }
			};
		}])
		.factory('iWinChatService', ['$log', function ($log) {
			return {

				init: function (params) {
					iwinChatServices.init(params);
				},

				logout: function () {
					try {
						iwinChatServices.logout({});
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

				sendMessage: function (message) {
					try {
						iwinChatServices.broadcastFromUser({ message: message });
					}
					catch (consumed) {
						$log.error(consumed);
					}
				},

				connect: function () {
					iwinChatServices.connect();
				},

				onOpen: function (success) {
					iwinChatServices.registerOnOpenCallback(function () {
						success();
					});
				},
				onLogout: function (success) {
					iwinChatServices.registerOnLogOutCallback(function () {
						success();
					});
				},
				onOtherUserJoined: function (success) {
					iwinChatServices.registerOnOtherUserJoinedCallback(function (jsonObject) {
						success(jsonObject);
					});
				},
				onOtherUserLeft: function (success) {
					iwinChatServices.registerOnOtherUserLeftCallback(function (jsonObject) {
						success(jsonObject);
					});
				},
				onRoomJoin: function (success) {
					iwinChatServices.registerOnMyJoinedRoomCallback(function (jsonObject) {
						iwinChatServices.rooms({});
						success(jsonObject);
					});
				},
				onOtherUserMessage: function (success) {
					iwinChatServices.registerOnOtherUsersMessageCallback(function (jsonObject) {
						success(jsonObject);
					});
					iwinChatServices.registerOnOtherUsersGameMessageCallback(function (jsonObject) {
						success(jsonObject);
					});
				},
				onMyMessage: function (success) {
					iwinChatServices.registerOnMyMessageCallback(function (jsonObject) {
						success(jsonObject);
					});
					iwinChatServices.registerOnMyGameMessageCallback(function (jsonObject) {
						success(jsonObject);
					});
				},
				onRoomsPopulated: function (success) {
					iwinChatServices.registerOnRoomsCallback(function (roomsArrayObject) {
						success(roomsArrayObject);
					});
				},
				onUserReported: function (success) {
					iwinChatServices.registerOnUserReportedCallback(function (jsonObject) {
						success(jsonObject);
					});
				},
                onChatNotWorkingFunction: function (success) {
                    iwinChatServices.registerOnChatNotWorkingCallback(function () {
                        success();
                    });
                },
				switchRoom: function (room) {
					iwinChatServices.changeRoom(room.roomId);
				},
				blockUser: function (userid) {
					iwinChatServices.blockUser(userid);
				},
				hasBlockedUser: function (userId) {
					return iwinChatServices.hasBlockedUser(userId);
				},
				allowUser: function (userid) {
					iwinChatServices.allowUser(userid);
				},
				reportUser: function (userid) {
					iwinChatServices.reportUser(userid);
				},
				getRooms: function () {
					iwinChatServices.rooms({});
				}
			};
		}]);
});

define([], function () {
	return ['$scope', '$routeParams', '$log', 'config', 'xdmService', 'iWinService', 'iWinChatService', '$http',
		function ($scope, $routeParams, $log, Config, xdmService, iWinService, iWinChatService, $http) {
			var gameURL = ($routeParams.game) ? $routeParams.game + '/' : Config.gameUrl;

			var gameName = '';
			var gameCode = '';
			var gameDetailsPromise = $http({method: 'GET', url: gameURL + 'game_details.json'});
			var interstitialAdBehavior = {};
			var attemptNumber = -1;
			var advertStarted = false;

			/* Visual variables */
			$scope.isIpadSafari = function () {
				var userAgent = window.navigator.userAgent.toLowerCase(),
					safari = /safari/.test(userAgent),
					chrome = /crios/.test(userAgent),
					ios = /iphone|ipod|ipad/.test(userAgent);
				return safari && ios && !chrome;
			};

			$scope.chatVisible = false;
			$scope.notification = {
				count: 0
			};

			$scope.toggleChat = function () {
				$scope.chatVisible = !$scope.chatVisible;
				if ($scope.chatVisible) {
					$scope.notification = {
						count: 0
					};
				}
			};

			/* Game Controller functions */
			$scope.refreshUser = function () {
				$scope.currentUser = iWinService.getCurrentUser();
				var progress = $scope.currentUser.progress();
				$scope.user = {
					name: $scope.currentUser.name,
					avatar: $scope.currentUser.photo_url,
					level: progress.level,
					progress: progress.percentInLevel,
					highScore: $scope.currentUser.lifetime_points,
					xpNeeded: progress.pointsLeft
				};
			};

			$scope.appendGameDataToUser = function () {
				var data = {};
				/*var dataStr = iwinGameServices.gameDataFromGameLevelData(
				 iwinGameServices.game.getGameDataForLevel({
				 //TODO:jewelquest is hard-coded cause we can't be sure that at this point we will have game_details loaded
				 level: iwinGameServices.user.currentUser().game_mappings[$scope.game.code].current_level
				 })
				 ).data;
				 data = ( (dataStr && dataStr != '') ? JSON.parse(dataStr) : {} );*/
				var dataStr = iwinGameServices.game.getGameData();
				data = ( (dataStr && dataStr != '') ? JSON.parse(dataStr) : {} );
				$scope.user.data = data;
			};

			$scope.startGame = function () {
				if ($scope.gameReadyWaitingRequest) {
					$scope.appendGameDataToUser();
					$scope.gameReadyWaitingRequest.result({
						user: $scope.user
					});
					$scope.gameReadyWaitingRequest = null;
				} else if ($scope.gameStarted) {
					$scope.appendGameDataToUser();
					$scope.restartGame();
				}
			};

			$scope.refreshUser();

			if (iWinService.hasSession()) {
				$scope.refreshUser();
			} else {
				$scope.user = null;
			}

			$scope.gameReadyWaitingRequest = null;
			$scope.gameStarted = false;

			$scope.restartGame = function () {
				xdmService.sendCommand(Config.gameIframe, 'restart.game', {user: $scope.user}, "request");
			};

			$scope.login = function (initial) {
				iWinService.login(initial, function () {
					$scope.$apply(function () {
						$scope.refreshUser();
						$scope.initChat();
						$scope.startGame();
						$scope.waitingToLogin = false;
					});
				}, function () {
					$scope.login(false);
					//refresh user to initialize annonimous
					$scope.refreshUser();
					$scope.waitingToLogin = false;
					$scope.startGame();
				});
			};

			$scope.waitingToLogin = true;
			$scope.login(true);

			//sometimes , initial login calls does not calling neither of success/error callbacks
			//TODO: remove this trick after fixing login callback issue
			//start the game after 3 seconds , if login response does not received
			setTimeout(function () {
				if ($scope.waitingToLogin) {
					$scope.waitingToLogin = false;
					$scope.refreshUser();
					$scope.startGame();
				}
			}, 3000);

            $scope.hasBlocked = function (id) {
				return iWinChatService.hasBlockedUser(id);
			};

			$scope.viewProfile = function (userID) {
				if (userID === $scope.currentUser.id) {
					$scope.progressBarVisible = true;
					$scope.buttonContainerVisible = false;
					$scope.userIdDataValue = 'me';
					iWinService.showProfile({userid: 'me'}, false, $scope);
				} else {
					$scope.progressBarVisible = false;
					$scope.buttonContainerVisible = true;
					$scope.userIdDataValue = userID;
					iWinService.showProfile({userid: userID}, iWinChatService.hasBlockedUser(userID), $scope);
				}
			};

			$scope.showAd = function (force, level, onClose) {
				var showAd = false;
				onClose = ( onClose && typeof onClose === 'function' ) ? onClose : function () {
				};
				if (force) {
					showAd = true;
				} else {
					switch (interstitialAdBehavior.type) {
						case 'every_attempt':
							attemptNumber++;
							if (advertStarted) {
								if (attemptNumber === interstitialAdBehavior.between) {
									showAd = true;
									attemptNumber = -1;
								}
							} else {
								if (attemptNumber === interstitialAdBehavior.start) {
									showAd = true;
									advertStarted = true;
									attemptNumber = -1;
								}
							}
							break;
						case 'every_level':
							showAd = level - interstitialAdBehavior.start < 0 ? false : (level - interstitialAdBehavior.start) % ( interstitialAdBehavior.between + 1) === 0;
							break;
						case 'specific_levels':
							for (var i = 0; i < interstitialAdBehavior.levels.length; i++) {
								if (interstitialAdBehavior.levels[i] === level) {
									showAd = true;
									break;
								}
							}
							break;
						case 'none':
							showAd = false;
							break;
					}
				}
				if (showAd) {
					$scope.adStarted = new Date().getTime();
					$scope.adProgressInterval = window.setInterval(function () {
						var timeAdShown = new Date().getTime() - $scope.adStarted;
						var preGameAdvertDisplayTime = iWinService.preGameAdvertDisplayTime();
						var multiplier = Math.min(1, timeAdShown / preGameAdvertDisplayTime);
						if (multiplier < 1) {
							$scope.$apply(function () {
								$scope.loadingProgressStyle = {width: (100 * $scope.loadingProgress * multiplier) + '%'};
							});
						} else {
							window.clearInterval($scope.adProgressInterval);
						}
					}, 25);
					iWinService.showAd($scope.game.code, force, onClose);
				} else {
					onClose();
				}
			};

			$scope.logout = function () {
				iWinService.logout(function (data) {
					$scope.refreshUser();
					if ($scope.gameStarted && data.type == 'iwin') {
						$scope.appendGameDataToUser();
						$scope.restartGame();
					}
				}, function () {
				});
				iWinChatService.logout();
				// Prepare the state for callbacks from facebook/google+
				$scope.login(false);
			};

			$scope.showGame = function () {
				$scope.loadingProgress = 0;
				gameDetailsPromise.success(function (game_details) {
					gameName = game_details.name;
					gameCode = game_details.code;
					interstitialAdBehavior = game_details.advertBehavior;
					xdmService.openSocket(Config.gameIframe, {
							url: gameURL + "/",
							props: {
								class: Config.gameContainerClass,
								scrolling: 'no'
							},
							onMessage: $.proxy(function (request) {
								var data = request.data;
								switch (request.command) {
									case 'game:ready':
										iWinService.init(gameCode);
										$scope.game = {
											name: gameName,
											code: gameCode
										};
										$scope.showAd(true, null, function () {
											$scope.gameStarted = true;
											if ($scope.user == null) {
												//waiting user's login response
												$scope.gameReadyWaitingRequest = request;
											} else {
												$scope.appendGameDataToUser();
												request.result({
													user: $scope.user
												});
											}
										});

										break;
									case 'game:load:progress':
										$scope.$apply(function () {
											$scope.loadingProgress = data.progress;
											var timeAdShown = new Date().getTime() - $scope.adStarted;
											var preGameAdvertDisplayTime = iWinService.preGameAdvertDisplayTime();
											var multiplier = Math.min(1, timeAdShown / preGameAdvertDisplayTime);
											$scope.loadingProgressStyle = {width: (100 * $scope.loadingProgress * multiplier) + '%'};
										});
										break;
									case 'game:load:complete':
										iWinService.handleGameLoaded();
										$scope.$apply(function () {
											$scope.loadingCompleted = true;
										});
										request.result();
										break;
									case 'game:level:get':
										iWinService.handleGetLevelData(data.level, function (gameData) {
                                            request.result(gameData);
										});
										break;
									case 'game:level:set':
										iWinService.handleSetLevelData({
											score: data.score,
											level: data.level,
											time: data.time,
											won: data.won,
											data: JSON.stringify(data.data)
										});
                                        $scope.refreshUser();
                                        $scope.$apply();
                                        request.result();
                                        break;
                                    case 'game:data:set':
                                        iWinService.handleSetGameData({
                                            data: JSON.stringify(data)
                                        });
                                        request.result();
										break;
                                    case 'game:data:get':
                                        var gameData = iWinService.handleGetGameData(data);
                                        request.result(gameData);
                                        break;
                                    case 'advert:show':
                                        $scope.showAd(data.type === 'interstitial', data.level, function() {
                                            request.result();
                                        });
                                        break;
                                    case 'game:highscore:post':
                                        iWinService.handlePostHighScore(data);
                                        request.result();
                                        break;
									default:
										//$log.log(request);
										request.result();
								}
							}, this),
                            onReady: $.proxy(function(){
                                var chatInput = $('#chatinput')[0];
                                var keydownFunction = function(event) {
                                    if (event.target !== chatInput) {
                                        xdmService.sendCommand(Config.gameIframe, 'event', {
                                            type: 'keydown',
                                            event: {
                                                which: event.which,
                                                keyCode: event.keyCode
                                            }
                                        }, 'request');
                                    }
                                };
                                $('#iconsole-plugin-session_iframe__').contents().on('keydown', keydownFunction);
                                $(document).on('keydown', keydownFunction);
                            })
						}
					);
				});
			};

			$scope.showGame();

			/* Chat Controller Functions */
			$scope.initChat = function () {
				$scope.currentUser = iWinService.getCurrentUser();
				$scope.messages = [];
				$scope.users = [];
				$scope.rooms = [];
				var chatInit = function (access_token) {
					iWinChatService.init({
						oauthToken: access_token,
						uid: $scope.currentUser.id || 'Current User ID',
						identity: $scope.currentUser.email || 'email@email.com',
						nickname: $scope.currentUser.name || 'Nickname',
						avatar: $scope.currentUser.photo_url || 'Some/url',
						game: $scope.game ? $scope.game.code || gameCode : gameCode
					});

					iWinChatService.onRoomJoin(function (jsonObject) {
						$scope.$apply(function () {
							$scope.room = jsonObject.room;
							$scope.users = jsonObject.room.users;
						});
					});

					var stylizeMessages = function () {
						for (var i = 0; i < $scope.messages.length; i++) {
							if (i == 0) {
								$scope.messages[i].listPlace = 'opener'
							} else if (i == $scope.messages.length) {
								$scope.messages[i].listPlace = 'closer'
							} else {
								if ($scope.messages[i].uid != $scope.messages[i - 1].uid) {
									$scope.messages[i].listPlace = 'opener'
								} else {
									$scope.messages[i].listPlace = 'middle'
								}
							}
						}
					};

					iWinChatService.onOtherUserMessage(function (jsonObject) {
						$scope.$apply(function () {
							$scope.messages.push({
								avatar: jsonObject.user.avatar,
								current: false,
								sender: jsonObject.user.nickname,
								uid: jsonObject.user.uid,
								text: jsonObject.content,
								type: 'message'
							});
							stylizeMessages();
							if (!$scope.chatVisible) {
								$scope.notification = {
									count: $scope.notification.count + 1
								};
							} else {
								$scope.notification = {
									count: 0
								};
							}
						});
					});

					iWinChatService.onMyMessage(function (jsonObject) {
						$scope.$apply(function () {
							$scope.messages.push({
								avatar: jsonObject.user.avatar,
								current: true,
								sender: jsonObject.user.nickname,
								uid: jsonObject.user.uid,
								text: jsonObject.content,
								type: 'message'
							});
							stylizeMessages();
						});
					});

					iWinChatService.onRoomsPopulated(function (roomsArrayObject) {
						$scope.$apply(function () {
							$scope.rooms = roomsArrayObject;
						});
					});

					iWinChatService.onOtherUserJoined(function (jsonObject) {
						$scope.$apply(function () {
							$.each($scope.users, function (index, result) {
								if (result) {
									if (result.uid == jsonObject.user.uid) {
										$scope.users.splice(index, 1);
									}
								}
							});
							$scope.users.push(jsonObject.user);
						});
					});

					iWinChatService.onOtherUserLeft(function (jsonObject) {
						$scope.$apply(function () {
							$.each($scope.users, function (index, result) {
								if (result) {
									if (result.uid == jsonObject.user.uid) {
										$scope.users.splice(index, 1);
									}
								}
							});
						});
					});

					iWinChatService.onUserReported(function (jsonObject) {
						$scope.$apply(function () {
							$scope.messages.push({
								avatar: '',
								current: false,
								sender: '',
								text: 'User has been reported.',
								type: 'user-reported'
							});
						});
					});

                    iWinChatService.onChatNotWorkingFunction(function () {
                        iwinGameServices.oauth.access_token(chatInit, function () {
                            chatInit('no_token');
                        })
                    });

					iWinChatService.connect();
				};
				iwinGameServices.oauth.access_token(chatInit, function () {
					chatInit('no_token');
				})
			};

			$scope.sendMessage = function () {
				if ($scope.message != '' && $scope.message != null) {
					iWinService.sendChatMessage($scope.message, function () {
					}, function () {
					});
					iWinChatService.sendMessage($scope.message);
					$scope.message = '';
				}
			};

			$scope.switchRoom = function (room) {
				iWinChatService.switchRoom(room);
				iWinChatService.getRooms();
			};

			$scope.blockUser = function (userid) {
				iWinChatService.blockUser(userid);
			};

			$scope.allowUser = function (userid) {
				iWinChatService.allowUser(userid);
			};

			$scope.reportUser = function (userid) {
				iWinChatService.reportUser(userid);
			};
		}];
});
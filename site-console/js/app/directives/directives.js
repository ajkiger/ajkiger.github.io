define(['angular'], function (angular) {
	angular.module('iWinConsoleApp.directives', [])
		.directive('horizontalSplitter', ['$document', function ($document) {
			var isTouchDevice = !!('ontouchstart' in window);
			return {
				restrict: 'E',
				link: function (scope, element, attrs) {
					var startY = 0, y = element.parent().height() / 2;
					element.css({
						position: 'absolute',
						cursor: 'pointer',
						top: element.parent().height() / 2 + 'px',
						'z-index': 500
					});
					resizeSiblings();
					element.on('mousedown', function (event) {
						event.preventDefault();
						startY = event.screenY - y;
						$document.on('mousemove', mousemove);
						$document.on('mouseup', mouseup);
					});

					function mousemove(event) {
						if (event.screenY - startY <= 0) {
							y = 0
						} else if (event.screenY - startY >= element.parent().height() - element.height()) {
							y = element.parent().height() - element.height()
						} else {
							y = event.screenY - startY
						}
						element.css({
							top: y + 'px'
						});
						resizeSiblings();
						scope.$emit('splitter-dragged', y, y + element.height(), y, element.parent().height() - (y + element.height()));
					}

					function mouseup() {
						$document.unbind('mousemove', mousemove);
						$document.unbind('mouseup', mouseup);
					}

					function resizeSiblings() {
						element.siblings().first().height(y);
						element.siblings().last().height(element.parent().height() - (y + element.height()));
					}

					if (isTouchDevice) {
						element.bind('touchstart', function (event) {
							event.preventDefault();
							startY = event.originalEvent.touches[0].screenY - y;
						});

						element.bind('touchmove', function (event) {
							if (event.originalEvent.touches[0].screenY - startY <= 0) {
								y = 0
							} else if (event.originalEvent.touches[0].screenY - startY >= element.parent().height() - element.height()) {
								y = element.parent().height() - element.height()
							} else {
								y = event.originalEvent.touches[0].screenY - startY
							}
							element.css({
								top: y + 'px'
							});
							resizeSiblings();
							scope.$emit('splitter-dragged', y, y + element.height(), y, element.parent().height() - (y + element.height()));
						});
						element.bind('touchend', function (e) {
							e.preventDefault();
						});
					}
				}
			}
		}])
		.directive('fadeOutUp', [function () {
			return {
				link: function (scope, element, attrs) {
					$(element).parent().parent().append('<h6 class="change-indicator hidden"></h6>');
					var changeElm = $(element).parent().siblings('h6');
					scope.$watch(attrs.watch, function (newValue, oldValue) {
						if (oldValue - newValue > 0) {
							changeElm.html('+' + (oldValue - newValue));
							changeElm.addClass('fadeOutUp').addClass('animated').removeClass('hidden');
							changeElm.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
								changeElm.removeClass('fadeOutUp').removeClass('animated').addClass('hidden');
							});
						}
					});
				}
			}
		}])
		.directive('modalShow', [function () {
			return {
				restrict: "A",
				scope: {
					modalVisible: "="
				},
				link: function (scope, element, attrs) {

					//Hide or show the modal
					scope.showModal = function (visible) {
						if (visible) {
							element.modal("show");
						}
						else {
							element.modal("hide");
						}
					};

					//Check to see if the modal-visible attribute exists
					if (!attrs.modalVisible) {

						//The attribute isn't defined, show the modal by default
						scope.showModal(true);

					}
					else {
						//Watch for changes to the modal-visible attribute
						scope.$watch("modalVisible", function (newValue, oldValue) {
							scope.showModal(newValue);
						});

						//Update the visible value when the dialog is closed through UI actions (Ok, cancel, etc.)
						element.bind("hide.bs.modal", function () {
							scope.modalVisible = false;
							if (!scope.$$phase && !scope.$root.$$phase)
								scope.$apply();
						});

					}

				}
			};
		}])
		.directive('autoScrollDown', ['$timeout', function ($timeout) {
			return {
				link: function (scope, element, attrs) {
					scope.$watch(attrs.watch + '.length', function () {
						$timeout(function () {
							var listItems = element.find('li');

							try {
								element.scrollTop(listItems.last().position().top * listItems.length + element.find('li').last().height());
							} catch (e) {

							}
						}, 0);
					});
				}
			}
		}])
		.directive('inputBlur', [function () {
			return {
				link: function (scope, element, attrs) {
					element.bind('submit', function () {
						$(element.children().children()[0]).blur();
						document.activeElement.blur();
						$("input").blur();
					})
				}
			};
		}])
		.directive('scrollToTop', ['$timeout', function ($timeout) {
			return {
				link: function (scope, element, attrs) {
					$timeout(function () {
						window.scrollTo(0, 1);
						window.scrollTo(0, 0);
					}, 1000);
				}
			};
		}]);
});

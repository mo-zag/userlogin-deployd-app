angular.module('slick-angular-validation')
.directive 'validate', ($compile, $injector, validateAttributeHelper, messageContainerFactory) ->
  unwatchers = []

  addWatcher = (watcher) ->
    if angular.isArray(watcher)
      for w in watcher
        unwatchers.push(w)
    else if angular.isDefined(watcher)
      unwatchers.push(watcher)

  validateCtrlNames = (formCtrl, modelCtrl) ->
    unless modelCtrl.$name then throw 'missing attribute \'name\''
    unless formCtrl.$name then throw 'missing attribute \'name\' on parent form element'


  bindValidatorsAndCreateMessageContainer = (scope, element, formCtrl, modelCtrl, attrs) ->
    messageContainerElement = messageContainerFactory.beginContainer(formCtrl.$name, modelCtrl.$name)
    arr = validateAttributeHelper.toObject(attrs)

    for item in arr
      watcher = $injector.get(item.key).link(scope, modelCtrl, item.value)
      addWatcher(watcher)

      messageContainerElement += messageContainerFactory.createMessageFromItem(item)

    messageContainerElement += messageContainerFactory.endContainer()
    element.after($compile(messageContainerElement)(scope))

  {
    restrict: 'A',
    require: ['ngModel', '^form'],
    link: (scope, element, attrs, ctrls) ->
      modelCtrl = ctrls[0]
      formCtrl = ctrls[1]

      validateCtrlNames(formCtrl, modelCtrl)

      bindValidatorsAndCreateMessageContainer(scope, element, formCtrl, modelCtrl, attrs)
      element.removeAttr('validate')

      scope.$on '$destroy', () ->
        for unwatch in unwatchers
          unwatch()
  }
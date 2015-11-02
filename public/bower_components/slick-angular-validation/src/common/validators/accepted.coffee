angular.module('slick-angular-validation')
.factory 'accepted', () ->
  {
    link: (scope, ctrl) ->
      ctrl.$validators.accepted = (modelValue, viewValue) ->
        viewVal = viewValue.toString().toLowerCase();
        return viewVal is 'true' or viewVal is '1'

      return
  }
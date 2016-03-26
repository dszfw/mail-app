var module = angular.module('mailApp.commonServices', []);

module.service('ViewService', function() {
  this.isActiveClass = (view, component) => {
    if (view == component.activeView) return 'active';
  };
  this.switchTo = (newView, component) => component.activeView = newView;
});

module.service('FormService', function() {
  this.touchAllFields = (form) => {
    var err = form.$error;
    Object.keys(err).forEach((key) => {
      err[key].forEach((el) => el.$setTouched());
    });
  };
});

module.service('FirebaseService', function() {
  this.normalize = function(obj) {
    if (!obj) return;
    return Object.keys(obj).map(key => {
      obj[key].id = key;
      return obj[key];
    });
  };
});
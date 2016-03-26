var module = angular.module('mailApp.emailService', []);

module.service('EmailService', function($http, FirebaseService) {
  this.getAllInbox = () => {
    return $http.get(this._url + '/inbox.json')
      .then(result => FirebaseService.normalize(result.data));
  };
  this.getAllSent = () => {
    return $http.get(this._url + '/sent.json')
      .then(result => FirebaseService.normalize(result.data));
  };
  this.send = (mail) => {
    return $http.post(this._url + '/sent.json', mail)
      .then(result => result.data)
      .then(data => {
        if (mail.to === this.from) {
          $http.post(this._url + '/inbox.json', mail);
        }
        return data;
      });
  };
  this.deleteSent = mailId => {
    return $http.delete(this._url + '/sent/' + mailId + '.json')
      .then(result => result.data);
  };
  this.deleteInbox = mailId => {
    return $http.delete(this._url + '/inbox/' + mailId + '.json')
      .then(result => result.data);
  };
});
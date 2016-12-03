'use strict';

/**
 * @ngdoc service
 * @name stugrApp.NoteModel
 * @description
 * # NoteModel
 * Factory in the stugrApp.
 */
angular.module('stugrApp')
  .factory('NoteModel', ['$rootScope', '$q', 'USER_ROLES', 'GroupModel', function ($rootScope, $q, USER_ROLES, GroupModel) {
    // Service logic
    // ...

    var ParseNote = Parse.Object.extend("Nota");

    // Properties
    ParseNote.prototype.__defineGetter__("autor", function() {
      return this.get("autor");
    });
    ParseNote.prototype.__defineSetter__("autor", function(aValue) {
      return this.set("autor", aValue);
    });

    ParseNote.prototype.__defineGetter__("missatge", function() {
      return this.get("missatge");
    });
    ParseNote.prototype.__defineSetter__("missatge", function(aValue) {
      return this.set("missatge", aValue);
    });

    ParseNote.prototype.__defineGetter__("grup", function() {
      return this.get("grup");
    });
    ParseNote.prototype.__defineSetter__("grup", function(aValue) {
      return this.set("grup", aValue);
    });
    ParseNote.prototype.__defineGetter__("titol", function() {
      return this.get("titol");
    });
    ParseNote.prototype.__defineSetter__("titol", function(aValue) {
      return this.set("titol", aValue);
    });



    var noteModel = {};

    // Public API here

    noteModel.getNotesForGroup = function(groupId) {
      var query = new Parse.Query(ParseNote);
      var deferred = $q.defer();

      var Group = Parse.Object.extend("Grup");
      var group = new Group();
      group.id = groupId;

      query.equalTo("grup", group);
      query.include("autor");
      console.log("In hiar");
      query.find({
        success: function(results) {
          console.log(results.length);
          deferred.resolve(results);
        },
        error: function(aError) {
          console.log("theres been an error: ", aError);
          deferred.reject(aError);
        }
      });

      return deferred.promise;
    };

    noteModel.createNote = function(titol, missatge, groupId) {
      var note = new ParseNote();
      note.set("titol", titol);
      note.set("missatge", missatge);

      var Group = Parse.Object.extend("Grup");
      var groupPosted = new Group();
      groupPosted.id = groupId;
      note.set("grup", groupPosted);

      note.set("autor", $rootScope.currentUser);

      var deferred = $q.defer();
      note.save(null, {
        success: function(Note) {
          console.log("Saved");
          deferred.resolve(Note);
        },
        error: function(Note, error) {
          console.log("There's been an error saving note: ", error);
          deferred.reject(error);
        }
      });

      return deferred.promise;

    };

    noteModel.getMyNotes = function() {
      var deferred = $q.defer();

      GroupModel.getGroups().then(function(results) {
        var query = new Parse.Query(ParseNote);
        

        query.containedIn("grup", results);

        query.include("autor");
        query.include("grup");

        //Excloem les que hem escrit
        query.notEqualTo("autor", $rootScope.currentUser);

        query.limit(10);

        query.ascending("createdAt");

        query.find({
          success: function(results) {
            deferred.resolve(results);
          },
          error: function(aError) {
            deferred.reject(aError);
          }
        });
      },
      function(error) {
        console.log("Error hiar: ", error);
      });
      return deferred.promise;
    };

    return noteModel;

    }]);

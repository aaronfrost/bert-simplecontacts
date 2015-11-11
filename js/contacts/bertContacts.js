angular.module('app').directive('bertContacts', function(){

  return {
    templateUrl: "js/contacts/bertContacts.html",
    link: function(scope, elem, attrs){
      //Add Scope Functions
      scope.addPerson = addPerson;

      //Init Scope Variables
      loadPeople();

      function addPerson(){
        pushPerson(scope.newUser.name, scope.newUser.age, scope.newUser.email);
        scope.newUser.name = scope.newUser.age = scope.newUser.email = undefined;
      }

      function pushPerson(name, age, email){
        scope.people = scope.people || [];
        scope.people.push({
          name: name,
          age: age,
          email: email
        });
        savePeople();
      }

      function savePeople(){
        var tempPeople = JSON.parse(JSON.stringify(scope.people));
        tempPeople.forEach(function(person){
          delete person.$$hashkey;
        });
        localStorage.people = JSON.stringify(tempPeople);
      }

      function loadPeople(){
        var people = localStorage.people || '[]';
        scope.people = JSON.parse(people);
      }
    }
  };

})
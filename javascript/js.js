var users;
var userIndex;

var newUser = true;

var selectedUser;
console.log('Start of js file.');
if (localStorage.getItem('users') === null) {
  console.log('localStorage.users is empty: ' + JSON.stringify(localStorage));
  users = [];
} else {
  users = JSON.parse(localStorage.getItem('users'));
  console.log('localStorage.users is not empty:' + JSON.stringify(localStorage));
}

if (localStorage.getItem('userIndex') === null) {
  localStorage.setItem('userIndex', -1);
  console.log('localStorage.userIndex is empty, setting to -1: ' + JSON.stringify(localStorage));
}

userIndex = localStorage.getItem('userIndex');


function userLogin() {
  var email = document.getElementById('loginEmail').value;
  var pass = document.getElementById('loginPass').value;

  var allUsers = JSON.parse(localStorage.getItem('users'));
  console.log('All users: ' + JSON.stringify(allUsers));

  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email && allUsers[i].password === pass) {
      localStorage.setItem('userIndex', i);
      userIndex = localStorage.getItem('userIndex');
      // alert('The selected user is at index = ' + i + ': ' + JSON.stringify(users[userIndex]));
      window.location.href = './dashboard.html';
      return;
    }
  }
  alert('Invalid login! Try again..');
}

// alert('users: ' + JSON.stringify(users));

function getName() {

  var first = document.getElementById('userFirstName').value;
  var last = document.getElementById('userLastName').value;
  var fullName = first + " " + last;
  var person = {
    "name": fullName,
    "email": "",
    "password": "",
    "gender": "",
    "birthday": "",
    "profilePic": "",
    "conditions": []
  };

  console.log(JSON.stringify(person));
  // alert('pushing: ' + JSON.stringify(person));
  // alert('users: ' + JSON.stringify(users));
  users.push(person);
  localStorage.setItem('users', JSON.stringify(users));
  console.log('localStorage: ' + JSON.stringify(localStorage));

  // If new user
  localStorage.setItem('userIndex', users.length - 1);
  userIndex = localStorage.getItem('userIndex');
  // alert('New user! Selected user is at users.length - 1: ' + JSON.stringify(users[userIndex]));
  window.location.href = './join_email.html';
}

function getEmail() {
  var email = document.getElementById('userEmail').value;
  // alert(email);
  console.log('the user', users[userIndex]);
  users[userIndex].email = email;
  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = './join_password.html';
}

function getPassword() {
  var password = document.getElementById('userPass').value;
  var confirm = document.getElementById('userPass2').value;
  // alert('password: ' + password);
  if (password === confirm) {
    console.log('the user', users[userIndex]);
    users[userIndex].password = password;
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = './join_gender.html';
  } else {
    alert("Passwords did not match!");
  }
}

function getGender() {
  var gender = document.getElementById('gender').value;
  // alert(gender);
  console.log('the user', users[userIndex]);
  users[userIndex].gender = gender;
  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = './join_birth.html';
}

function getBirth() {
  var month = document.getElementById('month').value;
  var day = document.getElementById('day').value;
  var year = document.getElementById('year').value;
  var birthdate = month + "/" + day + "/" + year;
  // alert(birthdate);

  console.log('the user', users[userIndex]);
  users[userIndex].birthday = birthdate;
  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = './select_conditions.html';
}

function getConditions() {
  var selectedCondition = $('#select2-conditions').val() + '';

  if (selectedCondition && (selectedCondition.length !== 0)) {
    var conditions = users[userIndex].conditions;

    if (conditions === null || conditions.length === 0) {
      users[userIndex].conditions = selectedCondition.split(",");
      localStorage.setItem('users', JSON.stringify(users));
    }
    else {
      selectedCondition.split(",").forEach(function(condition) {
        if ($.inArray(condition, conditions) === -1)
          conditions.push(condition);
      });
      users[userIndex].conditions = conditions;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
  window.location.href = './dashboard.html';
}

function renderConditions() {
  console.log('renderConditions()');
  console.log('userIndex: ' + userIndex);
  console.log('users[userIndex]: ' + JSON.stringify(users[userIndex]));

  if (users && users[userIndex]) {
    var conditions = users[userIndex].conditions;

    if (conditions) {
      for (var i = 0; i < conditions.length; i++) {
        console.log(conditions[i]);
        var $div = $('<div/>', {
          class: 'card text-center',
          id: (conditions[i] + '').replace(/ /g, '-'),
          rel: 'external',

        }).html('<div class="card text-center"><div class="card-body"><h4 class="card-title">' + conditions[i] + '</h4></div></div>');
        $($div).insertBefore($('#add'));
      }
    }
  }


  $('#overview').click(function(){
    window.location.href = './overview.html';
  });

  $('#add').click(function(){
    console.log('???');
    window.location.href = './conditions.html';
  });

  $('#Anemia').click(function(){
    window.location.href = './anemia.html';
  });

  $('#Arthritis').click(function(){
    window.location.href = './arthritis.html';
  });

  $('#Back-Pain').click(function(){
    window.location.href = './backpain.html';
  });

  $('#High-Blood-Pressure').click(function(){
    window.location.href = './highbp.html';
  });

  $('#High-Cholesterol').click(function(){
    window.location.href = './cholesterol.html';
  });

  $('#Dementia').click(function(){
    window.location.href = './dementia.html';
  });

  $('#Diabetes').click(function(){
    window.location.href = './diabetes.html';
  });

  $('#Fatigue').click(function(){
    window.location.href = './fatigue.html';
  });

  $('#Ulcers').click(function(){
    window.location.href = './ulcers.html';
  });
}

function displayProfile() {
  console.log(localStorage);
  console.log(users[userIndex].name);
  console.log(users[userIndex].bday);

  document.getElementById('name').innerHTML = 'Name: ' + users[userIndex].name;
  document.getElementById('bday').innerHTML = 'Birthday: ' + users[userIndex].bday;
  document.getElementById('gender').innerHTML = 'Gender: ' + users[userIndex].gender;
  document.getElementById('email').innerHTML = 'Email: ' + users[userIndex].email;

  var myConditions = users[userIndex].conditions;

  for (var i = 0; i < myConditions.length; i++) {
    $("<li />").html(myConditions[i]).appendTo($('#my-conditions'));
  }
}

function renderEditProfile() {
  // if (users[userIndex].name.value) {
  console.log(users[userIndex].name);

  if (users[userIndex].name) {
    document.getElementById('name-input').value = users[userIndex].name;
  }

  if (users[userIndex].bday) {
    document.getElementById('bday-input').value = users[userIndex].bday;
  }

  if (users[userIndex].gender) {
    if (users[userIndex].gender)
    document.getElementById('gender-input').value = users[userIndex].gender;
  }

  if (users[userIndex].email) {
    document.getElementById('email-input').value = users[userIndex].email;
  }  

}

function saveEditProfile() {
  users[userIndex].name = localStorage.getItem('name');
  users[userIndex].bday = localStorage.getItem('birthday');
  users[userIndex].gender = localStorage.getItem('gender');
  users[userIndex].email = localStorage.getItem('email');

  // alert('saveEditProfile().users[userIndex]: ' + JSON.stringify(users[userIndex]));
  localStorage.setItem('users', JSON.stringify(users));

}

function displayConditionsOnEdit() {
  var myConditions = users[userIndex].conditions;
  console.log(myConditions);

  for (var i = 0; i < myConditions.length; i++) {
    $("<li />").html(myConditions[i]).appendTo($('#edit-profile-conditions-list'));
  }
}

function editConditions() {
  console.log('hello');
  // $('.select2-multiple').select2();
  $('#select2-edit-conditions').select2();

  if (users && users[userIndex]) {
    var conditions = users[userIndex].conditions;
    if (conditions) {
      console.log(conditions);
      $('#select2-edit-conditions').val(conditions);
      $('#select2-edit-conditions').trigger('change');
    }
  }
}

function saveEditConditions() {
  var editConditions = $('#select2-edit-conditions').val() + '';

  var conditions = [];
  if (editConditions) {
    editConditions.split(",").forEach(function(condition) {
      conditions.push(condition);
    });
  }
  users[userIndex].conditions = conditions;
  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = './dashboard.html';

}
$('#profButton').click(function(){
  window.location.href = './profile.html';
});

$('#dashButton').click(function(){
  window.location.href = './dashboard.html';
});

$('#dashButton_prof').click(function(){
  window.location.href = './dashboard.html';
});

$('#back-join').click(function(){
  window.history.back();
});

$('#back').click(function(){
  window.history.back();
});

$('#setting').click(function(){
  window.location.href = './settings.html';
});

$('#help').click(function(){
  window.location.href = './help.html';
});

$('.fa-sign-out').click(function() {
  $('#myModal').modal('show')
});

$('#modal-logout').click(function() {
  window.location.href = './index.html';
});

$('#modal-cancel').click(function() {
  $('#myModal').modal('hide');
});




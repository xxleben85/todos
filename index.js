$(document).ready(function() {

  var getAndDisplayAllTasks = function() {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=68',
      datatype:  'json',
      success: function(response, textStatus) {
        response.tasks.forEach(function(task) {
          $('#to-do').append('<p>' + task.content + '</p>');
        })
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var createTask = function() {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=68',
      contentType: 'application/json',
      datatype: 'json',
      data:  JSON.stringify({
        task:  {
          content:  $('#new-task-content').val()
        }
      }),
      success: function(response, textStatus) {
        console.log(response);
      },
      error: function(request, textStatus, errorMessage) {
        console.log(errorMessage)
      }
    })
  };

  $('#create-task').on('submit', function(e) {
    e.preventDefault();
    createTask();
  });

  getAndDisplayAllTasks();

});

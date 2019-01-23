$(document).ready(function() {

  var getAndDisplayAllTasks = function() {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=68',
      datatype:  'json',
      success: function(response, textStatus) {
        $('#to-do').empty();
        response.tasks.forEach(function(task) {
          $('#to-do').append('<div class="row row-list py-2"><span class="col-xs-9 todo-item">' + task.content + '</span><button class="btn btn-danger remove mx-4" data-id="' + task.id + '">Remove</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.complete? 'Checked' : '') + '></div>');
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
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
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

  var deleteItem = function(id) {
    $.ajax({
      type:  'DELETE',
      url:  'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=68',
      success:  function(response, textStatus) {
        getAndDisplayAllTasks();
      },
      error:  function(request, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    })
  };

$(document).on('click', '.remove', function() {
  deleteItem($(this).data('id'));
})

var markComplete = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=68',
    dataType: 'json',
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
};

$(document).on('change', '.mark-complete', function() {
  if (this.checked) {
    markComplete($(this).data('id'));
  }
})

  getAndDisplayAllTasks();

});

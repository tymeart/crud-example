var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function() {
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Beach Weather',
      'quote': "Don't you know you're just a heartbreaker."
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(data => {
    console.log(data);
    window.location.reload(true);
  });
});

del.addEventListener('click', function() {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'liz'
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(data => {
    console.log(data);
    window.location.reload();
  });
});

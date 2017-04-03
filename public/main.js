var update = document.getElementById('update');

update.addEventListener('click', function() {
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Beach Weather',
      'quote': "Don't you know you're just a heartbreaker."
    })
  });
})

export const createMessage = message => (
  $.ajax({
    method: 'POST',
    url: '/api/messages',
    data: { message }
  })
);

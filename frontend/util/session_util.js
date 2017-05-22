export const signUp = user => (
  $.ajax({
    method: 'POST',
    url: '/users',
    data: { user }
  })
);

export const logIn = user => (
  $.ajax({
    method: 'POST',
    url: '/session',
    data: { user }
  })
);

export const logOut = () => (
  $.ajax({
    method: 'DELETE',
    url: '/session'
  })
);

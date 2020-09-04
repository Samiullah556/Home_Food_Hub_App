const regex = {
  email: /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  name: /^[a-zA-Z\s-]{4,}$/,
  code: /^[0-9]+$/,
  currencyFloat: /^\d+(\.\d+)?$/,
  mobile: /^03[0-9]{9}$/,
};

export const PrimaryColor = '#6C3483';

export const fieldValidate = (text, type) => {
  let result = {
    error: false,
    helperText: '',
  };
  switch (type) {
    case 'mobile':
      if (!regex.mobile.test(text)) {
        result = {
          error: true,
          helperText: 'Incorrect Format. Use 03xxxxxxxx format',
        };
      }
      break;
    case 'email':
      if (!regex.email.test(text)) {
        result = {error: true, helperText: 'Incorrect Email Format.'};
      }
      break;
    case 'password':
      if (text.length < 6 || text === '' || text === null) {
        result = {
          error: true,
          helperText: 'Password must be 6 characters long.',
        };
      }
      break;

    case 'name':
      if (!regex.name.test(text)) {
        result = {
          error: true,
          helperText:
            'Incorrect Format. Can only contain alphabets, - character & atleast 4 characters long.',
        };
      }
      break;

    case 'code':
      if (!regex.code.test(text)) {
        result = {
          error: true,
          helperText: 'Incorrect Format. Can only contain numbers.',
        };
      }
      break;

    case 'currencyFloat':
      if (!regex.currencyFloat.test(text)) {
        result = {
          error: true,
          helperText: 'Incorrect Format. Enter correct value.',
        };
      }
      break;

    default:
      break;
  }
  return result;
};

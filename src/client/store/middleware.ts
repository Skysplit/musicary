import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

export default composeWithDevTools(applyMiddleware(
  thunkMiddleware,
));

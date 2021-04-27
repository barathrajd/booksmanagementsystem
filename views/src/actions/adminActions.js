import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_DETAILS_BY_ID_SUCCESS,
  USER_DETAILS_BY_ID_REQUEST,
  USER_DETAILS_BY_ID_FAIL,
} from '../types';
import { logout } from './userActions';
import axios from 'axios';

// Get All User
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/users/`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    await axios.delete(`/api/admin/user/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

// Update User
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/admin/users/${user._id}`,
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({
      type: USER_DETAILS_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Get User Details
export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_BY_ID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'x-auth-token': `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

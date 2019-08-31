export function updateProfileRequest(data, functions) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data, functions },
  };
}

export function updateProfileSuccess(user) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { user },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

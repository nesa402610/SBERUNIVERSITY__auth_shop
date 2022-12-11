import {createSlice} from "@reduxjs/toolkit";

interface notificationSliceProps {
  message: string | null
  error: string | null
  isActive: boolean
  closeable: boolean
}

const initialState: notificationSliceProps = {
  message: null,
  error: null,
  isActive: false,
  closeable: true
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification__AUTH(state) {
      state.message = 'Требуется авторизация'
      state.isActive = true
      state.closeable = false
    },
    showNotification__SUCCESS(state) {
      state.message = 'Успешно'
      state.isActive = true
      state.closeable = true
    },
    showNotification__ERROR(state, action) {
      state.message = 'Произошла ошибка'
      state.error = action.payload
      state.isActive = true
      state.closeable = true
    },
    showNotification(state, action) {
      state.message = action.payload.message
      state.error = action.payload.error
      state.isActive = true
      state.closeable = true
    },
    hideNotification(state) {
      if (state.closeable) {
        state.message = null
        state.error = null
        state.isActive = false
        state.closeable = true
      }

    },
  },
});

export default notificationSlice.reducer;
export const {
  showNotification,
  hideNotification,
  showNotification__AUTH,
  showNotification__SUCCESS,
  showNotification__ERROR
} = notificationSlice.actions;

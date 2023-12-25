import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import decreeSlice from "../features/decree/decreeSlice";
import questionSlice from "../features/question/questionSlice";
import newSlice from "../features/new/newSlice";
import FineSlice from "../features/fine/fineSlice";
import fineTypeSlice from "../features/fineType/fineTypeSlice";
import signSlice from "../features/sign/signSlice";
import signTypeSlice from "../features/signType/signTypeSlice";

// Define your root reducer
const rootReducer = combineReducers({
  header: headerSlice,
  modal: modalSlice,
  rightDrawer: rightDrawerSlice,
  decree: decreeSlice,
  question: questionSlice,
  new: newSlice,
  fine: FineSlice,
  fineType: fineTypeSlice,
  sign: signSlice,
  signType: signTypeSlice,
});

// Define your persist config
const persistConfig = {
  key: "root",
  version: 1.1,
  storage: storage,
};

// Define your persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define your store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.headers"],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// persistor
//   .purge()
//   .then(() => {
//     console.log("Data reset successful");
//   })
//   .catch(() => {
//     console.log("Data reset failed");
//   });

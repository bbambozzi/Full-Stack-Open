import { State } from "./state";
import { Diagnosis, Patient } from "../types";
import { BaseEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: BaseEntry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT":
      if (!state.patients[action.payload.id]) {
        return state;
      } else {
        return {
          ...state,
          patients: { ...state.patients, [action.payload.id]: action.payload },
        };
      }
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload.reduce((prev, cur) => {
          return { ...prev, [cur.code]: cur };
        }, {}),
      };
    default:
      return state;
  }
};

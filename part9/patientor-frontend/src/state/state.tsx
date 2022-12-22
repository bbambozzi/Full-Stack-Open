import React, { createContext, useContext, useReducer } from "react";
import { Diagnosis, Patient } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: Diagnosis["code"]]: Diagnosis };
};

const initialState: State = {
  patients: {},
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patients: Patient[]): void => {
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  dispatch({ type: "SET_PATIENT_LIST", payload: patients });
};

export const updatePatient = (patient: Patient): Patient | void => {
  const [state, dispatch] = useStateValue();
  dispatch({ type: "UPDATE_PATIENT", payload: patient });
  return state.patients[patient.id] ? state.patients[patient.id] : undefined;
};

export const getPatientList = (): { [id: string]: Patient } => {
  const [state] = useStateValue();
  return state.patients;
};

export const getDiagnoses = (): { [code: string]: Diagnosis } => {
  const [state] = useStateValue();
  return state.diagnoses;
};

export const getSinglePatient = (id: string | void): Patient | void => {
  if (!id) {
    return undefined;
  }
  const [state] = useStateValue();
  return state.patients[id] ? state.patients[id] : undefined;
};

export const getDiagnosisByCode = (code: string): Diagnosis => {
  const [state] = useContext(StateContext);
  return state.diagnoses[code];
};

export const useSetDiagnoses = ({
  diagnoses,
}: {
  diagnoses: Diagnosis[];
}): { [code: string]: Diagnosis } | void => {
  const [state, dispatch] = useContext(StateContext);
  dispatch({ type: "SET_DIAGNOSES", payload: diagnoses });
  return state.diagnoses;
};

import { Formik, Form, Field } from "formik";
import { HospitalTypeSelect, TextField } from "./FormField";
import { BaseEntry } from "../types";
import { PatientEntryTypes } from "../types";
import { Grid, Button } from "@material-ui/core";

export type EntryFormValues = Omit<BaseEntry, "id" | "date">;

interface EntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export interface PatientEntryValues {
  value: PatientEntryTypes;
  label: string;
}

const HospitalOptions: PatientEntryValues[] = [
  { value: PatientEntryTypes.HealthCheck, label: "HealthCheck" },
  { value: PatientEntryTypes.Hospital, label: "Hospital" },
  {
    value: PatientEntryTypes.OccupationalHealthcare,
    label: "OccupationalHealthcare",
  },
];

export const AddEntryForm = ({ onSubmit, onCancel }: EntryFormProps) => {
  return (
    <Formik
      initialValues={{
        specialist: "",
        diagnosisCodes: [],
        type: PatientEntryTypes.Hospital,
      }}
      onSubmit={onSubmit}
      onReset={onCancel}
      validate={(values: Partial<EntryFormValues>) => {
        const requiredError = "Field is required";
        const error: { [field: string]: string } = {};
        if (!values.diagnosisCodes) {
          error.diagnosisCodes = requiredError;
        }
        if (!values.type) {
          error.type = requiredError;
        }
        if (!values.specialist) {
          error.speassertialist = requiredError;
        }
        return error;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <HospitalTypeSelect
              label="type"
              name="type"
              options={HospitalOptions}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

import { useParams } from "react-router-dom";
import { getSinglePatient } from "../state";
import { Patient } from "../types";
import { Typography } from "@material-ui/core";

const SinglePatientPage = (): JSX.Element => {
  const patientId: string | void = useParams().id;
  const curPatient: Patient | void = getSinglePatient(patientId);
  return (
    <>
      {curPatient ? (
        <>
          <Typography variant="h4">{curPatient.name}</Typography>
          <Typography variant="body1">
            Profession : {curPatient.occupation}
          </Typography>
        </>
      ) : (
        <h4>Not Found ): </h4>
      )}
    </>
  );
};

export default SinglePatientPage;

import { useParams } from "react-router-dom";
import { getDiagnosisByCode, getSinglePatient } from "../state";
import { Patient } from "../types";
import { Typography, Box } from "@material-ui/core";
import { EntryDetails } from "../components/EntryDetails";

const SinglePatientPage = (): JSX.Element => {
  const patientId: string | void = useParams().id;
  const curPatient: Patient | void = getSinglePatient(patientId);
  return curPatient ? (
    <>
      <>
        <Typography variant="h4">{curPatient.name}</Typography>
        <Typography variant="body1">
          Profession : {curPatient.occupation}
        </Typography>
        <Typography variant="h5">
          {curPatient.entries?.length ? "Entries" : "No entries"}
        </Typography>
        <Box style={{ border: "" }}>
          {curPatient.entries?.map((e) => {
            return (
              <Box key={e.id} style={{ padding: "2em" }}>
                <EntryDetails type={e.type} />
                <Typography> Date : {e.date}</Typography>
                <Typography> Cared for by {e.specialist}</Typography>
                <Box>
                  {e.diagnosisCodes?.map((c) => {
                    return (
                      <Box key={c}>
                        <Typography variant="body2">
                          {getDiagnosisByCode(c).name}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </>
    </>
  ) : (
    <>
      <Typography variant="body2">Not Found</Typography>
    </>
  );
};

export default SinglePatientPage;

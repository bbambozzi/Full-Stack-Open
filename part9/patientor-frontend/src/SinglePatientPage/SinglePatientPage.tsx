import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDiagnosisByCode, getSinglePatient } from "../state";
import { Patient } from "../types";
import { Typography, Box, Button } from "@material-ui/core";
import { EntryDetails } from "../components/EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import AddEntryModal from "../AddEntryModal";

const SinglePatientPage = (): JSX.Element => {
  const patientId: string = useParams().id || "0";
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const addNewEntry = async (values: EntryFormValues) => {
    console.log(`About to add entry to patient ${patientId}`);
    const newObject = { ...values, id: patientId, date: Date.now().toString() };
    const data = await axios.post(
      `${apiBaseUrl}/api/patients/${patientId}/entries`,
      newObject
    );
    console.log(data);
  };

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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={addNewEntry}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          Add New Patient
        </Button>
      </>
    </>
  ) : (
    <>
      <Typography variant="body2">Not Found</Typography>
    </>
  );
};

export default SinglePatientPage;

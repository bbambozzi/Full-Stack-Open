import { Typography } from "@material-ui/core";

export const EntryDetails = ({ type }: { type: string }): JSX.Element => {
  switch (type) {
    case "HealthCheck":
      return (
        <>
          <Typography variant="body2">🟢 HealthCheck Visit!</Typography>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Typography variant="body2">
            🔵 Occupational Healthcare Visit!
          </Typography>
        </>
      );
    case "Hospital":
      return (
        <>
          <Typography variant="body2">🟣 Hospital Visit!</Typography>
        </>
      );
    default:
      return <>Error! Case not found</>;
  }
};

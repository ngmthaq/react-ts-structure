import React, { useMemo } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getPieOfHours } from "app/utils";
import OptionButton from "app/components/OptionButton";
import { Link } from "react-router-dom";
import FORMAT_CONST from "app/const/format.const";
import PATH_CONST from "app/const/path.const";
import APP_CONST from "app/const/app.const";
import clsx from "clsx";

const SeachArea: React.FC<Props> = () => {
  const classes = useStyles();
  const hours: string[] = useMemo(() => getPieOfHours(), []);

  return (
    <Box className={classes.container}>
      <Box component="form" className={classes.formContainer}>
        <Typography className={classes.title}>Title of search</Typography>
        <Box className={classes.formRow}>
          <FormControl fullWidth className={classes.formControl} variant="filled" size="small">
            <InputLabel variant="filled" htmlFor="uncontrolled-native">
              Provinces
            </InputLabel>
            <Select defaultValue={JAPAN_PROVINCES[0].code}>
              {JAPAN_PROVINCES.map(province => (
                <MenuItem value={province.code} key={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.formControl} variant="filled" size="small">
            <InputLabel variant="filled" htmlFor="uncontrolled-native">
              Start time
            </InputLabel>
            <Select defaultValue={hours[0]}>
              {hours.map(hour => (
                <MenuItem value={hour} key={hour}>
                  {hour}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className={classes.formControl} variant="filled" size="small">
            <InputLabel variant="filled" htmlFor="uncontrolled-native">
              End time
            </InputLabel>
            <Select defaultValue={hours[0]}>
              {hours.map(hour => (
                <MenuItem value={hour} key={hour}>
                  {hour}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography className={classes.title}>Another title of search</Typography>
        <Box className={classes.formRow}>
          <OptionButton id="fulltime" name="job_type" title="Full Time" type="checkbox" value="fulltime" />
          <OptionButton id="parttime" name="job_type" title="Part Time" type="checkbox" value="parttime" />
        </Box>
        <Box className={classes.formRow}>
          <Link className={clsx(classes.button, classes.outlinedButton)} to={PATH_CONST.setting.path}>
            Setting
          </Link>
          <Link
            className={classes.button}
            to={FORMAT_CONST.jobPath.replace(":path", PATH_CONST.jobs.path).replace(":mode", APP_CONST.jobModes.filter)}
          >
            Search
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SeachArea;

const JAPAN_PROVINCES: Array<{ name: string; code: string }> = [
  {
    name: "Aiti",
    code: "JP-23",
  },
  {
    name: "Akita",
    code: "JP-05",
  },
  {
    name: "Aomori",
    code: "JP-02",
  },
  {
    name: "Ehime",
    code: "JP-38",
  },
  {
    name: "Gihu",
    code: "JP-21",
  },
  {
    name: "Gunma",
    code: "JP-10",
  },
  {
    name: "Hirosima",
    code: "JP-34",
  },
  {
    name: "Hokkaidô",
    code: "JP-01",
  },
  {
    name: "Hukui",
    code: "JP-18",
  },
  {
    name: "Hukuoka",
    code: "JP-40",
  },
  {
    name: "Hukusima",
    code: "JP-07",
  },
  {
    name: "Hyôgo",
    code: "JP-28",
  },
  {
    name: "Ibaraki",
    code: "JP-08",
  },
  {
    name: "Isikawa",
    code: "JP-17",
  },
  {
    name: "Iwate",
    code: "JP-03",
  },
  {
    name: "Kagawa",
    code: "JP-37",
  },
  {
    name: "Kagosima",
    code: "JP-46",
  },
  {
    name: "Kanagawa",
    code: "JP-14",
  },
  {
    name: "Kumamoto",
    code: "JP-43",
  },
  {
    name: "Kyôto",
    code: "JP-26",
  },
  {
    name: "Kôti",
    code: "JP-39",
  },
  {
    name: "Mie",
    code: "JP-24",
  },
  {
    name: "Miyagi",
    code: "JP-04",
  },
  {
    name: "Miyazaki",
    code: "JP-45",
  },
  {
    name: "Nagano",
    code: "JP-20",
  },
  {
    name: "Nagasaki",
    code: "JP-42",
  },
  {
    name: "Nara",
    code: "JP-29",
  },
  {
    name: "Niigata",
    code: "JP-15",
  },
  {
    name: "Okayama",
    code: "JP-33",
  },
  {
    name: "Okinawa",
    code: "JP-47",
  },
  {
    name: "Saga",
    code: "JP-41",
  },
  {
    name: "Saitama",
    code: "JP-11",
  },
  {
    name: "Siga",
    code: "JP-25",
  },
  {
    name: "Simane",
    code: "JP-32",
  },
  {
    name: "Sizuoka",
    code: "JP-22",
  },
  {
    name: "Tiba",
    code: "JP-12",
  },
  {
    name: "Tokusima",
    code: "JP-36",
  },
  {
    name: "Totigi",
    code: "JP-09",
  },
  {
    name: "Tottori",
    code: "JP-31",
  },
  {
    name: "Toyama",
    code: "JP-16",
  },
  {
    name: "Tôkyô",
    code: "JP-13",
  },
  {
    name: "Wakayama",
    code: "JP-30",
  },
  {
    name: "Yamagata",
    code: "JP-06",
  },
  {
    name: "Yamaguti",
    code: "JP-35",
  },
  {
    name: "Yamanasi",
    code: "JP-19",
  },
  {
    name: "Ôita",
    code: "JP-44",
  },
  {
    name: "Ôsaka",
    code: "JP-27",
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingBottom: 8,
  },

  title: {
    fontWeight: 600,
    paddingBottom: 8,
    width: "100%",
  },

  formContainer: {
    padding: 8,
  },

  formRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingBottom: 16,
  },

  formControl: {
    maxWidth: "30vw",
  },

  button: {
    display: "inline-block",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[50],
    textDecoration: "none",
    textAlign: "center",
    borderRadius: 16,
    minWidth: 160,
    padding: "4px 8px",
  },

  outlinedButton: {
    backgroundColor: theme.palette.grey[50],
    border: "1px solid " + theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
}));

interface Props {}

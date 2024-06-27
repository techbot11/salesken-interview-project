import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import EventCard from "../components/EventCard";
import { FetchSpaceLaunches } from "../service/SpacexService";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GetYears } from "../utils/helper";
import useFilterLaunches from "../hooks/useFilterLaunches";
import { useDebounce } from "../hooks/useDebounce";

export default function Home(props: any) {
  return <MainLayout chidren={<HomeContext {...props} />} />;
}
function HomeContext(props: any) {
  const [filters, setFilters] = useState({
    launch_year: "",
    launch_success: false,
    mission_name: "",
  });
  // const { debounce } = useDebounce({});
  const { launches } = useFilterLaunches({
    filters,
  });

  const { debounce } = useDebounce({
    bounceDelay: 100,
  });

  const handleSearch = (e: any) =>
    debounce(() => {
      setFilters((prev) => ({
        ...prev,
        mission_name: e.target.value as string,
      }));
    });

  return (
    <div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        rowGap={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid xs={12}>
          <TextField
            id="outlined-basic"
            label="Search..."
            variant="outlined"
            fullWidth
            value={filters.mission_name}
            onChange={handleSearch}
          />
        </Grid>
        <Grid xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.launch_year}
              onChange={(e) => {
                debugger;
                setFilters((prev) => ({
                  ...prev,
                  launch_year: e.target.value as string,
                }));
              }}
            >
              {GetYears().map((year) => {
                return <MenuItem value={year}>{year}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={4} sx={{ ml: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Show Launch Successfully
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.launch_success === true ? 0 : 1}
              onChange={(e) => {
                debugger;
                setFilters((prev) => ({
                  ...prev,
                  launch_success: !!e.target.value,
                }));
              }}
            >
              <MenuItem value={0}>Yes</MenuItem>
              <MenuItem value={1}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        rowGap={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 5 }}
      >
        {!launches?.length && <Grid>No data found</Grid>}
        {launches?.map((data: any) => {
          return (
            <Grid xs={4}>
              <EventCard data={data} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

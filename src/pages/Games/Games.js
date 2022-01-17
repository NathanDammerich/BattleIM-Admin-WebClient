import {
  Grid,
  TextField,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import Next from "@mui/icons-material/KeyboardArrowRight";
import Previous from "@mui/icons-material/KeyboardArrowLeft";
import Sort from "@mui/icons-material/Sort";
import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { useDeferred } from "../../hooks/useDeferred";
import GameCard from "../../components/GameCard/GameCard";
// import { useSelector } from "react-redux";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const mockGames = [
  {
    location: "ABC",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away",
    time: new Date("1/1/2020 1:00 pm").toString(),
  },
  {
    location: "ABC",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away1",
    time: new Date("1/1/2020 2:00 pm").toString(),
  },
  {
    location: "XYZ",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away2",
    time: new Date("1/1/2020 3:00 pm").toString(),
  },
  {
    location: "XYZ",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away3",
    time: new Date("1/1/2020 4:00 pm").toString(),
  },
  {
    location: "ABC",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away",
    time: new Date("1/1/2020 5:00 pm").toString(),
  },
  {
    location: "ABC",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away1",
    time: new Date("1/1/2020 6:00 pm").toString(),
  },
  {
    location: "XYZ",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away2",
    time: new Date("1/1/2020 7:00 pm").toString(),
  },
  {
    location: "XYZ",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away3",
    time: new Date("1/1/2020 8:00 pm").toString(),
  },
];

const categorize = (category, data) => {
  const categorization = Object.fromEntries(data.map((v) => [v[category], []]));
  data.forEach((v) => {
    categorization[v[category]].push(v);
  });
  return categorization;
};

export default function Games() {
  // const admin = useSelector((state) => state.admin);
  const [date, setDate] = useState(moment(new Date()));
  const [menuOpen, setMenuOpen] = useState(null);
  const [category, setCategory] = useState("location");
  const [sortDirection, setSortDirection] = useState(1);
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferred(filter, 300);
  const handleChangeDay = (value) => () => {
    setDate(moment(date).add(value, "day"));
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const games = mockGames;

  const categorization = React.useMemo(
    () => categorize(category, games ?? []),
    [games, category]
  );
  const filteredSortedCategories = React.useMemo(
    () =>
      Object.entries(categorization)
        .filter(([label]) =>
          label.toUpperCase().includes(deferredFilter.toUpperCase())
        )
        .sort(([a], [b]) => (a > b ? 1 * sortDirection : -1 * sortDirection)),
    [categorization, deferredFilter, sortDirection]
  );

  const SortMenuItem = ({ value, label }) => {
    console.log("SortMenuItem");
    const handleSortMenuItem = () => {
      setSortDirection(category === value ? sortDirection * -1 : 1);
      setCategory(value);
    };
    return (
      <MenuItem onClick={handleSortMenuItem}>
        <ListItemText>{label}</ListItemText>
        <ListItemIcon>
          <Sort
            style={{
              display: category === value ? "visible" : "none",
              transform: sortDirection === 1 ? "none" : "rotate(180deg)",
            }}
          />
        </ListItemIcon>
      </MenuItem>
    );
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginTop="10px"
        marginBottom="10px"
      >
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            onChange={handleFilterChange}
            label="Filter"
          />
          <Button
            onClick={(e) => setMenuOpen(e.currentTarget)}
          >{`Sort by: ${category}`}</Button>
          <Menu
            open={!!menuOpen}
            anchorEl={menuOpen}
            onClose={() => setMenuOpen(null)}
          >
            <SortMenuItem label="Location" value="location" />
            <SortMenuItem label="League" value="league" />
          </Menu>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleChangeDay(-1)}>
            <Previous />
          </IconButton>
          <DatePicker
            label="Pick Date"
            value={date}
            onChange={setDate}
            renderInput={(params) => (
              <TextField variant="outlined" {...params} />
            )}
          />
          <IconButton onClick={handleChangeDay(1)}>
            <Next />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={1}>
        {filteredSortedCategories.map(([label, games]) => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <GameCard games={games} label={label} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

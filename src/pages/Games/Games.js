import {
  Grid,
  TextField,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Paper,
} from "@material-ui/core";
import Sort from "@mui/icons-material/Sort";
import React, { useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { useDeferred } from "../../hooks/useDeferred";
import { useSelector } from "react-redux";
import moment from "moment";
import SimpleDatePicker from "../../components/SimpleDatePicker/SimpleDatePicker";
import GamesList from "../../components/Teams/TeamCard/GamesList/GamesList";

const mockGames = [
  {
    _id: "test123",
    location: "ABC",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away",
    time: new Date("1/1/2020 1:00 pm").toString(),
  },
  {
    _id: "test123",
    location: "ABC",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away1",
    time: new Date("1/1/2020 2:00 pm").toString(),
  },
  {
    _id: "test123",
    location: "XYZ",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away2",
    time: new Date("1/1/2020 3:00 pm").toString(),
  },
  {
    _id: "test123",
    location: "XYZ",
    league: "Basketball",
    homeTeam: "home",
    awayTeam: "away3",
    time: new Date("1/1/2020 4:00 pm").toString(),
  },
  {
    _id: "test123",
    location: "ABC",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away",
    time: new Date("1/1/2020 5:00 pm").toString(),
  },
  {
    _id: "test123",
    location: "ABC",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away1",
    time: new Date("1/1/2020 6:00 pm").toString(),
  },
  {
    _id: "test123",
    location: "XYZ",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away2",
    time: new Date("1/1/2020 7:00 pm").toString(),
  },
  {
    _id: "test123",
    location: "XYZ",
    league: "Softball",
    homeTeam: "home",
    awayTeam: "away3",
    time: new Date("1/1/2020 8:00 pm").toString(),
  },
];

const categorize = (category, data) => {
  let categorization = {};
  data.forEach((v) => {
    categorization[v[category]] = [...(categorization[v[category]] ?? []), v];
  });
  return categorization;
};

export default function Games() {
  const admin = useSelector((state) => state.admin);
  const [date, setDate] = useState(moment(new Date("December 20, 2021")));
  const [menuOpen, setMenuOpen] = useState(null);
  const [category, setCategory] = useState("location");
  const [sortDirection, setSortDirection] = useState(1);
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferred(filter, 300);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const [fetchedGames] = useFetchData(
    null,
    admin.org._id,
    "orgGamesOnDate",
    date.toISOString()
  );
  const games = fetchedGames || mockGames;

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
        <SimpleDatePicker onChange={setDate} value={date} />
      </Box>
      <Grid container spacing={1}>
        {filteredSortedCategories.map(([label, games]) => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <Paper>
                <Box padding="5px">
                  <Typography>{label}</Typography>
                  <GamesList games={games} teamID="na" />
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

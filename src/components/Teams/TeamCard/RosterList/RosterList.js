import { Button, Grid, Typography } from "@material-ui/core";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import * as api from "../../../../api/index";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";

export default function RosterList({ team }) {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [players, setPlayers] = useState(team.players);
  const [invites, setInvites] = useState(team.invites);
  console.log(team.invites);
  const [isEditingRoster, setIsEditingRoster] = useState(false);
  const [userOptions, setUserOptions] = useState([]);

  const toggleEditRoster = () => {
    setIsEditingRoster(!isEditingRoster);
  };

  const callRemovePlayer = (player) => {
    if (player._id === team.captain) return;
    setPlayers(
      players.filter(
        (playerFromTeam) => String(playerFromTeam._id) !== String(player._id)
      )
    );
    console.log(players);
    //dispatch(removePlayer(team._id, player._id));
  };

  const callRemoveInvitedPlayer = (player) => {
    setInvites(
      invites.filter(
        (playerFromTeam) => String(playerFromTeam._id) !== String(player._id)
      )
    );
    console.log(players);
    //dispatch(removePlayer(team._id, player._id));
  };

  const handleChange = async (e) => {
    const users = await api.findUsers(user.orgs[0], e.target.value);
    const filterUsers = (user) => {
      for (let player of players) {
        if (user._id === player._id) return false;
      }
      for (let invite of invites) {
        if (user._id === invite._id) return false;
      }
      return true;
    };
    const usersList = users.data.filter((user) => filterUsers(user));

    setUserOptions(usersList);
    console.log(userOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const callSendInvite = (userToInvite) => {
    setInvites([...invites, userToInvite]);
    setUserOptions([]);
    document.getElementById("queryString").value = null;

    //dispatch(sendInvite(userToInvite, user._id, team._id));
  };

  if (team.players.length < 1) return null;
  return (
    <Grid container>
      <Grid item xs={12} container alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6" align="left">
            Roster
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <>
            {user._id === team.captain && (
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                className={classes.smallButton}
                onClick={toggleEditRoster}
              >
                Edit Roster
              </Button>
            )}
          </>
        </Grid>
      </Grid>
      {players.map((player) => (
        <Grid item xs={12} container key={player._id} alignItems="center">
          <Grid item xs={6} align="left">
            <Typography>
              {player.name} {player._id === team.captain && " - Captain"}
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            {isEditingRoster ? (
              <CancelOutlinedIcon
                alignItems="center"
                className={
                  player._id === team.captain
                    ? classes.captainIcon
                    : classes.icon
                }
                onClick={() => callRemovePlayer(player)}
              />
            ) : (
              <CancelOutlinedIcon
                align="right"
                className={classes.transparent}
              />
            )}
          </Grid>
        </Grid>
      ))}
      {invites.length > 0 &&
        invites.map((invitedPlayer) => (
          <Grid item xs={12} container key={invitedPlayer._id}>
            <Grid item xs={6} align="left">
              <Typography variant="body1" color="primary" align="left">
                {invitedPlayer.name}
                <span className={classes.invited}>- Invited</span>
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              {isEditingRoster ? (
                <CancelOutlinedIcon
                  className={classes.icon}
                  onClick={() => callRemoveInvitedPlayer(invitedPlayer)}
                />
              ) : (
                <CancelOutlinedIcon className={classes.transparent} />
              )}
            </Grid>
          </Grid>
        ))}
      {isEditingRoster && (
        <Grid item container xs={12}>
          <form
            className={classes.form}
            action="/"
            autocomplete="off"
            onSubmit={handleSubmit}
          >
            <Grid item xs={12}>
              <div className={classes.inputContainer}>
                <input
                  name="queryString"
                  id="queryString"
                  placeholder="Invite Players..."
                  className={classes.input}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            {userOptions.map((user) => (
              <Grid
                item
                xs={12}
                key={user._id}
                align="left"
                className={classes.userList}
              >
                {/* <div className={classes.userList}> */}
                <Typography
                  variant="body1"
                  align="left"
                  className={classes.userName}
                  onClick={() => callSendInvite(user)}
                >
                  {user.name}
                </Typography>
                {/* </div> */}
              </Grid>
            ))}
          </form>
        </Grid>
      )}
    </Grid>
  );
}

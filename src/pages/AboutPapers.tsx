import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AboutPapers() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <Link
        href="https://link.springer.com/protocol/10.1007%2F978-1-0716-0908-8_14"
        color="inherit"
      >
        <ListItem button>
          <ListItemText>
            Storch, M., Dwijayanti, A., Mallick, H., Haines, M. C., & Baldwin,
            G. S. (2020). BASIC: A Simple and Accurate Modular DNA Assembly
            Method. Methods in Molecular Biology (Clifton, N.J.), 2205, 239–253.
            https://doi.org/10.1007/978-1-0716-0908-8_14
          </ListItemText>
        </ListItem>
      </Link>
      <Divider />
      <Link
        href="https://academic.oup.com/synbio/article/5/1/ysaa010/5869449"
        color="inherit"
      >
        <ListItem button divider>
          <ListItemText>
            Storch, M., Haines, M. C., & Baldwin, G. S. (2020). DNA-BOT: a
            low-cost, automated DNA assembly platform for synthetic biology.
            Synthetic Biology, 5(1). https://doi.org/10.1093/synbio/ysaa010
          </ListItemText>
        </ListItem>
      </Link>
      <Divider light />
      <Link href="https://pubs.acs.org/doi/10.1021/sb500356d" color="inherit">
        <ListItem button>
          <ListItemText>
            Storch, M., Casini, A., Mackrow, B., Fleming, T., Trewhitt, H.,
            Ellis, T., & Baldwin, G. S. (2015). BASIC: A New Biopart Assembly
            Standard for Idempotent Cloning Provides Accurate, Single-Tier DNA
            Assembly for Synthetic Biology. ACS Synthetic Biology, 4(7),
            781–787. https://doi.org/10.1021/sb500356d
          </ListItemText>
        </ListItem>
      </Link>
    </List>
  );
}

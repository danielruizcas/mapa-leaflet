import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

function SearchBox(props) {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listItems, setListItems] = useState([]);

  function handleSearch(e) {
    e.preventDefault();
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setListItems(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form style={{ display: "flex" }} onSubmit={handleSearch}>
        <div style={{ flex: 1 }}>
          <OutlinedInput
            style={{ width: "100%" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></OutlinedInput>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button variant="contained" onClick={handleSearch}>
            Contained
          </Button>
        </div>
      </form>
      <div>
        <List>
          {listItems.map((item) => {
            return (
              <div key={item?.osm_id}>
                <ListItem
                  button
                  onClick={() => {
                    setSelectPosition(item);
                    console.log(selectPosition);
                  }}
                >
                  <ListItemIcon>
                    <img
                      src="./marcador-de-posicion.png"
                      alt="marcador"
                      style={{ width: 38, height: 38 }}
                    ></img>
                  </ListItemIcon>
                  <ListItemText primary={item?.display_name} />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default SearchBox;

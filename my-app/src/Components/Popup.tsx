import { Box, Typography } from "@mui/material";
import { FeatureProperties } from "../Interfaces/data_Interface";
import { type FC } from "react";

const PopupContent: FC<FeatureProperties> = (props) => {
  console.log(props);

  return (
    <Box display={"flex"} alignItems={"center"} flexWrap={"wrap"}>
      <Box
        key={String(props.id_point)}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Typography fontWeight={700}>ID Point: </Typography>{" "}
        <Typography component={"span"}>&nbsp;{props.id_point}</Typography>
      </Box>
      <Box
        key={String(props.name)}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Typography fontWeight={700}>Name: </Typography>{" "}
        <Typography component={"span"}>&nbsp;{props.name}</Typography>
      </Box>
      <Box
        key={String(props.sport_type)}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Typography fontWeight={700}>Sport type: </Typography>{" "}
        <Typography component={"span"}>&nbsp;{props.sport_type}</Typography>
      </Box>
      <Box
        key={String(props.sport_entertainment)}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Typography fontWeight={700}>Sport entertainment: </Typography>{" "}
        <Typography component={"span"}>
          &nbsp;{props.sport_entertainment}
        </Typography>
      </Box>
      <Box
        key={String(props.source)}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Typography fontWeight={700}>Source: </Typography>{" "}
        <Typography component={"span"}>&nbsp;{props.source}</Typography>
      </Box>
    </Box>
  );
};

export { PopupContent };

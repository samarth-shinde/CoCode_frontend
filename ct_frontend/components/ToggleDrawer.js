import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { Container } from "@mui/material";
import { motion } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";
import CalanderHelper from "./CalanderHelper";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ToggleDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  buttonVariants,
  droppedContests,
  handleDeleteContest,
  createEvents,
}) {
  const [Calander, setCalander] = useState(false);
  return (
    <Drawer
      open={isDrawerOpen}
      anchor="bottom"
      variant="persistent"
      sx={{
        width: "w-fit",
        height: "w-fit",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        "& .MuiDrawer-paper": {
          width: "240",

          right: "0",
        },
      }}
      classes={{
        paper:
          "bg-black top-32 bottom-32 rounded-3xl border-4 border-indigo-400 right-5 w-96 justify-items-center",
      }}
    >
      <div className="inline-flex">
        <IconButton>
          <ChevronLeftIcon
            className="text-white ml-3 hover:text-gray-500"
            onClick={() => setIsDrawerOpen(false)}
          />
        </IconButton>
        <p className="text-white mr-3 my-auto">
          Drop a Contest You want to Compete in
        </p>
      </div>

      {!Calander && (
        <Droppable droppableId="container">
          {(provided, snapshot) => (
            <Container
              className={`${
                snapshot.isDraggingOver ? "bg-green-400" : "bg-offgrey"
              } border-dotted border-white flex justify-center items-center w-72 h-72 my-10 max-w-96 max-h-96`} //ye h !
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div>
                {droppedContests.length > 0 ? (
                  droppedContests.map((contest, index) => (
                    <div key={index} className="text-white">
                      {contest.name}
                      <IconButton
                        className="absolute text-white hover:text-gray-700"
                        onClick={handleDeleteContest}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    </div>
                  ))
                ) : (
                  <span className="text-grey">Drag and Drop</span>
                )}
              </div>
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      )}

      {Calander && (
        <GoogleOAuthProvider clientId="746149425082-efarmpvof2pbric8a7hahbsthagu0ahr.apps.googleusercontent.com">
          <CalanderHelper
            setCalander={setCalander}
            createEvents={createEvents}
          />{" "}
        </GoogleOAuthProvider>
      )}

      <motion.button
        className="bg-indigo-500 mt-10 w-full pb-5 text-white"
        variants={buttonVariants}
        whileHover="hover"
        onClick={() => setCalander(true)}
      >
        Add to Calendar
      </motion.button>
    </Drawer>
  );
}

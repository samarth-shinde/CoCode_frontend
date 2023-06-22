import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { Container } from "@mui/material";
import { motion } from "framer-motion";
import { Droppable } from "react-beautiful-dnd";
import CalanderHelper from "./CalanderHelper";
import CustomStepper from "./CustomStepper";
import Typography from "@mui/material/Typography";
export default function ToggleDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  buttonVariants,
  droppedContests,
  handleDeleteContest,
  createEvents,
  setSelectedReminders,
  selectedReminders,
  setDroppedContests,
}) {
  const [Calander, setCalander] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showDragAndDrop, setShowDragAndDrop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleAddtoCalendar = () => {
    console.log(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(activeStep);
    if (activeStep === 0 && droppedContests.length > 0) {
      setCalander(true);
      setSuccess(false);
    } else if (droppedContests.length === 0) {
      alert("Please drop an item first");
    }
    if (activeStep >= 1) {
      createEvents();
      setCalander(false);
      setIsLoading(true);
      setSuccess(true);
      setActiveStep(0);
      setDroppedContests(false);
    }
  };
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  setTimeout(() => {
    setSuccess(false);
  }, 5000);

  const truncate = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

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
        boxShadow: 3,
        "& .MuiDrawer-paper": {
          width: "240",

          right: "0",
        },
      }}
      classes={{
        paper:
          "bg-[#17203F] opacity-[5px] top-[10%] bottom-[10%] rounded-lg !right-[10px] left-[unset] flex flex-col shadow-offgrey shadow-2xl right-5 w-96 overflow-hidden justify-between",
      }}
    >
      {showDragAndDrop ? (
        <>
          <div className="inline-flex">
            <IconButton>
              <KeyboardArrowDownOutlined
                className="text-white ml-3 hover:text-gray-500"
                onClick={() => setIsDrawerOpen(false)}
                id="header-text"
              />
            </IconButton>
            <Typography
              color="white"
              margin="auto"
              width="fit-content"
              className="font-bold text-3xl mb-5"
              id="header-text"
            >
              Remind Me
            </Typography>
          </div>

          {!Calander && (
            <Droppable droppableId="container">
              {(provided, snapshot) => (
                <Container
                  className={`${
                    snapshot.isDraggingOver
                      ? "bg-[#9635FB] border-white"
                      : "bg-[#183251] border-stone-500"
                  }
                  border-dotted  first-letter rounded-md flex justify-center items-center border-[2px] w-80 h-full my-10 max-w-96 max-h-96`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div>
                    {droppedContests.length > 0 ? (
                      droppedContests.map((contest, index) => (
                        <div key={index} className="text-grey">
                          {truncate(contest.name, 20)}

                          <DeleteOutlined
                            className="absolute text-grey ml-[3px] hover:text-gray-700"
                            onClick={handleDeleteContest}
                            fontSize="small"
                          />
                        </div>
                      ))
                    ) : (
                      <span
                        className={`${
                          snapshot.isDraggingOver ? "hidden" : "text-stone-500"
                        }`}
                      >
                        Drag and Drop
                      </span>
                    )}
                  </div>
                  {provided.placeholder}
                </Container>
              )}
            </Droppable>
          )}

          {Calander && (
            <CalanderHelper
              handleAddtoCalendar={handleAddtoCalendar}
              setActiveStep={setActiveStep}
              setCalander={setCalander}
              setSelectedReminders={setSelectedReminders}
              selectedReminders={selectedReminders}
            />
          )}

          <motion.button
            className={`${
              success ? "bg-green-500" : "bg-indigo-500"
            } w-full py-3 text-white`}
            variants={buttonVariants}
            whileHover="hover"
            onClick={handleAddtoCalendar}
            setCalander={setCalander}
          >
            {isLoading && (
              <svg
                v-show="isLoading"
                className="w-5 h-5 text-white animate-spin m-auto"
                fill="none"
                viewBox="0 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="5"
                ></circle>
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
            <span className={`${isLoading ? "hidden" : ""}`}>
              {`${success ? "DONE!" : "Add to Calander"}`}
            </span>
          </motion.button>
        </>
      ) : (
        <CustomStepper setShowDragAndDrop={setShowDragAndDrop} />
      )}
    </Drawer>
  );
}

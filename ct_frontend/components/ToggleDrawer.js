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
export default function ToggleDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  buttonVariants,
  droppedContests,
  handleDeleteContest,
  createEvents,
  setSelectedReminders,
  selectedReminders,
}) {
  const [Calander, setCalander] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showDragAndDrop, setShowDragAndDrop] = useState(false);
  const handleAddtoCalendar = () => {
    if (activeStep === 0 && droppedContests.length > 0) {
      setCalander(true);
    } else {
      alert("Please drop an item first");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep > 2) {
      createEvents();
    }
  };

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
          "bg-[#17203F] opacity-[5px] top-[10%] bottom-[10%] rounded-lg !right-[10px] left-[unset] flex flex-col shadow-offgrey shadow-2xl right-5 w-96 overflow-hidden justify-between ",
      }}
    >
      {showDragAndDrop ? (
        <>
          <div className="inline-flex">
            <IconButton>
              <KeyboardArrowDownOutlined
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
            className="bg-indigo-500 w-full py-3 text-white"
            variants={buttonVariants}
            whileHover="hover"
            onClick={handleAddtoCalendar}
            setCalander={setCalander}
          >
            Add to Calendar
          </motion.button>
        </>
      ) : (
        <CustomStepper setShowDragAndDrop={setShowDragAndDrop} />
      )}
    </Drawer>
  );
}

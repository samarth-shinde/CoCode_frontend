import axios from "axios";
import { MdQueryStats } from "react-icons/md";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";
import ToggleDrawer from "../components/ToggleDrawer";
import Spinner from "../components/Spinner";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import config from "../config";
const textVariants = {
  hidden: {
    scale: 0.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Updates() {
  const [data, setData] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [droppedContests, setDroppedContests] = useState([]);
  const [selectedReminders, setSelectedReminders] = useState([]);
  useEffect(() => {
    axios.get("https://kontests.net/api/v1/all").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    const draggedIndex = result.draggableId;
    console.log(result.destination);
    const droppedContest = data[draggedIndex];
    if (
      droppedContests.find((contest) => contest.name === droppedContest.name)
    ) {
      alert("item already there");
      return;
    }
    setDroppedContests((prevContests) => [...prevContests, droppedContest]);
  };
  const handleDeleteContest = (index) => {
    setDroppedContests((prevContests) => {
      const updatedContests = [...prevContests];
      updatedContests.splice(index, 1);
      return updatedContests;
    });
  };

  const sendEmailReminders = (contests) => {
    // Send an HTTP POST request to your backend endpoint to send the email reminders

    axios
      .post(`${config.baseURL}/api/send_email`, { contests, selectedReminders })
      .then((response) => {
        console.log("Emails sent:", response.data);
      })
      .catch((error) => {
        console.error("Failed to send emails:", error);
      });
  };

  const createEvents = () => {
    sendEmailReminders(droppedContests);
  };

  return (
    <>
      {data ? (
        <div className=" px-4 m-auto py-6 w-full overflow-x-hidden bg-[#1C1C28]">
          <motion.div
            className="flex justify-center mb-[3rem] items-center text-5xl"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <MdQueryStats />
            <h1 className="text-5xl mx-2 font-semibold" id="header-text">
              Contests
            </h1>
          </motion.div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="cardList">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 place-items-stretch">
                    {data.map((item, index) => {
                      return (
                        <Draggable
                          draggableId={`${index}`}
                          index={index}
                          key={`${index}`}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${snapshot.isDraggingOver ? "" : ""}`}
                            >
                              <Card
                                item={item}
                                index={index}
                                buttonVariants={buttonVariants}
                                textVariants={textVariants}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <ToggleDrawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              buttonVariants={buttonVariants}
              droppedContests={droppedContests}
              handleDeleteContest={handleDeleteContest}
              createEvents={createEvents}
              setSelectedReminders={setSelectedReminders}
              selectedReminders={selectedReminders}
            />
          </DragDropContext>

          <motion.button
            className="fixed bottom-4 left-4 px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            variants={buttonVariants}
            whileHover="hover"
          >
            Toggle Drawer
          </motion.button>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

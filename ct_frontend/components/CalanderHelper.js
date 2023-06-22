import React, { useState } from "react";
import { motion } from "framer-motion";
import ChevronLeft from "@mui/icons-material/ChevronLeft";

export default function CalanderHelper({
  setCalander,
  setActiveStep,
  buttonVariants,
  handleAddtoCalendar,
  setSelectedReminders,
  selectedReminders,
}) {
  const onFailure = (error) => {
    console.log("Login error:", error);
  };

  const onClickHandler = () => {
    setActiveStep(0);
    setCalander(false);
  };

  const handleReminderChange = (reminder) => {
    if (selectedReminders.includes(reminder)) {
      setSelectedReminders(selectedReminders.filter((r) => r !== reminder));
    } else {
      setSelectedReminders([...selectedReminders, reminder]);
    }
    console.log(selectedReminders);
  };

  return (
    <>
      <ul className="flex flex-col-reverse gap-3 m-[20px]">
        <li>
          <input
            id="30min"
            value="30min"
            type="checkbox"
            className="hidden peer"
            onChange={(e) => handleReminderChange(e.target.value)}
          />
          <label
            for="30min"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 125.39"
                width="25px"
                height="25px"
              >
                <path d="M113.06,30.25c-3.58-5.37-11.85-.66-8.71,5.3l.13.22a51.33,51.33,0,0,1,4.3,8.21,5.1,5.1,0,1,0,9.43-3.89,62.25,62.25,0,0,0-5.15-9.84ZM36.42,92.72l2.23-18.84h4.62l3.88,13.24L51,73.88H55.6l2.25,18.84H53.11L51.66,80.6l.71,0-3,12.1H44.79l-3-12.1.78,0L41.16,92.72Zm24.35,0V73.88h4.92V92.72Zm8.34,0V73.88H73l6.62,10.5V73.88h4.92V92.72h-3.9L74,82.22v10.5ZM49,68.06q-3.42,0-6.62-.3a56.05,56.05,0,0,1-5.94-.86V60.24h9.31a15.47,15.47,0,0,0,2.59-.17,2.24,2.24,0,0,0,1.26-.56,1.55,1.55,0,0,0,.34-1.07v-.81a2,2,0,0,0-.38-1.24,2.31,2.31,0,0,0-1.11-.7,6.8,6.8,0,0,0-1.8-.28L39,55.07V48.66l7.23-.47a7.83,7.83,0,0,0,2.52-.51,1.4,1.4,0,0,0,.81-1.37v-.39a1.88,1.88,0,0,0-.86-1.75,6.76,6.76,0,0,0-3.16-.51H36.84V37q2.79-.47,5.86-.87a39.18,39.18,0,0,1,6.24-.33,12.21,12.21,0,0,1,4.72.92,6.59,6.59,0,0,1,3.05,2.65,8.58,8.58,0,0,1,1.07,4.51V46a9.51,9.51,0,0,1-.19,2A5.55,5.55,0,0,1,57,49.66,4.44,4.44,0,0,1,55.86,51a5.32,5.32,0,0,1-1.67.9,4.58,4.58,0,0,1,1.78,1,5.89,5.89,0,0,1,1.24,1.56,8.12,8.12,0,0,1,.74,2,11,11,0,0,1,.26,2.42v1.24A7.3,7.3,0,0,1,55.75,66a10.27,10.27,0,0,1-6.77,2Zm20.94,0a10.24,10.24,0,0,1-4.85-1,6.37,6.37,0,0,1-2.88-3,10.48,10.48,0,0,1-.94-4.63V44.85a11,11,0,0,1,1-5,6.87,6.87,0,0,1,3-3.06A9.94,9.94,0,0,1,70,35.79h6.92a9.15,9.15,0,0,1,4.56,1.05,6.87,6.87,0,0,1,2.82,3.06,11.44,11.44,0,0,1,1,5V59.43a8.89,8.89,0,0,1-2.16,6.32,8.1,8.1,0,0,1-6.22,2.31Zm2-7.44h2.56a2.13,2.13,0,0,0,2.4-2.48V45.71a2.52,2.52,0,0,0-.6-2,2.19,2.19,0,0,0-1.45-.49H71.67a2,2,0,0,0-1.62.6,2.85,2.85,0,0,0-.52,1.88V58.1a2.65,2.65,0,0,0,.6,1.95,2.6,2.6,0,0,0,1.84.57Zm32.66-43.93a5.37,5.37,0,0,1,.33,1.57A5.14,5.14,0,0,1,101.39,24L87.7,28.18a5.13,5.13,0,0,1-3-9.81L86,18A51.55,51.55,0,0,0,61.21,11.7,52,52,0,0,0,48.8,114.2a5.31,5.31,0,0,1,2.29,0,51.74,51.74,0,0,0,9.2,1l-.59.48h.59v-.49h0a4.81,4.81,0,0,1,2.8.92,4.61,4.61,0,0,1-.07,8.41,5.21,5.21,0,0,1-2.93.87,69.72,69.72,0,0,1-11.05-1.23,5.21,5.21,0,0,1-1.08-.34,6.25,6.25,0,0,1-1-.56A61.22,61.22,0,1,1,91.2,10.33L89.91,7a5.14,5.14,0,0,1,9.61-3.66l5.11,13.38ZM60.13,124.9a62.52,62.52,0,0,1-10.59-1.1l-.46.36,11.05,1.23v-.49Zm18.42-12.61a4.9,4.9,0,0,0-1.57.9,5.1,5.1,0,0,0,5,8.72,63.09,63.09,0,0,0,10.1-4.62A5.1,5.1,0,0,0,87,108.44a49.32,49.32,0,0,1-8.43,3.85ZM101,96.53A5.11,5.11,0,0,0,107.8,104a5.28,5.28,0,0,0,1.16-1,62.79,62.79,0,0,0,6.21-9.22,5.11,5.11,0,0,0-8.62-5.43A75.92,75.92,0,0,1,101,96.53ZM112.1,71.31a5.11,5.11,0,0,0,9.79,2.63,5.75,5.75,0,0,0,.31-1.15,61.25,61.25,0,0,0,.64-11.08c-.28-6.29-9.56-6.74-10.19-.11v.83a52.78,52.78,0,0,1-.56,8.88Z" />
              </svg>
              <div className="w-full text-lg font-semibold">30 Minutes</div>
              <div className="w-full text-sm">
                Get reminded 30 Minutes before the contensts are about to start
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            id="1day"
            value="1day"
            className="hidden peer"
            onChange={(e) => handleReminderChange(e.target.value)}
          />
          <label
            for="1day"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 121.565 122.88"
                enable-background="new 0 0 121.565 122.88"
              >
                <g>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M61.44,0c18.854,0,35.724,8.493,46.992,21.863l7.76-7.76v25.464H90.728 l7.282-7.281c-8.656-11.037-22.112-18.128-37.227-18.128c-26.113,0-47.283,21.169-47.283,47.282 c0,26.113,21.169,47.283,47.283,47.283c21.718,0,40.014-14.644,45.559-34.592h15.224c-5.847,27.843-30.543,48.749-60.125,48.749 C27.508,122.88,0,95.372,0,61.439C0,27.508,27.508,0,61.44,0L61.44,0z M60.585,79.843H35.262v-5.485L46.922,62.1 c2.876-3.276,4.313-5.871,4.313-7.801c0-1.558-0.34-2.748-1.021-3.556c-0.68-0.816-1.676-1.225-2.969-1.225 c-1.276,0-2.313,0.544-3.113,1.633c-0.801,1.088-1.2,2.442-1.2,4.075h-8.422c0-2.229,0.553-4.288,1.669-6.178 c1.114-1.88,2.663-3.358,4.635-4.422c1.982-1.063,4.186-1.592,6.635-1.592c3.912,0,6.933,0.902,9.051,2.714 c2.127,1.812,3.182,4.416,3.182,7.801c0,1.429-0.263,2.823-0.8,4.177c-0.526,1.352-1.352,2.771-2.474,4.262 c-1.123,1.487-2.928,3.469-5.42,5.961l-4.688,5.411h14.284V79.843L60.585,79.843z M84.834,65.662h3.692v6.483h-3.692v7.697h-8.397 v-7.697H62.411l-0.504-5.139l14.529-23.375v-0.077h8.397V65.662L84.834,65.662z M69.903,65.662h6.533V54.494l-0.519,0.851 L69.903,65.662L69.903,65.662z"
                  />
                </g>
              </svg>
              <div className="w-full text-lg font-semibold">1 Day</div>
              <div className="w-full text-sm">
                Get Reminded 1 Day before the contenst is about to begin
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            id="1week"
            value="1week"
            className="hidden peer"
            onChange={(e) => handleReminderChange(e.target.value)}
          />
          <label
            for="1week"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 120.76"
                width="25px"
                height="25px"
              >
                <path
                  class="cls-1"
                  d="M42.13,84.19h6.39l-3,19.12h-8l-1.41-7h-.36l-1.38,7h-8l-3-19.12H29.8l1.44,10.68h.18l2.21-10.68h4.68l2.17,10.68h.18l1.47-10.68Zm20.39,11.9H56.4v2.33h7.5v4.89H50.28V84.19H63.75L63,89.09H56.4v2.57h6.12v4.43Zm16.45,0H72.85v2.33h7.49v4.89H66.73V84.19H80.19l-.77,4.9H72.85v2.57H79v4.43ZM89.29,95v8.32H83.17V84.19h6.12V92h.12a4.49,4.49,0,0,1,.31-1.47l3-6.33h6.61l-4.59,9.39,4.74,9.73H92.87l-3.15-6.85A4.49,4.49,0,0,1,89.41,95Z"
                />
                <path
                  class="cls-2"
                  d="M82.69,4.21C82.69,1.87,85,0,87.84,0S93,1.91,93,4.21v18.5c0,2.34-2.3,4.21-5.16,4.21s-5.15-1.9-5.15-4.21V4.21ZM73.93,71.34h-24V62.65h7.55V44.82l-8.61.65V36.78L60.32,34H68.9v28.7h5v8.69ZM29.67,4.21C29.67,1.87,32,0,34.83,0S40,1.91,40,4.21v18.5c0,2.34-2.3,4.21-5.16,4.21s-5.16-1.9-5.16-4.21V4.21ZM6.76,111.3a2.66,2.66,0,0,0,.76,1.87,2.56,2.56,0,0,0,1.87.75h104a2.65,2.65,0,0,0,1.86-.75,2.56,2.56,0,0,0,.75-1.87v-91a2.56,2.56,0,0,0-2.57-2.58h-8.33c-1.59,0-2.86-2.35-2.86-3.94a2.85,2.85,0,0,1,2.86-2.86h9.41a8.4,8.4,0,0,1,8.34,8.34v93.2a8.38,8.38,0,0,1-8.34,8.34H8.34a8.28,8.28,0,0,1-5.88-2.45A8.37,8.37,0,0,1,0,112.42V19.22a8.29,8.29,0,0,1,2.46-5.88,8.35,8.35,0,0,1,5.88-2.46H18.43a2.85,2.85,0,0,1,2.86,2.86c0,1.59-1.27,3.94-2.86,3.94h-9a2.69,2.69,0,0,0-1.87.75A2.59,2.59,0,0,0,6.8,20.3c0,28.81,0,62.06,0,91ZM51.55,17.64c-1.59,0-2.86-2.35-2.86-3.94a2.85,2.85,0,0,1,2.86-2.86H70.77a2.84,2.84,0,0,1,2.85,2.86c0,1.59-1.26,3.94-2.85,3.94Z"
                />
              </svg>
              <div className="w-full text-lg font-semibold">1 week</div>
              <div className="w-full text-sm">
                Get Reminded one week before the contenst
              </div>
            </div>
          </label>
        </li>
      </ul>
    </>
  );
}

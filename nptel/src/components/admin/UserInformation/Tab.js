import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StudentUserDataForm from "./StudentUserDataForm";
import TeacherUserDataForm from "./TeacherUserDataForm";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='pt-16 flex flex-col gap-4' >
      <div className="m-2">
        <Box className="w-full">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Student" />
            <Tab label="Teacher" />
          </Tabs>
        </Box>
      </div>
      <div>
        {value === 0 && <StudentUserDataForm />}
        {value === 1 && <TeacherUserDataForm />}
      </div>
    </div>
  );
}

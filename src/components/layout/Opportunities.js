import React from "react";
import { Table } from "fundamental-react/Table";
import { Menu } from "fundamental-react/Menu";
import { Button } from "fundamental-react/Button";
import { Popover } from "fundamental-react/Popover";
import { Avatar } from "fundamental-react/Avatar";
import { Checkbox } from 'fundamental-react/Forms';

const Opportunities = () => {

   return (
      <Table
         headers={[
            <Checkbox />,
            "Avatar",
            "email",
            "First Name",
            "Last Name",
            "Date",
            " ",
         ]}
         tableData={[
            {
               rowData: [
                  <Checkbox
                     checked={true}
                     name="User"
                     onChange={function S() {}}
                  />,
                  <Avatar
                     photo="https://robohash.org/green?size=50x50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     user.name@test.com
                  </a>,
                  "First Name",
                  "Last Name",
                  "01/26/17",
                  <Popover
                     body={
                        <Menu>
                           <Menu.List>
                              <Menu.Item url="#">Option 1</Menu.Item>
                              <Menu.Item url="#">Option 2</Menu.Item>
                              <Menu.Item url="#">Option 3</Menu.Item>
                              <Menu.Item url="#">Option 4</Menu.Item>
                           </Menu.List>
                        </Menu>
                     }
                     control={
                        <Button glyph="vertical-grip" option="transparent" />
                     }
                     placement="bottom-end"
                     popperProps={{}}
                  />,
               ],
            },
            {
               rowData: [
                  <Checkbox
                     checked={undefined}
                     name="Florence"
                     onChange={function S() {}}
                  />,
                  <Avatar
                     photo="https://robohash.org/brown?size=50x50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     florence.garcia@qwerty.io
                  </a>,
                  "First Name",
                  "Last Name",
                  "01/26/17",
                  <Popover
                     body={
                        <Menu>
                           <Menu.List>
                              <Menu.Item url="#">Option 1</Menu.Item>
                              <Menu.Item url="#">Option 2</Menu.Item>
                              <Menu.Item url="#">Option 3</Menu.Item>
                              <Menu.Item url="#">Option 4</Menu.Item>
                           </Menu.List>
                        </Menu>
                     }
                     control={
                        <Button glyph="vertical-grip" option="transparent" />
                     }
                     placement="bottom-end"
                     popperProps={{}}
                  />,
               ],
            },
            {
               rowData: [
                  <Checkbox
                     checked={undefined}
                     name="Mark"
                     onChange={function S() {}}
                  />,
                  <Avatar
                     photo="https://robohash.org/Q27.png?set=set1&size=50x50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     mark.helper@qwerty.io
                  </a>,
                  "First Name",
                  "Last Name",
                  "01/26/17",
                  <Popover
                     body={
                        <Menu>
                           <Menu.List>
                              <Menu.Item url="#">Option 1</Menu.Item>
                              <Menu.Item url="#">Option 2</Menu.Item>
                              <Menu.Item url="#">Option 3</Menu.Item>
                              <Menu.Item url="#">Option 4</Menu.Item>
                           </Menu.List>
                        </Menu>
                     }
                     control={
                        <Button glyph="vertical-grip" option="transparent" />
                     }
                     placement="bottom-end"
                     popperProps={{}}
                  />,
               ],
            },
            {
               rowData: [
                  <Checkbox
                     checked={undefined}
                     name="Jenna"
                     onChange={function S() {}}
                  />,
                  <Avatar
                     photo="https://robohash.org/water?&size=50x50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     jenna@qwerty.io
                  </a>,
                  "First Name",
                  "Last Name",
                  "01/26/17",
                  <Popover
                     body={
                        <Menu>
                           <Menu.List>
                              <Menu.Item url="#">Option 1</Menu.Item>
                              <Menu.Item url="#">Option 2</Menu.Item>
                              <Menu.Item url="#">Option 3</Menu.Item>
                              <Menu.Item url="#">Option 4</Menu.Item>
                           </Menu.List>
                        </Menu>
                     }
                     control={
                        <Button glyph="vertical-grip" option="transparent" />
                     }
                     placement="bottom-end"
                     popperProps={{}}
                  />,
               ],
            },
         ]}
      />
   );
};

export default Opportunities;

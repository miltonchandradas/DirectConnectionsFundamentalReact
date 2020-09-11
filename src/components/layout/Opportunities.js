import React from "react";
import { Table } from "fundamental-react/lib/Table";
import { Link } from "fundamental-react/lib/Link";
import { Menu } from "fundamental-react/lib/Menu";
import { Button } from "fundamental-react/lib/Button";
import { Popover } from "fundamental-react/lib/Popover";
import { Avatar } from "fundamental-react/lib/Avatar";
import { Checkbox } from "fundamental-react/lib/Forms";

const Opportunities = () => {
   return (
      <Table
         style={{
            marginTop: "10px",
            border: "1px solid green",
            tableLayout: "auto",
         }}
         headers={[
            <Checkbox />,
            <Link subtle>Avatar</Link>,
            <Link subtle>Email</Link>,
            <Link subtle>First Name</Link>,
            <Link subtle>Last Name</Link>,
            <Link subtle>Date</Link>,
            <Link subtle>More</Link>,
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
                     backgroundImageUrl="https://picsum.photos/id/1000/50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     milton@live.com
                  </a>,
                  "Milton",
                  "Chandradas",
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
                     checked={false}
                     name="Florence"
                     onChange={function S() {}}
                  />,
                  <Avatar
                     backgroundImageUrl="https://picsum.photos/id/1001/50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     rachel@live.com
                  </a>,
                  "Rachel",
                  "Clemens",
                  "08/26/20",
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
                     checked={false}
                     name="Mark"
                     onChange={function S() {}}
                  />,
                  <Avatar
                     backgroundImageUrl="https://picsum.photos/id/1002/50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     gurudatt@live.com
                  </a>,
                  "Gurudatt",
                  "Kashyap",
                  "09/01/19",
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
                     checked={false}
                     name="Jenna"
                     onChange={function S() {}}
                  />,
                  <Avatar
                     backgroundImageUrl="https://picsum.photos/id/1003/50"
                     size="m"
                  />,
                  <a className="fd-has-font-weight-semi" href="#!">
                     evan@live.com
                  </a>,
                  "Evan",
                  "Schiele",
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

import React from "react";
import { Tile } from "fundamental-react/Tile";
import { LayoutGrid } from "fundamental-react/LayoutGrid";

const MyDashboard = () => {
   return (
      <div className="mydashboard">
         <LayoutGrid>
            <Tile active onClick={() => {}}>
               <Tile.Content title="Tile Title">
                  <p>Tile Description</p>
               </Tile.Content>
            </Tile>
         </LayoutGrid>
      </div>
   );
};

export default MyDashboard;

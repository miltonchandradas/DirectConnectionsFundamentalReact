import React from "react";
import { LayoutGrid } from "fundamental-react/LayoutGrid";

import AddressMap from "../maps/AddressMap";

const MyLocation = () => {
   return (
      <div>
         <LayoutGrid>
            <AddressMap />
         </LayoutGrid>
      </div>
   );
};

export default MyLocation;

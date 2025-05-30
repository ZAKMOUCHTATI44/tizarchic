import { Box } from "lucide-react";
import React from "react";

const TopBar = () => {
  return (
    <div className="bg-main py-3 text-white text-sm text-center font-semibold px-5 flex items-center gap-3 justify-center">
      <span>
        <Box className="h-5 w-5" />
      </span>
      {`Livraison partout au Maroc!`}
    </div>
  );
};

export default TopBar;

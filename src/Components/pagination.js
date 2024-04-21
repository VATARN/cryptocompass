import React from "react";
import "../CSS/pagination.css";

import Pagination from "@mui/material/Pagination";

export default function PaginationControlled({ page, handlePageChange, count }) {
  return (
    <div className="pagination-div">
      <Pagination
        sx={{
          "& .MuiPaginationItem-text": {
            color: "var(--blue) !important",
            border: "1px solid var(--grey)",
          },
          "& .MuiPaginationItem-text:hover": {
            backgroundColor: "transparent !important",
          },
          "& .Mui-selected  ": {
            backgroundColor: "var(--white)",
            borderColor: "var(--blue)",
          },
          "& .MuiPaginationItem-ellipsis": {
            border: "none",
          },
        }}
        count={count}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
}

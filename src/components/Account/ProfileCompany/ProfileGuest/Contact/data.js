import React from "react";
import IntlMessages from "util/IntlMessages";

export const ticketList = [
  {
    id: 2,
    avatar: "https://via.placeholder.com/150x150",
    name: "Trần Thị B",
    job: [
      <span key={14} className="gx-link">
        <IntlMessages id="seller" />
      </span>
    ],
    status: 1
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/150x150",
    name: "Lê Anh C",
    job: [
      <span key={15} className="gx-link">
        <IntlMessages id="manager" />
      </span>
    ],
    status: 4
  },
  {
    id: 4,
    avatar: "https://via.placeholder.com/150x150",
    name: "Nguyễn Thanh Tùng",
    job: [
      <span key={16} className="gx-link">
        <IntlMessages id="manager" />
      </span>
    ],
    status: 4
  }
];

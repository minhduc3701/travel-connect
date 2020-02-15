import React from "react";
import {Avatar} from "antd";

import CallContact from "./CallContact";

const TicketItem = ({data}) => {

  const {id, name, avatar, job} = data;
  return (
    <div key={"TicketItem" + id} className="gx-media gx-task-list-item gx-flex-nowrap pos-rel">
      <Avatar className="gx-size-36" src={avatar}/>
      <div className="gx-media-body gx-task-item-content">
        <div className="box p-l-3">
          <h5 className="gx-text-truncate gx-task-item-title">{name}</h5>
          <p key={id} className="gx-text-grey gx-fs-sm gx-mb-0">{job}</p>
        </div>
        <div className="pos-abs TicketItem-Contact">
          <CallContact/>
        </div>
      </div>
    </div>

  );
};

export default TicketItem;

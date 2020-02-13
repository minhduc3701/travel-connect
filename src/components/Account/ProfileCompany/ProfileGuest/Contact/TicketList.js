import React from "react";
import WidgetHeader from "components/WidgetHeader";
import { ticketList } from "./data";
import TicketItem from "./TicketItem";
import IntlMessages from "util/IntlMessages";

class TicketList extends React.Component {
  render() {
    return (
      <div className="block-w">
        <WidgetHeader title={<IntlMessages id="company.contact" />} />
        <div className="p-t-3 m-b-4">
          {ticketList.length < 1 ? (
            <p className="gx-font-weight-light">
              <i className="icon icon-sweet-alert"></i>{" "}
              {<IntlMessages id="guide.company.contact" />}{" "}
              <b>B2B Marketplace</b> >{" "}
              <b>{<IntlMessages id="sidebar.home.membermanagement" />}</b>{" "}
            </p>
          ) : (
            ticketList.map((ticket, index) => (
              <TicketItem key={index} data={ticket} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default TicketList;

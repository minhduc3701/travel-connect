import React from "react";
import ActivitiesList from "./ActivitiesList";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

import IntlMessage from "util/IntlMessages";
const activitiesData = [
  {
    id: 1,
    day: "Today",
    tasks: [
      {
        id: 1,
        name: "Mila Alba",
        title: [
          <span className="gx-link" key={1}>
            Mila Alba
          </span>,
          " left a 5 star review on ",
          <span className="gx-link" key={2}>
            Albama’s House
          </span>
        ],
        avatar: "https://via.placeholder.com/150x150",
        imageList: []
      },
      {
        id: 2,
        name: "Bob Builder",
        title: [
          "Callback request from ",
          <span key={3} className="gx-link">
            Bob Builder
          </span>,
          " for the property ",
          <span className="gx-link" key={4}>
            Dimitri House
          </span>
        ],
        avatar: "https://via.placeholder.com/150x150",
        imageList: []
      },
      {
        id: 3,
        name: "Tom Moody",
        title: [
          "Congratulations to ",
          <span key={5} className="gx-link">
            Tom Moody
          </span>,
          " for joining 10+ club "
        ],
        avatar: "https://via.placeholder.com/150x150",
        imageList: []
      },
      {
        id: 4,
        name: "Norman Dolphi",
        title: ["Norman Dolphi is looking for a house in New Jersy, USA"],
        avatar: "",
        imageList: []
      }
    ]
  },
  {
    id: 2,
    day: "Yesterday",
    tasks: [
      {
        id: 5,
        name: "Kily Johns",
        title: [
          "Agent ",
          <span key={6} className="gx-link">
            Kily Johns
          </span>,
          " has added 7 new photos to the property ",
          <span key={7} className="gx-link">
            Albama’s House
          </span>
        ],
        avatar: "",
        imageList: [
          "https://via.placeholder.com/150x150",
          "https://via.placeholder.com/150x150",
          "https://via.placeholder.com/150x150"
        ]
      },
      {
        id: 6,
        name: "Tom Moody",
        title: [
          "Welcome to a new agent ",
          <span className="gx-link" key={8}>
            Tom Moody in the Company
          </span>
        ],
        avatar: "https://via.placeholder.com/150x150",
        imageList: []
      },
      {
        id: 7,
        name: "Oliver Shorter",
        title: [
          <span key={9} className="gx-link">
            Oliver Shorter
          </span>,
          " is looking for an office space in ",
          <span key={10} className="gx-link">
            Colorado, USA
          </span>
        ],
        avatar: "https://via.placeholder.com/150x150",
        imageList: []
      }
    ]
  }
];

class HistoryActivities extends React.Component {
  render() {
    return (
      <div className="block-w">
        <WidgetHeader title={<IntlMessage id="memberActivitiesLog" />} />
        <ActivitiesList recentList={activitiesData} />
      </div>
    );
  }
}
export default HistoryActivities;

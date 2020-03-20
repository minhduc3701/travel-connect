import React from "react";
import SimpleLineChart from "./Components/SimpleLineChart";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";
import IntlMessages from "util/IntlMessages";
const Statistic = ({ match }) => {
  return (
    <div className="block_shadow">
      <WidgetHeader
        title={
          <div>
            <span>
              <IntlMessages id="analysis" /> <IntlMessages id="sellData" />{" "}
            </span>
            <span className="size-1 gx-post-designation">
              ( <IntlMessages id="today" /> {new Date().toLocaleDateString()} )
            </span>
          </div>
        }
      />
      <p>
        <IntlMessages id="overviewDataOfQuotes" />{" "}
        <span className="size-2 gx-post-designation">
          (<IntlMessages id="numberOfRequest" />/ <IntlMessages id="time" />)
        </span>
      </p>
      <SimpleLineChart />
    </div>
  );
};

export default Statistic;

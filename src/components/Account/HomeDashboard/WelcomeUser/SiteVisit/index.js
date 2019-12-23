import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import IntlMessages from "util/IntlMessages";
const siteVisit = [
  { name: "1/10/2019", request: 0, success: 0 },
  { name: "2/10/2019", request: 0, success: 1 },
  { name: "3/10/2019", request: 5, success: 2 },
  { name: "4/10/2019", request: 10, success: 0 },
  { name: "5/10/2019", request: 4, success: 1 },
  { name: "6/10/2019", request: 16, success: 3 },
  { name: "7/10/2019", request: 5, success: 1 },
  { name: "8/10/2019", request: 11, success: 5 },
  { name: "9/10/2019", request: 6, success: 2 },
  { name: "10/10/2019", request: 11, success: 3 },
  { name: "11/10/2019", request: 30, success: 2 },
  { name: "12/10/2019", request: 10, success: 1 },
  { name: "13/10/2019", request: 13, success: 0 },
  { name: "14/10/2019", request: 4, success: 2 },
  { name: "15/10/2019", request: 3, success: 8 },
  { name: "16/10/2019", request: 1, success: 0 },
  { name: "17/10/2019", request: 0, success: 0 }
];

const SiteVisit = () => (
  <div className="gx-site-dash gx-pr-xl-5 gx-pt-3 gx-pt-xl-0 gx-pt-xl-2">
    <h6 className="gx-text-uppercase gx-mb-2 gx-mb-xl-4">
      <IntlMessages id="interact" />
    </h6>
    <ResponsiveContainer width="100%" height={140}>
      <AreaChart
        data={siteVisit}
        margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
      >
        <Tooltip />
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey="request"
          fillOpacity={1}
          stroke="#038FDE"
          fill="#038FDE"
        />
        <Area
          type="monotone"
          dataKey="success"
          fillOpacity={1}
          stroke="#FE9E15"
          fill="#FE9E15"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default SiteVisit;

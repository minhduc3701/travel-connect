import React from "react";
import ChartCard from "components/GlobalComponent/Crypto/ChartCard";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

class HightLightItem extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <ChartCard
        chartProperties={this.props.chartPropertiesSeed}
        children={
          <ResponsiveContainer width="100%" height={75}>
            <AreaChart
              data={this.props.dataList}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Tooltip />
              <Area
                dataKey={this.props.bind_dataKey}
                type={this.props.bind_type}
                strokeWidth={0}
                stackId="2"
                stroke={this.props.bind_stroke}
                fill={this.props.bind_fill}
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        }
      />
    );
  }
}
export default HightLightItem;

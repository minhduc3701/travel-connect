import React from "react";
import {Carousel} from "antd";
import {greenStepList} from "./data"
import GreenStepItem from "./GreenStepItem";
import "./index.less";

class ScrollAutomatically extends React.Component{
  render() {
  return (
      <div>
        {
          this.props.type === 0 ?
            <Carousel autoplay>
              {
                 greenStepList.map((data, index) =>
                   <GreenStepItem key={index} data={data}/>
                 )
              }
            </Carousel>
          :
          <div>
            {
              greenStepList.map((data, index) =>
              index === this.props.type - 1 ? 
                <GreenStepItem key={index} data={data}/>
              : null
              )
            }
          </div>

        }
      </div>
   
  );
      }
};

export default ScrollAutomatically;

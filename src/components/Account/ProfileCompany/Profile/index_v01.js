import React, { Component } from "react";
import { Col, Row } from "antd";
import About from "../../../../components/profile/About";
import Biography from "../../../../components/profile/Biography";
// import Events from "../../../../components/profile/Events";
import Rating from "./Rating";
// import Communities from "components/profile/Communities";
import { friendList } from "./data";
import Friends from "../../../../components/profile/Friends/index";
import Auxiliary from "../../../../util/Auxiliary";
import ProfileHeader from "../../../../components/profile/ProfileHeader";

// import SaleData from "../../../../components/profile/statistic";
import SaleData2 from "./SaleData2/SaleData2";
import PropertiesCard from "./PropertiesItemCard/PropertiesCard";
import TicketList from "./Contact/TicketList";

class Profile extends Component {
  render() {
    return (
      <Auxiliary>
        <ProfileHeader />
        <div className="gx-profile-content">
          <Row className="m-h-0-xs-i" style={{ margin: "auto" }}>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              <About />
              <Biography />
              <Rating />
              <PropertiesCard />
              {/* <SaleData2 /> */}
            </Col>
            <Col xl={8} lg={10} md={10} sm={24} xs={24}>
              <div className="p-b-1">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                    <TicketList />
                  </Col>
                  <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                    <SaleData2 />
                  </Col>
                  <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                    <Friends friendList={friendList} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}

export default Profile;
// import React, { Component } from "react";
// import { Col, Row } from "antd";
// import About from "../../../../components/profile/About";
// import Biography from "../../../../components/profile/Biography";
// // import Events from "../../../../components/profile/Events";
// import Rating from "./Rating";

// import { friendList } from "./data";
// import Friends from "../../../../components/profile/Friends/index";
// import Auxiliary from "../../../../util/Auxiliary";
// import ProfileHeader from "../../../../components/profile/ProfileHeader";

// import SaleData from "../../../../components/profile/statistic";
// import PropertiesCard from "./PropertiesItemCard/PropertiesCard";
// import TicketList from "./Contact/TicketList";
// import Hotels from "./Hotels/Hotels";

// class Profile extends Component {
//   render() {
//     return (
//       <Auxiliary>
//         <ProfileHeader />
//         <div className="gx-profile-content">
//           <Row className="m-h-0-xs-i">
//             <Col xl={16} lg={14} md={14} sm={24} xs={24}>
//               <About />
//               <Rating />
//               <PropertiesCard />
//               <SaleData />
//             </Col>
//             <Col xl={8} lg={10} md={10} sm={24} xs={24}>
//               <Row>
//                 <Col xl={24} lg={24} md={24} sm={12} xs={24}>
//                   <TicketList />
//                 </Col>
//                 <Col xl={24} lg={24} md={24} sm={12} xs={24}>
//                   <Hotels />
//                 </Col>
//                 <Col xl={24} lg={24} md={24} sm={12} xs={24}>
//                   <Biography />
//                 </Col>
//                 <Col xl={24} lg={24} md={24} sm={12} xs={24}>
//                   <Friends friendList={friendList} />
//                 </Col>
//                 {/* <Col xl={24} lg={24} md={24} sm={12} xs={24}>
//                   <SaleData />
//                 </Col> */}
//               </Row>
//             </Col>
//           </Row>
//         </div>
//       </Auxiliary>
//     );
//   }
// }

// export default Profile;

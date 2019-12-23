import React from "react";
import WidgetHeader from "components/GlobalComponent/WidgetHeader";

// import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
import doneChange from "util/Notification";
// import Avatar from "../../../Step/SubComponent/Avatar";
import {
  Tooltip,
  Button,
  DatePicker,
  Input,
  Row,
  Avatar,
  Col,
  Upload
} from "antd";

const { TextArea } = Input;

class Basic extends React.Component {
  state = {
    tel: false,
    address: false,
    zip: false,
    gendar: false,
    website: false
  };
  changeTelToEdit = () => {
    if (this.state.tel === true) {
      doneChange();
      this.setState({ tel: false });
    }
    if (this.state.tel === false) this.setState({ tel: true });
  };
  changeAddressToEdit = () => {
    if (this.state.address === true) {
      doneChange();
      this.setState({ address: false });
    }
    if (this.state.address === false) this.setState({ address: true });
  };
  changeZipToEdit = () => {
    if (this.state.zip === true) {
      doneChange();
      this.setState({ zip: false });
    }
    if (this.state.zip === false) this.setState({ zip: true });
  };
  changeGendarToEdit = () => {
    if (this.state.gendar === true) this.setState({ gendar: false });
    if (this.state.gendar === false) this.setState({ gendar: true });
  };
  changeWebsiteToEdit = () => {
    if (this.state.website === true) this.setState({ website: false });
    if (this.state.website === false) this.setState({ website: true });
  };

  render() {
    return (
      <div className="step-card">
        <WidgetHeader
          styleName="gx-flex-row"
          title={<IntlMessages id="generalCompanyInfo" />}
        />
        <div
          className="block"
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          {/* logo */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="step.information.logo" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  <Avatar
                    src="https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/3248c39aeeb0c362ff80d79ee447176c88ee24ca/sys/avatar/27/80/1558413837_XFSzyOpv.jpg"
                    style={{ width: 100, height: 100 }}
                  />
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Upload>
                    <Button type="primary" style={{ width: 96 }}>
                      <IntlMessages id="change" />
                    </Button>
                  </Upload>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* background */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="backGround" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  <img
                    src="http://rhinobooksnashville.com/wp-content/uploads/2019/06/30459708568_7b45f32c1c_o.jpg"
                    width={250}
                    height={100}
                    alt="anhnen"
                  />
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Upload>
                    <Button type="primary" style={{ width: 96 }}>
                      <IntlMessages id="change" />
                    </Button>
                  </Upload>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* establishdate */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                <IntlMessages id="establishdate" />
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.tel === false ? (
                    <p className="m-b-0-i">19/11/1997</p>
                  ) : (
                    <Tooltip title="Chỉnh sửa ngày thành lập của doanh nghiệp">
                      <DatePicker className="gx-w-100" />
                    </Tooltip>
                  )}
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Button
                    className="m-b-0-i "
                    type="primary"
                    style={{ width: 96 }}
                    onClick={() => this.changeTelToEdit()}
                  >
                    {this.state.tel === false ? (
                      <IntlMessages id="edit" />
                    ) : (
                      <IntlMessages id="done" />
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Market */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="step.information.market" />}
              </p>
            </Col>
            <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.address === false ? (
                    <div>
                      <p className="m-b-0-i">Du lịch</p>
                    </div>
                  ) : (
                    <Input defaultValue="Du lịch" />
                  )}
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Button
                    className="m-b-0-i "
                    type="primary"
                    style={{ width: 96 }}
                    onClick={() => this.changeAddressToEdit()}
                  >
                    {this.state.address === false ? (
                      <IntlMessages id="edit" />
                    ) : (
                      <IntlMessages id="done" />
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* introduction */}
          <Row className="m-b-3 align-items-center">
            <Col xs={24} sm={24} md={6} lg={4} xl={4}>
              <p className="text-align-right p-r-5-i">
                {<IntlMessages id="company.introduction" />}
              </p>
            </Col>
            <Col xs={24} sm={24} md={18} lg={20} xl={20}>
              <Row className="m-b-3-i align-items-center">
                <Col xs={18} sm={18} md={18} lg={20} xl={20}>
                  {this.state.zip === false ? (
                    <p className="m-b-0-i">
                      SỨ MỆNH Mang lại cảm xúc thăng hoa cho du khách trong mỗi
                      hành trình - Đây là mục tiêu và là sứ mệnh Travel Connect
                      cam kết và nỗ lực mang lại cho du khách. Travel Connect
                      trở thành người bạn đồng hành cùng du khách trong mọi hành
                      trình du lịch và tạo ra những giá trị tốt đẹp. Tại Travel
                      Connect, du lịch không những là hành trình khám phá mà còn
                      là hành trình sẻ chia, thể hiện dấu ấn khác biệt của
                      Thương hiệu Travel Connect từ 3 thuộc tính thương hiệu: Sự
                      chuyên nghiệp, mang lại cảm xúc thăng hoa cho khách hàng
                      và những giá trị gia tăng hấp dẫn cho du khách sau mỗi
                      chuyến đi. TRIẾT LÝ KINH DOANH Khách hàng là trung tâm:
                      Travel Connect luôn khẳng định khách hàng là trung tâm của
                      mọi hoạt động kinh doanh mà Travel Connect hướng đến, vì
                      khách hàng là người góp phần to lớn xây dựng nên thương
                      hiệu Travel Connect.
                    </p>
                  ) : (
                    <Tooltip title="Chỉnh sửa thông tin giới thiệu của doanh nghiệp">
                      <TextArea
                        rows={6}
                        maxLength={1000}
                        defaultValue="SỨ MỆNH Mang lại cảm xúc thăng hoa cho du khách trong mỗi
                        hành trình - Đây là mục tiêu và là sứ mệnh Travel Connect
                        cam kết và nỗ lực mang lại cho du khách. Travel Connect
                        trở thành người bạn đồng hành cùng du khách trong mọi hành
                        trình du lịch và tạo ra những giá trị tốt đẹp. Tại Travel
                        Connect, du lịch không những là hành trình khám phá mà còn
                        là hành trình sẻ chia, thể hiện dấu ấn khác biệt của
                        Thương hiệu Travel Connect từ 3 thuộc tính thương hiệu: Sự
                        chuyên nghiệp, mang lại cảm xúc thăng hoa cho khách hàng
                        và những giá trị gia tăng hấp dẫn cho du khách sau mỗi
                        chuyến đi. TRIẾT LÝ KINH DOANH Khách hàng là trung tâm:
                        Travel Connect luôn khẳng định khách hàng là trung tâm của
                        mọi hoạt động kinh doanh mà Travel Connect hướng đến, vì
                        khách hàng là người góp phần to lớn xây dựng nên thương
                        hiệu Travel Connect."
                      />
                    </Tooltip>
                  )}
                </Col>
                <Col
                  className="text-align-center"
                  xs={6}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Button
                    className="m-b-0-i "
                    type="primary"
                    style={{ width: 96 }}
                    onClick={() => this.changeZipToEdit()}
                  >
                    {this.state.zip === false ? (
                      <IntlMessages id="edit" />
                    ) : (
                      <IntlMessages id="done" />
                    )}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Basic;
// import React from "react";
// import WidgetHeader from "components/WidgetHeader/index";
// import Widget from "components/Widget/index";
// import IntlMessages from "util/IntlMessages";
// import doneChange from "util/Notification";
// // import Avatar from "../../../Step/SubComponent/Avatar";
// import {
//   Tooltip,
//   Button,
//   DatePicker,
//   Input,
//   Row,
//   Avatar,
//   Col,
//   Upload
// } from "antd";

// const { TextArea } = Input;

// class Basic extends React.Component {
//   state = {
//     tel: false,
//     address: false,
//     zip: false,
//     gendar: false,
//     website: false
//   };
//   changeTelToEdit = () => {
//     if (this.state.tel === true) {
//       doneChange();
//       this.setState({ tel: false });
//     }
//     if (this.state.tel === false) this.setState({ tel: true });
//   };
//   changeAddressToEdit = () => {
//     if (this.state.address === true) {
//       doneChange();
//       this.setState({ address: false });
//     }
//     if (this.state.address === false) this.setState({ address: true });
//   };
//   changeZipToEdit = () => {
//     if (this.state.zip === true) {
//       doneChange();
//       this.setState({ zip: false });
//     }
//     if (this.state.zip === false) this.setState({ zip: true });
//   };
//   changeGendarToEdit = () => {
//     if (this.state.gendar === true) this.setState({ gendar: false });
//     if (this.state.gendar === false) this.setState({ gendar: true });
//   };
//   changeWebsiteToEdit = () => {
//     if (this.state.website === true) this.setState({ website: false });
//     if (this.state.website === false) this.setState({ website: true });
//   };

//   render() {
//     return (
//       <div className="step-card">
//         <WidgetHeader
//           styleName="gx-flex-row"
//           title={<IntlMessages id="generalCompanyInfo" />}
//         />
//         <Widget styleName="gx-card">
//           {/* logo */}
//           <Row className="m-b-3 align-items-center">
//             <Col xs={24} sm={24} md={6} lg={4} xl={4}>
//               <p className="text-align-right p-r-5-i">
//                 {<IntlMessages id="step.information.logo" />}
//               </p>
//             </Col>
//             <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
//               <Row className="m-b-3-i align-items-center">
//                 <Col xs={18} sm={18} md={18} lg={20} xl={20}>
//                   <Avatar
//                     src="https://travel-connect.s3.ap-southeast-1.amazonaws.com/public/c/3248c39aeeb0c362ff80d79ee447176c88ee24ca/sys/avatar/27/80/1558413837_XFSzyOpv.jpg"
//                     style={{ width: 100, height: 100 }}
//                   />
//                 </Col>
//                 <Col
//                   className="text-align-center"
//                   xs={6}
//                   sm={6}
//                   md={6}
//                   lg={4}
//                   xl={4}
//                 >
//                   <Upload>
//                     <span className="gx-link">
//                       <IntlMessages id="change" />
//                     </span>
//                   </Upload>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>

//           {/* background */}
//           <Row className="m-b-3 align-items-center">
//             <Col xs={24} sm={24} md={6} lg={4} xl={4}>
//               <p className="text-align-right p-r-5-i">
//                 {<IntlMessages id="backGround" />}
//               </p>
//             </Col>
//             <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
//               <Row className="m-b-3-i align-items-center">
//                 <Col xs={18} sm={18} md={18} lg={20} xl={20}>
//                   <img
//                     src="http://rhinobooksnashville.com/wp-content/uploads/2019/06/30459708568_7b45f32c1c_o.jpg"
//                     width={250}
//                     height={100}
//                     alt="anhnen"
//                   />
//                 </Col>
//                 <Col
//                   className="text-align-center"
//                   xs={6}
//                   sm={6}
//                   md={6}
//                   lg={4}
//                   xl={4}
//                 >
//                   <Upload>
//                     <span className="gx-link">
//                       <IntlMessages id="change" />
//                     </span>
//                   </Upload>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>

//           {/* establishdate */}
//           <Row className="m-b-3 align-items-center">
//             <Col xs={24} sm={24} md={6} lg={4} xl={4}>
//               <p className="text-align-right p-r-5-i">
//                 <IntlMessages id="establishdate" />
//               </p>
//             </Col>
//             <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
//               <Row className="m-b-3-i align-items-center">
//                 <Col xs={18} sm={18} md={18} lg={20} xl={20}>
//                   {this.state.tel === false ? (
//                     <p className="m-b-0-i">19/11/1997</p>
//                   ) : (
//                     <Tooltip title="Chỉnh sửa ngày thành lập của doanh nghiệp">
//                       <DatePicker className="gx-w-100" />
//                     </Tooltip>
//                   )}
//                 </Col>
//                 <Col
//                   className="text-align-center"
//                   xs={6}
//                   sm={6}
//                   md={6}
//                   lg={4}
//                   xl={4}
//                 >
//                   <Button
//                     className="m-b-0-i remove-ant-btn-height"
//                     type="link"
//                     onClick={() => this.changeTelToEdit()}
//                   >
//                     {this.state.tel === false ? (
//                       <IntlMessages id="edit" />
//                     ) : (
//                       <IntlMessages id="done" />
//                     )}
//                   </Button>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>

//           {/* Market */}
//           <Row className="m-b-3 align-items-center">
//             <Col xs={24} sm={24} md={6} lg={4} xl={4}>
//               <p className="text-align-right p-r-5-i">
//                 {<IntlMessages id="step.information.market" />}
//               </p>
//             </Col>
//             <Col className="bor-b" xs={24} sm={24} md={18} lg={20} xl={20}>
//               <Row className="m-b-3-i align-items-center">
//                 <Col xs={18} sm={18} md={18} lg={20} xl={20}>
//                   {this.state.address === false ? (
//                     <div>
//                       <p className="m-b-0-i">Du lịch</p>
//                     </div>
//                   ) : (
//                     <Input defaultValue="Du lịch" />
//                   )}
//                 </Col>
//                 <Col
//                   className="text-align-center"
//                   xs={6}
//                   sm={6}
//                   md={6}
//                   lg={4}
//                   xl={4}
//                 >
//                   <Button
//                     className="m-b-0-i remove-ant-btn-height"
//                     type="link"
//                     onClick={() => this.changeAddressToEdit()}
//                   >
//                     {this.state.address === false ? (
//                       <IntlMessages id="edit" />
//                     ) : (
//                       <IntlMessages id="done" />
//                     )}
//                   </Button>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>

//           {/* introduction */}
//           <Row className="m-b-3 align-items-center">
//             <Col xs={24} sm={24} md={6} lg={4} xl={4}>
//               <p className="text-align-right p-r-5-i">
//                 {<IntlMessages id="company.introduction" />}
//               </p>
//             </Col>
//             <Col xs={24} sm={24} md={18} lg={20} xl={20}>
//               <Row className="m-b-3-i align-items-center">
//                 <Col xs={18} sm={18} md={18} lg={20} xl={20}>
//                   {this.state.zip === false ? (
//                     <p className="m-b-0-i">
//                       SỨ MỆNH Mang lại cảm xúc thăng hoa cho du khách trong mỗi
//                       hành trình - Đây là mục tiêu và là sứ mệnh Travel Connect
//                       cam kết và nỗ lực mang lại cho du khách. Travel Connect
//                       trở thành người bạn đồng hành cùng du khách trong mọi hành
//                       trình du lịch và tạo ra những giá trị tốt đẹp. Tại Travel
//                       Connect, du lịch không những là hành trình khám phá mà còn
//                       là hành trình sẻ chia, thể hiện dấu ấn khác biệt của
//                       Thương hiệu Travel Connect từ 3 thuộc tính thương hiệu: Sự
//                       chuyên nghiệp, mang lại cảm xúc thăng hoa cho khách hàng
//                       và những giá trị gia tăng hấp dẫn cho du khách sau mỗi
//                       chuyến đi. TRIẾT LÝ KINH DOANH Khách hàng là trung tâm:
//                       Travel Connect luôn khẳng định khách hàng là trung tâm của
//                       mọi hoạt động kinh doanh mà Travel Connect hướng đến, vì
//                       khách hàng là người góp phần to lớn xây dựng nên thương
//                       hiệu Travel Connect.
//                     </p>
//                   ) : (
//                     <Tooltip title="Chỉnh sửa thông tin giới thiệu của doanh nghiệp">
//                       <TextArea
//                         rows={6}
//                         maxLength={1000}
//                         defaultValue="SỨ MỆNH Mang lại cảm xúc thăng hoa cho du khách trong mỗi
//                         hành trình - Đây là mục tiêu và là sứ mệnh Travel Connect
//                         cam kết và nỗ lực mang lại cho du khách. Travel Connect
//                         trở thành người bạn đồng hành cùng du khách trong mọi hành
//                         trình du lịch và tạo ra những giá trị tốt đẹp. Tại Travel
//                         Connect, du lịch không những là hành trình khám phá mà còn
//                         là hành trình sẻ chia, thể hiện dấu ấn khác biệt của
//                         Thương hiệu Travel Connect từ 3 thuộc tính thương hiệu: Sự
//                         chuyên nghiệp, mang lại cảm xúc thăng hoa cho khách hàng
//                         và những giá trị gia tăng hấp dẫn cho du khách sau mỗi
//                         chuyến đi. TRIẾT LÝ KINH DOANH Khách hàng là trung tâm:
//                         Travel Connect luôn khẳng định khách hàng là trung tâm của
//                         mọi hoạt động kinh doanh mà Travel Connect hướng đến, vì
//                         khách hàng là người góp phần to lớn xây dựng nên thương
//                         hiệu Travel Connect."
//                       />
//                     </Tooltip>
//                   )}
//                 </Col>
//                 <Col
//                   className="text-align-center"
//                   xs={6}
//                   sm={6}
//                   md={6}
//                   lg={4}
//                   xl={4}
//                 >
//                   <Button
//                     className="m-b-0-i remove-ant-btn-height"
//                     type="link"
//                     onClick={() => this.changeZipToEdit()}
//                   >
//                     {this.state.zip === false ? (
//                       <IntlMessages id="edit" />
//                     ) : (
//                       <IntlMessages id="done" />
//                     )}
//                   </Button>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Widget>
//       </div>
//     );
//   }
// }
// export default Basic;

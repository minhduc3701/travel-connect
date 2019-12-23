import React from "react";
import {Button} from "antd";

const InviteMember = () => {
  return (
    <div className="gx-bg-dark-primary block">
      <div className="gx-flex-row gx-justify-content-center gx-mb-3 gx-mb-md-4">
        <i className={`icon icon-refer gx-fs-xlxl gx-text-white`}/>
      </div>
      <div className="gx-text-center">
        <h2 className="h3 gx-mb-3 gx-text-white">Giới thiệu và nhận ưu đãi</h2>
        <p className="gx-text-white gx-mb-3">Giới thiệu cho đối tác của bạn sẽ giúp bạn tăng uy tín trên sàn và cùng nhau nhận ưu đãi</p>
        <Button size="large" className="gx-btn-secondary gx-mt-md-5 gx-mb-1">Mời đối tác</Button>
      </div>
    </div>
  );
};

export default InviteMember;

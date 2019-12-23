import React from "react";
import { Avatar } from "antd";

const ProductComment = () => {
  return (
    <div>
      <div className="gx-user-list bor-b">
        <Avatar
          className="gx-mr-3 gx-size-36"
          src={
            "http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
          }
        />
        <div className="gx-media-body gx-task-item-content">
          <div>
            <h5>
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </h5>
            <p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
              {[
                <span className="gx-link" key={13}>
                  Joy Parish - Bình thường
                </span>,
                "  created  15 mins ago"
              ]}
            </p>
          </div>
        </div>
      </div>
      <div className="gx-user-list bor-b">
        <Avatar
          className="gx-mr-3 gx-size-36"
          src={
            "http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
          }
        />
        <div className="gx-media-body gx-task-item-content">
          <div>
            <h5>
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </h5>
            <p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
              {[
                <span className="gx-link" key={13}>
                  Joy Parish - Tốt
                </span>,
                "  created at Nov 10 2019"
              ]}
            </p>
          </div>
        </div>
      </div>
      <div className="gx-user-list bor-b">
        <Avatar
          className="gx-mr-3 gx-size-36"
          src={
            "http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
          }
        />
        <div className="gx-media-body gx-task-item-content">
          <div>
            <h5>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </h5>
            <p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
              {[
                <span className="gx-link" key={13}>
                  Joy Parish - Tốt
                </span>,
                "  created 15 mins ago"
              ]}
            </p>
          </div>
        </div>
      </div>
      <div className="gx-user-list bor-b">
        <Avatar
          className="gx-mr-3 gx-size-36"
          src={
            "http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
          }
        />
        <div className="gx-media-body gx-task-item-content">
          <div>
            <h5>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </h5>
            <p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
              {[
                <span className="gx-link" key={13}>
                  Joy Parish - Tốt
                </span> ,
                "  created 15 mins ago"
              ]}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="gx-user-list bor-b">
            <img alt="avatar" src="http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg" className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
            <div className="gx-description">
                <h3>Domnic Harris - Tốt</h3>
                <h5>at <span className="gx-link">Aug 03 2018</span></h5>
                <p className="gx-mb-1">Wow ! Excellent I particularly like the use of whitespace here Keep it up</p>
            </div>
        </div>
        <div className="gx-user-list bor-b">
            <img alt="avatar" src="http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg" className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
            <div className="gx-description">
                <h3>Domnic Harris - Tốt</h3>
                <h5>at <span className="gx-link">Aug 03 2018</span></h5>
                <p className="gx-mb-1">Wow ! Excellent I particularly like the use of whitespace here Keep it up</p>
            </div>
        </div>
        <div className="gx-user-list bor-b">
            <img alt="avatar" src="http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg" className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
            <div className="gx-description">
                <h3>Domnic Harris - Tốt</h3>
                <h5>at <span className="gx-link">Aug 03 2018</span></h5>
                <p className="gx-mb-1">Wow ! Excellent I particularly like the use of whitespace here Keep it up</p>
            </div>
        </div>
        <div className="gx-user-list bor-b">
            <img alt="avatar" src="http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg" className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
            <div className="gx-description">
                <h3>Domnic Harris - Tốt</h3>
                <h5>at <span className="gx-link">Aug 03 2018</span></h5>
                <p className="gx-mb-1">Wow ! Excellent I particularly like the use of whitespace here Keep it up</p>
            </div>
        </div> */}
      {/* <div className="gx-user-list bor-b">
            <img alt="avatar" src="http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg" className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
            <div className="gx-description">
                <h3>Domnic Harris - Tốt</h3>
                <h5>at <span className="gx-link">Fri Aug 03 2018 08:02:47 GMT+0530 (India Standard Time)</span></h5>
                <p className="gx-mb-1">Wow ! Excellent I particularly like the use of whitespace here Keep it up</p>
            </div>
        </div>
        <div className="gx-user-list bor-b">
            <img alt="avatar" src="http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg" className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
            <div className="gx-description">
                <h3>Domnic Harris - Tốt</h3>
                <h5>at <span className="gx-link">Fri Aug 03 2018 08:02:47 GMT+0530 (India Standard Time)</span></h5>
                <p className="gx-mb-1">Wow ! Excellent I particularly like the use of whitespace here Keep it up</p>
            </div>
        </div>
        <div className="gx-user-list bor-b">
            <img alt="avatar" src="http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg" className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
            <div className="gx-description">
                <h3>Domnic Harris - Tốt</h3>
                <h5>at <span className="gx-link">Fri Aug 03 2018 08:02:47 GMT+0530 (India Standard Time)</span></h5>
                <p className="gx-mb-1">Wow ! Excellent I particularly like the use of whitespace here Keep it up</p>
            </div>
        </div> */}
    </div>
  );
};

export default ProductComment;

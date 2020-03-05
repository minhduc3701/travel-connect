import React from "react";
import { Avatar } from "antd";

const ProductComment = data => {
  return data.data === undefined || data.data.length < 1 ? (
    <div>Chưa có bình luận nào</div>
  ) : (
    <div>
      {data.data.map((item, id) => (
        <div className="gx-user-list bor-b" key={id}>
          <Avatar className="gx-mr-3 gx-size-36" src={item.companyLogo} />
          <div className="gx-media-body gx-task-item-content">
            <div>
              <h5>{item.comment}</h5>
              <p className="gx-text-grey gx-mb-0">Sản phẩm: {item.productName}</p>
              <p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
                {[
                  <span className="gx-link" key={13}>
                    {item.companyName} - {item.rate},{" "}
                    {new Date(item.commentAt).toDateString()}
                  </span>
                ]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductComment;

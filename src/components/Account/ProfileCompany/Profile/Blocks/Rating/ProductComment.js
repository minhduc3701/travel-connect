import React from "react";
import { Avatar } from "antd";

const ProductComment = props => {
  let { Account } = props;
  let cmts = props.cmt;
  let fetchCmt = Account.company_comments.slice(0, cmts);
  return (
    <div>
      {Account.company_comments
        ? fetchCmt.map((cmt, index) => {
          let dateCreated = cmt.createdAt.slice(0, 10);
          return (
            <div key={index} className="gx-user-list bor-b">
              <Avatar className="gx-mr-3 gx-size-36" src={cmt.company_logo} />
              <div className="gx-media-body gx-task-item-content">
                <div>
                  <h5>{cmt.contents}</h5>
                  <p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
                    {[
                      <span className="gx-link" key={13}>
                        {cmt.company_brandname} - {cmt.rate}
                      </span>,
                      ` ${dateCreated}`
                    ]}
                  </p>
                </div>
              </div>
            </div>
          );
        })
        : null}
    </div>
  );
};

export default ProductComment;
// import React from "react";
// import { Avatar } from "antd";

// const ProductComment = () => {
// 	return (
// 		<div>
// 			<div className="gx-user-list bor-b">
// 				<Avatar
// 					className="gx-mr-3 gx-size-36"
// 					src={
// 						"http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
// 					}
// 				/>
// 				<div className="gx-media-body gx-task-item-content">
// 					<div>
// 						<h5>
// 							Tôi thấy ứng dụng rất ok, nhưng mà tại sao lúc đầu đang sử dụng rất tốt mà về sau không hiểu sao các âm thanh bị mất hết rồi, âm thanh thông báo tin nhắn thì lúc có lúc không hoặc vài lúc nó rung, nhưng mà rung không như thế thì tôi không thể biết là có tin nhắn, tôi vào cập nhật lại cũng chẳng được...
// 						</h5>
// 						<p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
// 							{[
// 								<span className="gx-link" key={13}>
// 									Joy Parish - Bình thường
// 								</span>,
// 								"  created  15 mins ago"
// 							]}
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="gx-user-list bor-b">
// 				<Avatar
// 					className="gx-mr-3 gx-size-36"
// 					src={
// 						"http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
// 					}
// 				/>
// 				<div className="gx-media-body gx-task-item-content">
// 					<div>
// 						<h5>
// 							Thật sự càng ngày càng tệ, lúc trước khi call video thì hình ảnh của mình không bị lật ngược hay bị đảo từ trái sang phải từ phải sang trái nhưng hiện tại khi ứng dụng được cập nhật mới hơn thì tình trạng bị lật đảo khi call video này xảy ra, thật sự mình rất khó chịu mong nhà điều hành nhanh chóng ...
// 						</h5>
// 						<p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
// 							{[
// 								<span className="gx-link" key={13}>
// 									Joy Parish - Tốt
// 								</span>,
// 								"  created at Nov 10 2019"
// 							]}
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="gx-user-list bor-b">
// 				<Avatar
// 					className="gx-mr-3 gx-size-36"
// 					src={
// 						"http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
// 					}
// 				/>
// 				<div className="gx-media-body gx-task-item-content">
// 					<div>
// 						<h5>
// 							Tại sao khi bạn tôi chơi trò piano misic master thì tôi không thể chơi vì mỗi khi tôi nhấn vào thì nó lại yêu cầu cập nhật phiên bản mới nhất. Tôi đã cập nhật rất nhiều lần nhưng vẫn không chơi được. Mong app xem xét và sửa lại cho tôi
// 						</h5>
// 						<p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
// 							{[
// 								<span className="gx-link" key={13}>
// 									Joy Parish - Tốt
// 								</span>,
// 								"  created 15 mins ago"
// 							]}
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 			<div className="gx-user-list bor-b">
// 				<Avatar
// 					className="gx-mr-3 gx-size-36"
// 					src={
// 						"http://anhdepbonphuong.com/wp-content/uploads/2016/02/tai-9-hinh-anh-buon-nhat-lam-avata-9.jpg"
// 					}
// 				/>
// 				<div className="gx-media-body gx-task-item-content">
// 					<div>
// 						<h5>
// 							Mong lần cập nhật mới app sẽ cho vào cái tính năng tắt thông báo của tất cả m.n chứ không phải đi tắt thông báo tin nhắn từng người lúc t cần, chứ không không đag gọi cho ai nó cứ reo lên làm bực cả mình, hay là cho người khác mượn đt cái có người nhắn là họ bt đc chuyện riêng tư, mong app xem xét l...
// 						</h5>
// 						<p key={1} className="gx-text-grey gx-fs-sm gx-mb-0">
// 							{[
// 								<span className="gx-link" key={13}>
// 									Joy Parish - Tốt
// 								</span>,
// 								"  created 15 mins ago"
// 							]}
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductComment;

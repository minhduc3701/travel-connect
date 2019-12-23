import { notification } from "antd";

export const doneChange = () => {
  notification["success"]({
    message: "Cập nhật thành công",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification."
  });
};

export const failChange = () => {
  notification["error"]({
    message: "Hủy bỏ cập nhật",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification."
  });
};

export const notiChange = (type, mess) => {
  let typePick = type ? type : "success";

  switch (typePick) {
    case typePick === "success":
      return notification[typePick]({
        message: mess,
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });

    case typePick === "error":
      return notification[typePick]({
        message: mess,
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });

    default:
      return notification[typePick]({
        message: mess,
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });
  }
};

export default doneChange;

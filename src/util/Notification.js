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
export const notificationPop = (type, mess, desc) => {
  let typePick = type ? type : "success";

  switch (typePick) {
    case typePick === "success":
      return notification[typePick]({
        message: mess,
        description: desc
      });

    case typePick === "error":
      return notification[typePick]({
        message: mess,
        description: desc
      });

    default:
      return notification[typePick]({
        message: mess,
        description: desc
      });
  }
};
export const notiDetail = (type, mess, text) => {
  let typePick = type ? type : "success";

  switch (typePick) {
    case typePick === "success":
      return notification[typePick]({
        message: mess,
        description: text
      });

    case typePick === "error":
      return notification[typePick]({
        message: mess,
        description: text
      });

    default:
      return notification[typePick]({
        message: mess,
        description: text
      });
      return null;
  }
};

export default doneChange;

import { UPDATE_USER_PROFILE } from "../../constants/ActionTypes";
import { CallApi_USER } from "util/CallApi";
import { notiChange } from "util/Notification";

export const actUpdateUser = user => {
  return {
    type: UPDATE_USER_PROFILE,
    user
  };
};

export const actUpdateUserRequest = (user, file) => {
  let uId = JSON.parse(localStorage.getItem("user_info"));
  return dispatch => {
    return CallApi_USER(`users/${uId.user_id}`, "PUT", user)
      .then(res => {
        let dataDup = uId;
        for (const key in user) {
          for (const newKey in dataDup) {
            if (key === newKey) {
              dataDup[newKey] = user[key];
            }
          }
        }
        if (res.data) {
          localStorage.removeItem("user_info");
          let newInfo = JSON.stringify(dataDup);
          notiChange("success", "Cập nhật thành công");
          localStorage.setItem("user_info", newInfo);
          onSendImage(file);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};
const onSendImage = fileList => {
  let userInfo = JSON.parse(localStorage.getItem("user_info"));
  const formData = new FormData();
  fileList.forEach(file => {
    formData.append("image-", file);
  });
  CallApi_USER(`users/${userInfo.user_id}/avatar`, "PATCH", formData)
    .then(res => {
      let dataDup = userInfo;
      for (const key in dataDup) {
        if (key === "user_logo") {
          dataDup[key] = res.data.imageUrl;
        }
      }
      if (res.data) {
        localStorage.removeItem("user_info");
        let newInfo = JSON.stringify(dataDup);
        localStorage.setItem("user_info", newInfo);
      }
    })
    .catch(err => notiChange("error", "Somthing went wrong! Try again"));
};

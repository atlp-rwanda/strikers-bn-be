import { reset } from "nodemon";
import { Notifications, User } from "../models";
// import Notification from '../models/notification'

export async function createNotification(req, res) {
  try {
    let notification = req.body;
    await Notifications.create(notification);

    return res.status(201).send({ message: "Created", data: notification });
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getNotificationsOfUser(req, res) {
  try {
    let user = await User.findOne({ where: { uuid: req.user.uuid } });
    if (!user) return res.status(404).send("User not found!");

    let notifications = await Notifications.findAll({
      where: { to: req.user.uuid },
    });

    if (notifications.length == 0) {
      return res.status(200).send("No notifications found!");
    }

    return res.status(200).send({ data: notifications });
  } catch (e) {
    console.log("errorrr");
    return res.status(500).send(" " + e);
  }
}

export async function readAllNotifications(req, res) {
  try {
    let userId = req.user.uuid;
    let notifications = await Notifications.findAll({ where: { to: userId } });
    if (notifications.length == 0) {
      return res.status(200).send("No notifications found!");
    }

    await Notifications.update({ isRead: true }, { where: { to: userId } });
    return res.status(200).send("All notifications marked as read!");
  } catch (e) {
    return res.status(500).send(e);
  }
}

export async function readNotification(req, res) {
  try {
    let notification = await Notifications.findOne({
      where: { uuid: req.params.notificationId },
    });
    if (!notification) {
      return res.status(400).send("Unable to find notification");
    }
    await Notifications.update(
      { isRead: true },
      { where: { uuid: req.params.notificationId } }
    );
    return res.status(200).send("Marked as read!");
  } catch (e) {
    return res.status(500).send(e);
  }
}
export async function deleteNotification(req, res) {
  try {
    let notification = await Notifications.findOne({
      where: { uuid: req.params.notificationId },
    });
    if (!notification) {
      return res.status(400).send("Unable to find notification");
    }
    await Notifications.destroy({ where: { uuid: req.params.notificationId } });
    return res.status(200).send("deleted!");
  } catch (e) {
    return res.status(500).send(e);
  }
}

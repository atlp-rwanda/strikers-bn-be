import express from "express"
const router= express.Router()

import {getNotificationsOfUser,deleteNotification,readAllNotifications,readNotification, createNotification} from "../controllers/notification.controller"
import {authenticate} from '../middlewares/auth'

/**
 * @description To get a list of all notifications of a user
 * @api api/v1/notifications
 * @access Public
 * @type POST
 */
router.post('/new',createNotification)

/**
 * @description To get a list of all notifications of a user
 * @api api/v1/notifications
 * @access Public
 * @type GET
 */
 router.get('/', authenticate,getNotificationsOfUser);

 /**
  * @description To delete a specific notification
  * @api api/notification/:id
  * @access Public
  * @type DELETE
  */
 router.delete('/:notificationId', deleteNotification);

 /**
  * @description To read all notifications
  * @api api/notifications
  * @access Public
  * @type POST
  */
 router.post('/readAll', readAllNotifications);
 
 /**
  * @description To read specific notification
  * @api api/notifications/:id
  * @access Public
  * @type POST
  */
  router.post('read/:notificationId', readNotification);

 module.exports = router
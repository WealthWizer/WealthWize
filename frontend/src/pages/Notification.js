import React, { useState, useEffect } from "react";
import NotificationsSystem, { atalhoTheme, setUpNotifications, useNotifications } from 'reapop'
import NotificationButtons from "./NotificationBottons";
const Notification = () => {
    const [transitionName, setTransitionName] = useState('Slide')
    // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
    const { notifications, dismissNotification, notify } = useNotifications()
    useEffect(() => {
        const notification = {
            id: '4',
            title: 'Alert Component Mounted!',
            message: 'You can create new notification by clicking on any of the button s below!',
            dismissible: true,
            dismissAfter: 2,
        }
        // 2. Create a notification.
        notify(notification)
    }, [])
    return (
        <section>
            <NotificationButtons />
            <NotificationsSystem
                // 2. Pass the notifications you want Reapop to display.
                notifications={notifications}
                // 4. Pass a builtIn theme or a custom theme.
                theme={atalhoTheme}
                components={{
                    Transition: transitionName,
                }}
            />
        </section>
    );
}
export default Notification;
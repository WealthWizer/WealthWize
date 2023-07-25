import React from "react";
import { useNotifications } from 'reapop'
const NotificationButtons = () => {
    const { notify } = useNotifications()

    const notification1 = {
        id: '1',
        title: 'Notification 1!',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        dismissible: true,
        dismissAfter: 3,
    }
    const notification2 = {
        id: '2',
        title: 'NOficaition 2!',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        dismissible: true,
        dismissAfter: 2,
    }
    const notification3 = {
        id: '3',
        title: 'Notification 3!',
        message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        dismissible: true,
        dismissAfter: 1,
    }

    return (
        <div className="grid h-screen place-items-center">
            <div className="flex gap-x-8">
                <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => notify(notification1)}>
                    Alert Green!
                </button>
                <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={() => notify(notification2)}>
                    Alert Red!
                </button>

                <button
                    className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                    onClick={() => notify(notification3)} >
                    Alert yellow!
                </button>
            </div>
        </div>
    );
}
export default NotificationButtons;
import { App } from 'antd';

export function useNotifications() {
  const messageApi = App.useApp().message;
  const notificationApi = App.useApp().notification;

  const showSuccess = (msg: string, title?: string) => {
    messageApi.success({ content: msg, key: title });
  };
  const showError = (msg: string, title?: string) => {
    messageApi.error({ content: msg, key: title });
  };
  const showWarning = (msg: string, title?: string) => {
    messageApi.warning({ content: msg, key: title });
  };
  const showInfo = (msg: string, title?: string) => {
    messageApi.info({ content: msg, key: title });
  };
  const showNotification = (type: 'success' | 'error' | 'info' | 'warning', msg: string, title?: string) => {
    notificationApi[type]({ message: title, description: msg });
  };

  return { showSuccess, showError, showWarning, showInfo, showNotification };
} 
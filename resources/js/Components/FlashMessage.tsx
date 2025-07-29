import { useEffect } from 'react';
import { App } from 'antd';

interface FlashMessageProps {
  flash: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };
}

export default function FlashMessage({ flash }: FlashMessageProps) {
  const { message: messageApi } = App.useApp();

  useEffect(() => {
    console.log(flash);
    if (flash.success) {
      messageApi.success(flash.success);
    }
    if (flash.error) {
      messageApi.error(flash.error);
    }
    if (flash.warning) {
      messageApi.warning(flash.warning);
    }
    if (flash.info) {
      messageApi.info(flash.info);
    }
  }, [flash, messageApi]);

  return null;
} 
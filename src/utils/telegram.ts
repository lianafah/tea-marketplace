// Telegram Web App API утилиты
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id: string;
          user: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          auth_date: string;
          hash: string;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
        };
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
        colorScheme: 'light' | 'dark';
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
      };
    };
  }
}

export const initTelegramApp = () => {
  try {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      
      // Инициализируем приложение
      webApp.ready();
      
      // Расширяем на всю высоту
      webApp.expand();
      
      // Настраиваем основную кнопку
      webApp.MainButton.text = 'Оформить заказ';
      webApp.MainButton.color = '#2d5a27';
      webApp.MainButton.textColor = '#ffffff';
      
      return webApp;
    }
  } catch (error) {
    console.log('Telegram Web App не доступен:', error);
  }
  
  return null;
};

export const getTelegramUser = () => {
  try {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      return window.Telegram.WebApp.initDataUnsafe.user;
    }
  } catch (error) {
    console.log('Не удалось получить данные пользователя:', error);
  }
  return null;
};

export const showMainButton = (text: string, callback: () => void) => {
  try {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.MainButton.text = text;
      webApp.MainButton.onClick(callback);
      webApp.MainButton.show();
    }
  } catch (error) {
    console.log('Не удалось показать главную кнопку:', error);
  }
};

export const hideMainButton = () => {
  try {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.MainButton.hide();
    }
  } catch (error) {
    console.log('Не удалось скрыть главную кнопку:', error);
  }
};

export const closeApp = () => {
  try {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  } catch (error) {
    console.log('Не удалось закрыть приложение:', error);
  }
};

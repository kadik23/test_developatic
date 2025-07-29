import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { ConfigProvider } from 'antd';
import { customTheme } from './utils/theme';
import FlashMessage from './Components/FlashMessage';
import { App as AntApp } from 'antd';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
        let page = pages[`./Pages/${name}.tsx`];
        
        return page;
    },
    
    setup({ el, App, props }) {
        const root = createRoot(el);
        console.log('App props:', props);
        console.log('Flash data:', props.initialPage.props.flash);
        
        root.render(
            <ConfigProvider theme={customTheme}>
                <AntApp>
                    <FlashMessage flash={props.initialPage.props.flash} />
                    <App {...props} />
                </AntApp>
            </ConfigProvider>
        );
    },
    progress: {
        color: '#CB3CFF',
    },
}); 
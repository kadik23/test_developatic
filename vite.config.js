import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        tailwindcss(),
        react({
            jsxImportSource: 'react',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'antd', '@ant-design/icons']
    },
    define: {
        'process.env': {}
    }
});

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        @if(config('app.env') === 'production')
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        @endif

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        
        @if(config('app.env') === 'local')
            @viteReactRefresh
            @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @else
            @php
                $manifestPath = public_path('build/manifest.json');
                $manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : null;
                $baseUrl = 'https://test-developatic.onrender.com';
            @endphp
            @if($manifest)
                <link rel="stylesheet" href="{{ $baseUrl }}/build/{{ $manifest['resources/css/app.css']['file'] }}">
                <script type="module" src="{{ $baseUrl }}/build/{{ $manifest['resources/js/app.tsx']['file'] }}"></script>
            @else
                <!-- Fallback if manifest not found -->
                <link rel="stylesheet" href="{{ $baseUrl }}/build/assets/app-DsCOe7X4.css">
                <script type="module" src="{{ $baseUrl }}/build/assets/app-DcpsJ0sl.js"></script>
            @endif
        @endif
        
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html> 
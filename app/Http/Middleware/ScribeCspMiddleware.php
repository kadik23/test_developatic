<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ScribeCspMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->is('docs*') || $request->is('api-docs*')) {
            $response->headers->set('Content-Security-Policy', 
                "default-src 'self'; " .
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " .
                "style-src 'self' 'unsafe-inline' https: data:; " .
                "font-src 'self' https: data:; " .
                "img-src 'self' data: https:; " .
                "connect-src 'self' https:; " .
                "upgrade-insecure-requests"
            );
        }

        return $response;
    }
} 
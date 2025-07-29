<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            if (Auth::user()->user_type !== 'ADMIN') {
                Auth::logout();
                return back()->withErrors(['email' => 'Access denied. Admin users only.'])->onlyInput('email');
            }
            return redirect()->intended('/')->with('success', 'Welcome back! You have successfully logged in.');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login')->with('info', 'You have been successfully logged out.');
    }

    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }
} 
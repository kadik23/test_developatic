<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Login and retrieve an access token
     *
     * @group Authentication
     *
     * Log in as a user and receive a JWT access token for API requests.
     *
     * @bodyParam email string required The user's email address. Example: admin@something.com
     * @bodyParam password string required The user's password. Example: password
     *
     * @response 200 {
     *   "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
     *   "token_type": "bearer",
     *   "expires_in": 3600
     * }
     * @response 401 {
     *   "error": "Unauthorized"
     * }
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl', 60) * 60
        ]);
    }

    public function me()
    {
        return response()->json(Auth::guard('api')->user());
    }

    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
} 
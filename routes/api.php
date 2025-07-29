<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// To see app documentation go to http://127.0.0.1:8000/api-docs
Route::get('/ping', function () {
    return response()->json(['message' => 'pong']);
});

Route::prefix('v1')->group(function () {

    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
        Route::get('users', [\App\Http\Controllers\Api\UserController::class, 'index']);
        Route::get('users/age-distribution', [\App\Http\Controllers\Api\UserController::class, 'ageDistribution']);
        Route::get('users/pairs', [\App\Http\Controllers\Api\UserController::class, 'userPairs']);
    }); 
});
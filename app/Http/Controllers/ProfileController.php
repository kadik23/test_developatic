<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\ChangePasswordRequest;

class ProfileController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function edit()
    {
        $user = Auth::user();

        return Inertia::render('Profile/Edit', [
            'user' => $user
        ]);
    }

    public function update(UpdateProfileRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $updated = $this->userRepository->updateUser($user->id, $data);
        if ($updated) {
            return back()->with('success', 'Profile information updated successfully!');
        }
        return back()->with('error', 'Failed to update profile. Please try again.');
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        if (!Hash::check($data['current_password'], $user->password)) {
            return back()->withErrors(['current_password' => 'Current password is incorrect']);
        }
        $updated = $this->userRepository->updatePassword($user->id, $data['new_password']);
        if ($updated) {
            return back()->with('success', 'Password changed successfully! Please remember your new password.');
        }
        return back()->with('error', 'Failed to change password. Please try again.');
    }
} 
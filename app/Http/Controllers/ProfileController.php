<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

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

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'date_of_birth' => 'nullable|date|before:today',
        ]);

        $updated = $this->userRepository->updateUser($user->id, $request->only([
            'name', 'email', 'date_of_birth'
        ]));

        if ($updated) {
            return back()->with('success', 'Profile information updated successfully!');
        }

        return back()->with('error', 'Failed to update profile. Please try again.');
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
            'new_password_confirmation' => 'required|string|min:8',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'Current password is incorrect']);
        }

        $updated = $this->userRepository->updatePassword($user->id, $request->new_password);

        if ($updated) {
            return back()->with('success', 'Password changed successfully! Please remember your new password.');
        }

        return back()->with('error', 'Failed to change password. Please try again.');
    }
} 
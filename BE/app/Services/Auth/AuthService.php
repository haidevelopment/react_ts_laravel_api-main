<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data)
    {
        $user = User::create($data);
        return $user;
    }

    public function login(array $data)
    {
        if (!Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password.'],
            ]);
        }

        $user = Auth::user();
        return $user->createToken('auth_token')->plainTextToken;
    }

    public function changePassword(User $user, array $data)
    {
        if (!Hash::check($data['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.'],
            ]);
        }

        $user->update([
            'password' => Hash::make($data['new_password']),
        ]);
    }

    public function logout(User $user)
    {
        $user->tokens()->delete();
    }

    public function refreshToken(User $user)
    {
        $user->tokens()->delete();
        return $user->createToken('auth_token')->plainTextToken;
    }
}

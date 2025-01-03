<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StoreUserRequest;
use App\Services\Auth\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

use function Laravel\Prompts\error;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(StoreUserRequest $request): JsonResponse
    {
        try {
            $params = [
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'email' => $request->email,
                'password' => $request->password,
                'birth' => $request->birth,
                'genre' => $request->genre,
            ];

            $user = $this->authService->register($params);
            return response()->json(['user' => $user, 'messages' => 'Tạo tài khoản thành công , bạn có thể đăng nhập ngay !'], Response::HTTP_OK);
        } catch (\Throwable $err) {
            return response()->json(['error' => $err], Response::HTTP_BAD_REQUEST);
        }
    }


    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            $token = $this->authService->login($validated);
            $user = $request->user();
            return response()->json(['token' => $token, 'user' => $user], Response::HTTP_OK);
        } catch (\Throwable $err) {
            return response()->json(['error' => $err], Response::HTTP_BAD_REQUEST);
        }
    }

    public function changePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $this->authService->changePassword(Auth::user(), $validated);
        return response()->json(['message' => 'Password updated successfully.']);
    }

    public function logout()
    {
        $this->authService->logout(Auth::user());
        return response()->json(['message' => 'Logged out successfully.'], Response::HTTP_OK);
    }

    public function refreshToken()
    {
        $token = $this->authService->refreshToken(Auth::user());
        return response()->json(['token' => $token]);
    }
}

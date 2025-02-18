<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UtilitiesController extends Controller
{
    public function uploadFiles($file, string $path)
    {
        if (!is_object($file)) {
            throw new \InvalidArgumentException("Expected an object, received an array");
        }

        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path($path), $fileName);
        return $fileName;
    }
    public function generateOrderCode($length = 10) {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $randomString = substr(str_shuffle(str_repeat($characters, 5)), 0, $length - 4);
        $uniquePart = strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 4));
        return $randomString . $uniquePart;
    }
}

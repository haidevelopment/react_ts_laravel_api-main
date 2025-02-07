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
}

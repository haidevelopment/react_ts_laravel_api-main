<?php

namespace App\Http\Controllers\API\CRUDAPI;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataRequestAPI\CategoryRequest;
use App\Models\Category;
use App\Services\RequestAPIService\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $service;
    public function __construct(CategoryService $service)
    {
        $this->service = $service;
    }
    public function getData()
    {
        $data = $this->service->data();
        return response()->json($data, 200);
    }
    public function create(CategoryRequest $request)
    {
        $data = $request->except('image');
        if ($request->hasFile('image')) {
            $path = 'storage/category/';
            $data['image'] = $this->uploadImage($path, $request->file('image'));
        } else {
            $data['image'] = 'default-image.jpg';
        }
        $new = $this->service->create($data);
        return response()->json($new);
    }
    public function update($id, Request $request)
    {
        $data = $request->except('image');
        $obj = $this->service->one($id);

        if ($request->hasFile('image')) {
            $path = 'storage/category/';

            if (file_exists($path . $obj->image)) {
                unlink($path . $obj->image);
            }

            $data['image'] = $this->uploadImage($path, $request->file('image'));
        } else {
            $data['image'] = $obj->image;
        }

        $obj = $this->service->update($id, $data);

        return response()->json($obj);
    }

    public function delete($id)
    {
        $obj = $this->service->one($id);
        $path = 'storage/category/';

        if (file_exists($path . $obj->image)) {
            unlink($path . $obj->image);
        }
        $del = $this->service->delete($id);
        return response()->json(['id' => $id]);
    }
    private function uploadImage(string $path, $objImage)
    {
        if (is_array($objImage)) {
            throw new \InvalidArgumentException("uploadImage không hỗ trợ nhiều file.");
        }
        $name = $objImage->getClientOriginalName();
        $fullname = rand(1, 10000) . '_' . $name;
        $objImage->move($path, $fullname);
        return $fullname;
    }
}

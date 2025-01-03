<?php

namespace App\Services\RequestAPIService;

use App\Models\Category;

class CategoryService
{
    public function data()
    {
        $data = Category::where('active', 1)->orderBy('id', 'DESC')->get();
        return response()->json($data, 200);
    }
    public function create(array $data)
    {
        try {
            $obj = Category::create($data);
            return response()->json($obj, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function update(int $id, array $data)
    {
        try {
            $obj = Category::find($id);

            if (!$obj) {
                return response()->json(['error' => 'Category not found'], 404);
            }

            $obj->update($data);

            return response()->json($obj, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function delete(int $id)
    {
        $obj = Category::find($id);
        $obj->delete();
        return true;
    }
    public function one(int $id)
    {
        return Category::find($id);
    }
}

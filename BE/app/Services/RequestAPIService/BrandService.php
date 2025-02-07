<?php

namespace App\Services\RequestAPIService;

use App\Models\Brand;

class BrandService
{
    public function data()
    {
        $data = Brand::orderBy('id', 'DESC')->get();
        return $data;
    }
    public function create(array $data)
    {
        try {
            $obj = Brand::create($data);
            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
    public function update(int $id, array $data)
    {
        try {
            $obj = Brand::find($id);

            if (!$obj) {
                return response()->json(['error' => 'Brand not found'], 404);
            }

            $obj->update($data);

            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function delete(int $id)
    {
        $obj = Brand::find($id);
        $obj->delete();
        return true;
    }
    public function one(int $id)
    {
        return Brand::find($id);
    }
}

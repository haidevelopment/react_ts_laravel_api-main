<?php

namespace App\Services\RequestAPIService;

use App\Models\Attribute;
use App\Models\AttributeValue;

class AttributeService
{
    public function data()
    {
        $data = Attribute::with('attributeValue')->orderBy('id', 'DESC')->get();
        return $data;
    }
    public function create(array $data)
    {
        try {
            $obj = Attribute::create($data);
            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
    public function update(int $id, array $data)
    {
        try {
            $obj = Attribute::find($id);

            if (!$obj) {
                return response()->json(['error' => 'Category not found'], 404);
            }

            $obj->update($data);

            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function delete(int $id)
    {
        $obj = Attribute::find($id);
        $obj->delete();
        return true;
    }
    public function one(int $id)
    {
        return Attribute::find($id);
    }
    public function createValue(array $data)
    {
        try {
            $obj = AttributeValue::create($data);
            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
    public function updateValue(int $id, array $data)

    {
        try {
            $obj = AttributeValue::find($id);

            if (!$obj) {
                return response()->json(['error' => 'Attribute not found'], 404);
            }

            $obj->update($data);

            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function deleteValue(int $id)
    {
        $obj = AttributeValue::find($id);
        $obj->delete();
        return true;
    }
}

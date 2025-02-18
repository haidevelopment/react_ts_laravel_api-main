<?php

namespace App\Services\RequestAPIService;

use App\Models\Voucher;

class VoucherService
{
    public function data()
    {
        $data = Voucher::orderBy('id', 'DESC')->get();
        return $data;
    }
    public function create(array $data)
    {
        try {
            $obj = Voucher::create($data);
            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
    public function update(int $id, array $data)
    {
        try {
            $obj = Voucher::find($id);

            if (!$obj) {
                return response()->json(['error' => 'Voucher not found'], 404);
            }

            $obj->update($data);

            return $obj;
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function delete(int $id)
    {
        $obj = Voucher::find($id);
        $obj->delete();
        return true;
    }
    public function one(int $id)
    {
        return Voucher::find($id);
    }
}

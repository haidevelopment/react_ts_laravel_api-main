<?php

namespace App\Http\Controllers\API\CRUDAPI;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataRequestAPI\VoucherRequest;
use App\Services\RequestAPIService\VoucherService;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    private $voucher;
    public function __construct(VoucherService $voucher)
    {
        $this->voucher = $voucher;
    }
    public function data()
    {
        $data = $this->voucher->data();
        return response()->json($data);
    }
    public function create(VoucherRequest $request)
    {
        $params = $request->all();

        $obj = $this->voucher->create($params);
        return response()->json($obj);
    }
    public function update(VoucherRequest $request, $id)
    {
        $params = $request->all();
        $obj = $this->voucher->update($id, $params);
        return response()->json($obj);
    }
    public function delete($id)
    {
        $dataFind = $this->voucher->one($id);

        $this->voucher->delete($id);
        return response()->json(['id' => $id]);
    }
}

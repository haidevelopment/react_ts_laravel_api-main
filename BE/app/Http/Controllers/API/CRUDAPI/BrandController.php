<?php

namespace App\Http\Controllers\API\CRUDAPI;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Utilities\UtilitiesController;
use App\Http\Requests\DataRequestAPI\BrandRequest;
use App\Services\RequestAPIService\BrandService;

class BrandController extends Controller
{
    private $brand;
    private $ultis;
    public function __construct(BrandService $brand, UtilitiesController $ultis)
    {
        $this->brand = $brand;
        $this->ultis = $ultis;
    }
    public function data()
    {
        $data = $this->brand->data();
        return response()->json($data);
    }
    public function create(BrandRequest $request)
    {
        $params = $request->except('image');
        if ($request->hasFile('image')) {
            $path = 'storage/brand/';
            $image = $this->ultis->uploadFiles($request->file('image')[0], $path);
            $params['image'] = $image;
        } else {
            $params['image'] = 'null';
        }
        $obj = $this->brand->create($params);
        return response()->json($obj);
    }
    public function update(BrandRequest $request, $id)
    {
        $params = $request->except('image');
        if ($request->hasFile('image')) {
            $dataFind = $this->brand->one($id);
            $path = 'storage/brand/';
            if (file_exists($path . $dataFind->image)) {
                unlink($path . $dataFind->image);
            }
            $image = $this->ultis->uploadFiles($request->file('image')[0], $path);
            $params['image'] = $image;
        } else {
            $params['image'] = 'null';
        }
        $obj = $this->brand->update($id, $params);
        return response()->json($obj);
    }
    public function delete($id)
    {


        $dataFind = $this->brand->one($id);
        $path = 'storage/brand/';
        if (file_exists($path . $dataFind->image)) {
            unlink($path . $dataFind->image);
        }
        $this->brand->delete($id);
        return response()->json(['id' => $id]);
    }
}

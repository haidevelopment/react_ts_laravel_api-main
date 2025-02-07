<?php

namespace App\Http\Controllers\API\CRUDAPI;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Utilities\UtilitiesController;
use App\Http\Requests\DataRequestAPI\ProductRequest;
use App\Models\Product;
use App\Models\ProductAttachment;
use App\Services\RequestAPIService\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $product;
    private $ultis;
    public function __construct(ProductService $product, UtilitiesController $ultis)
    {
        $this->product = $product;
        $this->ultis = $ultis;
    }
    public function getAll()
    {
        $data = $this->product->data();
        return response()->json($data, 200);
    }
    public function create(Request $request)
    {
        $product = $this->product->create($request);
        return response()->json($product, 201);
    }
    public function destroy($id){
       $this->product->delete($id);
       return response()->json(['id'=>$id]);
    }
}

<?php

namespace App\Http\Controllers\API\CRUDAPI;

use App\Http\Controllers\Controller;
use App\Services\RequestAPIService\AddressService;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    protected $address;
    public function __construct(AddressService $address)
    {
        $this->address = $address;
    }
    public function createAddress (Request $request){
         $obj = $this->address->addAddress($request->all());
         return response()->json($obj);
    }
}

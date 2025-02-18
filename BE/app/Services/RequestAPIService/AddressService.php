<?php

namespace App\Services\RequestAPIService;

use App\Models\Address;
use App\Models\Voucher;
use Illuminate\Support\Facades\Auth;

class AddressService
{
  public function addAddress($params){
     $params['user_id'] = Auth::id();
     $obj = Address::create($params);
     return $obj;
  }
}

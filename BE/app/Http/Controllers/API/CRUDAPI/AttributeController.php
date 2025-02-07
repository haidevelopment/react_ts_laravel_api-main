<?php

namespace App\Http\Controllers\API\CRUDAPI;

use App\Http\Controllers\Controller;
use App\Http\Requests\DataRequestAPI\AttributeRequest;
use App\Models\Attribute;
use App\Services\RequestAPIService\AttributeService;
use Illuminate\Http\Request;

class AttributeController extends Controller
{
    private $attribute;
    public function __construct(AttributeService $attribute)
    {
        $this->attribute = $attribute;
    }
    public function index()
    {
        $data = $this->attribute->data();
        return response()->json($data, 200);
    }
    public function create(AttributeRequest $request)
    {
        $params = $request->all();
        $obj = $this->attribute->create($params);
        return response()->json($obj, 200);
    }
    public function getOne($id)
    {
        $data = Attribute::find($id);
        return response()->json($data);
    }
    public function update(Request $request, $id)
    {
        $obj = $this->attribute->update($id, $request->all());
        return response()->json($obj, 200);
    }
    public function destroy($id)
    {
        $this->attribute->delete($id);
        return response()->json(['id' => $id], 200);
    }
    public function createAttributeValue(Request $request)
    {
        $obj = $this->attribute->createValue($request->all());
        return response()->json($obj);
    }
    public function updateAttributeValue(Request $request, $id)
    {
        $obj = $this->attribute->updateValue($id, $request->all());
        return response()->json($obj);
    }
    public function deleteAttributeValue($id)
    {
        $this->attribute->deleteValue($id);
        return response()->json([['id' => $id]]);
    }
}

<?php

namespace App\Services\RequestAPIService;

use App\Http\Controllers\Utilities\UtilitiesController;
use App\Models\Product;
use App\Models\ProductAttachment;
use App\Models\Variant;
use App\Models\VariantAttributeValue;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\DB;

class ProductService
{
    protected $uploads;
    public function __construct(UtilitiesController $uploads)
    {
        $this->uploads = $uploads;
    }
    public function data()
    {
        $data = Product::with("category", "attachments", "variant.variantAttributeValue.attributeValue", "variant.variantAttributeValue.attribute")->orderBy('id', 'DESC')->get();
        return $data;
    }
    public function create($request)
    {
        $data = $this->dataProductBasic($request->data, $request->variant);
        return $data;
    }

    public function update(int $id, array $data)
    {
        try {
            $obj = Product::find($id);

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
        $product = Product::find($id);
        $attachment = ProductAttachment::where('product_id', $id)->get();
        if ($attachment) {
            foreach ($attachment as $img) {
                if (file_exists('storage/product/attachments/' . $img->image_url)) {
                    unlink('storage/product/attachments/' . $img->image_url);
                    $img->delete();
                }
            }
        }
        $variant = Variant::where("product_id", $id)->get();
        if ($variant) {
            foreach ($variant as $key => $vari) {
                if (file_exists('storage/variant/' . $vari->image)) {
                    unlink('storage/variant/' . $img->image);
                    $value_variant = VariantAttributeValue::where("variant_id", $vari->id)->get();
                    foreach ($value_variant as $key => $value) {
                        $value->delete();
                    }
                    $vari->delete();
                }
            }
        }
        $product->delete();


        return true;
    }
    public function one(int $id)
    {
        return Product::find($id);
    }
    private function dataProductBasic($data, $variant)
    {
        $image = $data['image'];
        $instructional_images = $data['instructional_images'];
        $path = 'storage/product/';
        $name_image = $this->uploads->uploadFiles($image, $path);
        $instructional_images_name = $this->uploads->uploadFiles($instructional_images, $path);

        $newData = [
            'name' => $data['name'],
            'price' => $data['price'],
            'description' => $data['description'],
            'image' => $name_image,
            'weight' => $data['weight'],
            'quantity' => $data['quantity'],
            'quantity_warning' => $data['quantity_warning'],
            'tags' => $data['tags'],
            'sku' => $data['sku'],
            'brand_id' => $data['brand_id'],
            'category_id' => $data['category_id'],
            'instructional_images' => $instructional_images_name,
            'active' => 1
        ];

        $obj = Product::create($newData);

        if ($data['images']) {
            $path = 'storage/product/attachments';
            foreach ($data['images'] as $file) {
                $attachmentName = $this->uploads->uploadFiles($file, $path);
                ProductAttachment::create([
                    'product_id' => $obj->id,
                    'image_url' => $attachmentName,
                ]);
            }
        }

        $this->dataProductVariant($variant, $obj->id);
        return $obj;
    }

    private function dataProductVariant($data, $id)
    {
        $path = 'storage/variant/';

        $count = count($data);
        for ($i = 0; $i < $count; $i++) {
            $buyt = $data[$i];

            $name_image = isset($buyt['image']) ? $this->uploads->uploadFiles($buyt['image'], $path) : null;

            $obj = [
                "product_id" => $id,
                "sku" => $buyt['sku'] ?? '',
                "price" => $buyt['price'] ?? 0,
                "quantity" => $buyt['quantity'] ?? 0,
                "weight" => $buyt['weight'] ?? 0,
                "image" => $name_image,
                "description" => $buyt['description'] ?? '',
                "active" => 1,
            ];
            $variant_obj = Variant::create($obj);

            if (isset($buyt['attributes']) && is_array($buyt['attributes'])) {
                $attr_count = count($buyt['attributes']);
                for ($j = 0; $j < $attr_count; $j++) {
                    $vari = $buyt['attributes'][$j];

                    VariantAttributeValue::create([
                        'variant_id' => $variant_obj->id,
                        'attribute_id' => intval($vari['attrId'] ?? 0),
                        'attribute_value_id' => intval($vari['attrValueId'] ?? 0),
                    ]);
                }
            }
        }
    }
}

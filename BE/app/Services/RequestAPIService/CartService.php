<?php

namespace App\Services\RequestAPIService;

use App\Models\Cart;
use App\Models\Variant;
use Illuminate\Support\Facades\Auth;

class CartService
{
    public function data()
    {
        $id = Auth::id();
        $data = Cart::with(
            'product.variant.variantAttributeValue.attributeValue',
            'product.variant.variantAttributeValue.attribute',
            'user',
            'variant.variantAttributeValue.attributeValue',
            'variant.variantAttributeValue.attribute'
        )
            ->where('id_user', $id)
            ->get();

        return $data;
    }
    public function deleteCart($id)
    {
        if ($id) {
            $cartItem = Cart::find($id);
            $cartItem->delete();
        }
        return true;
    }
    public function addCart($request)
    {
        try {
            $userId = Auth::id();
            $productId = $request->id_product;
            $variantId = $request->variant_id;
            $quantityToAdd = (int) $request->quantity;

            if (!$userId) {
                return ['message' => 'Bạn cần đăng nhập để thêm vào giỏ hàng', "type" => "error"];
            }

            $variant = Variant::find($variantId);
            if (!$variant) {
                return ['message' => 'Biến thể sản phẩm không tồn tại', "type" => "error"];
            }

            $cartItem = Cart::where('id_user', $userId)
                ->where('id_product', $productId)
                ->where('variant_id', $variantId)
                ->first();

            $currentQuantity = $cartItem ? $cartItem->quantity : 0;
            $newTotalQuantity = $currentQuantity + $quantityToAdd;

            if ($newTotalQuantity > $variant->quantity) {
                return ['message' => 'Kho không đủ số lượng', "type" => "error"];
            }

            if ($cartItem) {
                $cartItem->quantity = $newTotalQuantity;
                $cartItem->total = $cartItem->price * $newTotalQuantity;
                $cartItem->save();

                return [
                    'message' => 'Thêm vào giỏ hàng thành công ?',
                    'type' => 'update',
                    'data' => $this->getDataLate($cartItem->id),
                ];
            } else {
                $obj = Cart::create([
                    'name' => $request->name,
                    'price' => $request->price,
                    'image' => $request->image,
                    'variant_id' => $variantId,
                    'quantity' => $quantityToAdd,
                    'total' => $request->price * $quantityToAdd,
                    'id_product' => $productId,
                    'id_user' => $userId,
                ]);

                return [
                    'message' => 'Thêm vào giỏ hàng thành công ?',
                    'type' => 'create',
                    'data' => $this->getDataLate($obj->id),
                ];
            }
        } catch (\Exception $e) {
            return ['message' => 'Đã có lỗi xảy ra', 'type' => "error", 'error' => $e->getMessage()];
        }
    }
    private function getDataLate($id)
    {
        $data = Cart::with(
            'product.variant.variantAttributeValue.attributeValue',
            'product.variant.variantAttributeValue.attribute',
            'user',
            'variant.variantAttributeValue.attributeValue',
            'variant.variantAttributeValue.attribute'
        )
            ->where('id', $id)
            ->first();

        return $data;
    }
    public function updateVariant($request)
    {
        $cartItem = Cart::findOrFail(intval($request->id));
        $newVariant = Variant::findOrFail(intval($request->variant_id));

        if ($newVariant->quantity < $cartItem->quantity) {
            return [
                'status' => 'error',
                'message' => 'Số lượng phân loại không đủ để thay đổi.',
            ];
        }

        $cartItem->variant_id = $request->variant_id;
        $cartItem->price = $newVariant->price;

        $cartItem->total = $cartItem->quantity * $newVariant->price;

        $cartItem->save();

        return [
            'status' => 'success',
            'message' => 'Cập nhật phân loại thành công.',
            'data' => $this->getDataLate($cartItem->id),
        ];
    }

    public function updateQuantityCart($request)
    {


        $cartItem = Cart::findOrFail($request->id);

        $variant = Variant::findOrFail($cartItem->variant_id);

        if ($variant->quantity < $request->quantity) {
            return [
                'status' => 'error',
                'message' => 'Số lượng biến thể không đủ.',
            ];
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->total = $cartItem->price * $request->quantity;
        $cartItem->save();

        return [
            'status' => true,
            'message' => 'Cập nhật số lượng thành công.',
            'data' => $this->getDataLate($cartItem->id),
        ];
    }
}

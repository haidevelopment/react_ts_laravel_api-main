<?php

namespace App\Http\Controllers\API\Statistics;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function revenueStatistics(Request $request)
    {
        $timeframe = $request->get('timeframe', 'monthly'); // daily, weekly, monthly

        $query = Order::where('order_status', 'delivered');

        switch ($timeframe) {
            case 'daily':
                $query->whereDate('created_at', now());
                break;
            case 'weekly':
                $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                break;
            case 'monthly':
                $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
                break;
        }

        $revenue = $query->sum('total_price');

        return response()->json(['timeframe' => $timeframe, 'revenue' => $revenue]);
    }
    public function orderStatistics()
    {
        return response()->json([
            'total_orders' => Order::count(),
            'delivered_orders' => Order::where('order_status', 'delivered')->count(),
            'canceled_orders' => Order::where('order_status', 'canceled')->count(),
        ]);
    }
    public function averageOrderValue()
    {
        $totalRevenue = Order::sum('total_price');
        $totalOrders = Order::count();

        $aov = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;

        return response()->json(['AOV' => $aov]);
    }
    public function conversionRate()
    {
        $totalVisitors = 10000;
        $totalOrders = Order::count();

        $conversionRate = $totalVisitors > 0 ? ($totalOrders / $totalVisitors) * 100 : 0;

        return response()->json(['conversion_rate' => $conversionRate]);
    }
    public function bestSellingProducts()
    {
        $products = OrderItem::select('product_id', DB::raw('SUM(quantity) as total_sold'))
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->with('product')
            ->take(5)
            ->get();

        return response()->json($products);
    }
    public function stockStatus()
    {
        $lowStock = Product::where('quantity', '<=', DB::raw('quantity_warning'))->get();
        $slowMoving = Product::where('quantity', '>', 0)->orderBy('updated_at', 'asc')->take(5)->get();

        return response()->json([
            'low_stock' => $lowStock,
            'slow_moving' => $slowMoving,
        ]);
    }
    public function returnRate()
    {
        $totalOrders = Order::count();
        $returnedOrders = Order::where('order_status', 'returned')->count();

        $returnRate = $totalOrders > 0 ? ($returnedOrders / $totalOrders) * 100 : 0;

        return response()->json(['return_rate' => $returnRate]);
    }
    public function getOrderStatus()
    {
        $orderStatuses = Order::selectRaw('order_status, COUNT(*) as count')
            ->groupBy('order_status')
            ->get();

        return response()->json([
            'status_counts' => $orderStatuses
        ]);
    }
    public function getStockStatus()
    {
        $products = Product::where('active', true)
            ->select('id', 'name', 'quantity', 'sku')
            ->get();

        $variants = Variant::where('active', true)
            ->join('products', 'variants.product_id', '=', 'products.id')
            ->select('variants.id', 'variants.sku', 'variants.quantity', 'products.name as product_name')
            ->get();

        return response()->json([
            'products' => $products,
            'variants' => $variants
        ]);
    }
}

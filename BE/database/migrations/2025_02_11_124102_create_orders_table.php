<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->foreignId('user_id')->nullable();
            $table->foreignId('address_id');
            $table->foreignId('coupon_id')->nullable();
            $table->decimal('total_price', 10, 2);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->string('payment_method'); // cod, vnpay, momo, etc.
            $table->string('payment_status')->default('pending'); // pending, paid, failed
            $table->string('order_status')->default('pending'); // new, processing, shipped, delivered, canceled
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

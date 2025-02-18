<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('title')->nullable(); // Mô tả voucher (ví dụ: giảm giá 10%, freeship, v.v.)
            $table->enum('voucher_type', ['discount', 'freeship'])->default('discount'); // Loại voucher
            $table->decimal('value', 10, 2); // Giá trị của voucher
            $table->enum('discount_type', ['percent', 'amount'])->default('amount'); // Loại giảm giá
            $table->decimal('min_order_value', 10, 2)->nullable(); // Giá trị đơn hàng tối thiểu
            $table->decimal('max_discount_value', 10, 2)->nullable(); // Mức giảm tối đa cho voucher

            // Ngày bắt đầu và ngày hết hạn của voucher
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable(); // Cho phép null để tránh lỗi

            $table->integer('limit')->default(1);
            $table->boolean('is_active')->default(true);

            // Sử dụng timestamps nullable thay vì timestamps() mặc định
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};

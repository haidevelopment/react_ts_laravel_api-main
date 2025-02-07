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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->decimal('price', 10, 2);
            $table->text('description')->nullable();
            $table->string('image', 200)->nullable();
            $table->float('weight')->nullable();
            $table->integer('quantity')->default(0);
            $table->integer('quantity_warning')->default(0);
            $table->string('tags', 200)->nullable();
            $table->string('sku', 100)->unique();
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->unsignedBigInteger('category_id');
            $table->string('instructional_images', 255)->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

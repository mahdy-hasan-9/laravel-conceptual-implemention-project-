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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->index();
            $table->unsignedTinyInteger('age');
            $table->enum('gender', ['male', 'female']);
            $table->string('image_url')->nullable();
            $table->boolean('image_removed')->default(false);
            $table->boolean('is_active')->default(true);
            $table->text('address');
            $table->softDeletes();

            $table->unsignedBigInteger('class_id');
            $table->foreign('class_id')->references('id')->on('class_models')->onDelete('cascade');

            $table->string('search_block')->nullable()->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};

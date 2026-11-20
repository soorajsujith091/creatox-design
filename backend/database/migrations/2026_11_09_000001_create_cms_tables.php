<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cms_tokens', function (Blueprint $table) {
            $table->id(); $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('token_hash', 64)->unique(); $table->timestamp('expires_at'); $table->timestamps();
        });
        Schema::create('cms_posts', function (Blueprint $table) {
            $table->uuid('id')->primary(); $table->string('title', 200); $table->string('slug', 180)->unique();
            $table->text('excerpt')->nullable(); $table->longText('body'); $table->text('image')->nullable();
            $table->string('category', 80)->default('Insights'); $table->string('status')->default('draft')->index(); $table->timestamps();
        });
        Schema::create('cms_leads', function (Blueprint $table) {
            $table->uuid('id')->primary(); $table->string('name', 120); $table->string('email', 254);
            $table->string('phone', 40)->nullable(); $table->string('service', 500)->nullable();
            $table->text('message'); $table->string('status')->default('new')->index(); $table->timestamps();
        });
        Schema::create('cms_media', function (Blueprint $table) {
            $table->uuid('id')->primary(); $table->string('name'); $table->text('url'); $table->string('path'); $table->timestamps();
        });
        Schema::create('cms_images', function (Blueprint $table) {
            $table->string('key')->primary(); $table->string('label'); $table->text('url'); $table->timestamps();
        });
    }
    public function down(): void {
        foreach (['cms_images','cms_media','cms_leads','cms_posts','cms_tokens'] as $table) Schema::dropIfExists($table);
    }
};

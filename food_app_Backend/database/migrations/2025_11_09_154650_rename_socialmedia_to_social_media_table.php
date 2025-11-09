<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Rename socialmedia table to social_media if it exists
        if (Schema::hasTable('socialmedia') && !Schema::hasTable('social_media')) {
            DB::statement('RENAME TABLE `socialmedia` TO `social_media`');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rename back to socialmedia if needed
        if (Schema::hasTable('social_media') && !Schema::hasTable('socialmedia')) {
            DB::statement('RENAME TABLE `social_media` TO `socialmedia`');
        }
    }
};

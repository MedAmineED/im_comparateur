<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class DisableForeignKeyChecks extends Migration
{
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    }

    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInfo extends Model
{
    use HasFactory;
    public $timestamps=false;

    public function orders()
    {
        return $this->hasMany(Order::class, 'user_info_id', 'id');

    }
}

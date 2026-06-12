<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name','age','gender','image_url','image_removed','is_active','address'];

    protected $casts = [
        'is_active' => 'boolean',
        'image_removed' => 'boolean',
        'age' => 'integer',
    ];
}

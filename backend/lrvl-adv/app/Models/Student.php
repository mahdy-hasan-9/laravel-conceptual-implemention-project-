<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name','age','gender','image_url','image_removed','is_active','address' , 'class_id'];

    protected $casts = [
        'is_active' => 'boolean',
        'image_removed' => 'boolean',
        'age' => 'integer',
    ];

    

    public function studentClass(){
        return $this->belongsTo(ClassModel::class,'class_id');
    }

    public function activities(){
        return $this->belongsToMany(Activity::class,'activity_student','student_id','activity_id');
    }

    public function books(){
        return $this->belongsToMany(Book::class,'book_student','student_id','book_id');
    }
}

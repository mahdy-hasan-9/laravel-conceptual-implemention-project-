<?php

namespace App\Models;

use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{

    use Searchable;

    protected $fillable = ['name', 'age', 'gender', 'image_url', 'image_removed', 'is_active', 'address', 'class_id'];

    protected $casts = [
        'is_active' => 'boolean',
        'image_removed' => 'boolean',
        'age' => 'integer',
    ];


    protected static function boot()
    {
        parent::boot();

        static::saving(function ($student) {
            $student->search_block = implode(' ', array_filter([
                $student->name,
                $student->age,
            ]));
        });
    }


    public function toSearchableArray(): array
    {
        return [
            'id'       => (int) $this->id,
            'name'     => $this->name,
            'age'      => (int) $this->age,
            'class_id' => (int) $this->class_id,
            'search_block' => $this->search_block,
            'class_name' => $this->studentClass?->name,
        ];
    }

    public function studentClass()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    public function activities()
    {
        return $this->belongsToMany(Activity::class, 'activity_student', 'student_id', 'activity_id');
    }

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_student', 'student_id', 'book_id');
    }


    public function scopeFilterByClass($query, $classId)
    {
        return $query->when($classId, function ($q) use ($classId) {
            $q->where('class_id', (int) $classId);
        });
    }

    public function scopeFilterByActivities($query, $activities)
    {
        return $query->when($activities, function ($q) use ($activities) {
            $activityIds = explode(',', $activities);
            $q->whereHas('activities', function ($sub) use ($activityIds) {
                $sub->whereIn('activities.id', $activityIds);
            });
        });
    }

    public function scopeFilterByBooks($query, $books)
    {
        return $query->when($books, function ($q) use ($books) {
            $bookIds = explode(',', $books);
            $q->whereHas('books', function ($sub) use ($bookIds) {
                $sub->whereIn('books.id', $bookIds);
            });
        });
    }

    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($q) use ($search) {
            $q->where(function ($sub) use ($search) {
                $sub->where('name', 'like', "%{$search}%")
                    ->orWhereHas('studentClass', function ($classQuery) use ($search) {
                        $classQuery->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereRelation('activities', 'name', 'like', "%{$search}%");
            });
        });
    }
}

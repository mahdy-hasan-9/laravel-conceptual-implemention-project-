<?php

namespace App\Events;

use App\Models\Student;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StudentAdded
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public readonly Student $student) {}
}

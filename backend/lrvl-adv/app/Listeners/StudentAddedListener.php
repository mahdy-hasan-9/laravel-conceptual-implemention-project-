<?php

namespace App\Listeners;

use App\Events\StudentAdded;
use App\Models\User;
use App\Notifications\StudentAddedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class StudentAddedListener implements ShouldQueue
{
    use InteractsWithQueue;

    public function __construct() {}

    public function handle(StudentAdded $event): void
    {
        $student = $event->student;
        $recipients = User::whereIn('role', ['admin', 'manager'])->get();

        if ($recipients->isNotEmpty()) {
            foreach ($recipients as $index => $recipient) {
                $recipient->notify(
                    (new StudentAddedNotification($student))->delay(now()->addSeconds($index * 15))
                );
            }
        }
    }
}

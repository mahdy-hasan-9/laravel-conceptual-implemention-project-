<?php

namespace App\Notifications;

use App\Models\Student;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class AdminManagerNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly Student $student) {}

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }


    public function toDatabase(object $notifiable): array
    {
        return [
            'heading' => 'New Student Enrolled',
            'description' => "Student {$this->student->name} has been added successfully.",
            'student_id' => $this->student->id
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'heading' => 'New Student Enrolled',
            'description' => "Student {$this->student->name} has been added successfully.",
            'student_id' => $this->student->id,
            // 'read_at' => null,
            'created_at' => now()->toISOString()
        ]);
    }

    public function broadcastType(): string
    {
        return 'StudentAdded';
    }
}

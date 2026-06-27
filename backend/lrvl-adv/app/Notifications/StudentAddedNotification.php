<?php

namespace App\Notifications;

use App\Models\Student;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class StudentAddedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly Student $student
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Student Added Alert')
            ->line('A new student has been registered: ' . $this->student->name)
            ->action('View Student Profile', url('/students/' . $this->student->id));
    }

    public function toArray(object $notifiable): array
    {
        return [
            'student_id' => $this->student->id,
            'student_name' => $this->student->name,
        ];
    }
}

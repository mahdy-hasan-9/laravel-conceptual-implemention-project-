<?php

namespace App\Services\Backend\Student;

use App\Events\StudentAdded;
use App\Models\Student;
use App\Models\User;
use App\Notifications\AdminManagerNotification;
use App\Notifications\StudentAddedNotification;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Facades\DB;

class StudentService
{
    protected Student $student;

    public function __construct(Student $student)
    {
        $this->student = $student;
    }

    public function store(array $data): array
    {
        return DB::transaction(function () use ($data) {
            try {
                if (request()->hasFile('image')) {
                    $data['image_url'] = request()->file('image')->store('students', 'public');
                }

                $student = $this->student->create($data);
                $student->activities()->sync($data['activities']);
                $student->books()->sync($data['books'] ?? []);

                StudentAdded::dispatch($student);

                $recipients = User::whereIn('role', ['admin', 'manager'])->get();
                if ($recipients->isNotEmpty()) {
                    foreach ($recipients as $recipient) {
                        $recipient->notify(
                            (new AdminManagerNotification($student))->delay(now()->addSeconds(15))
                        );
                    }
                }

                return [
                    'success' => true,
                    'status' => 201,
                    'message' => 'Student created successfully.',
                    'data' => [
                        'student' => $student
                    ]
                ];
            } catch (Exception $e) {
                return [
                    'success' => false,
                    'status' => 500,
                    'message' => 'Failed to create student: ' . $e->getMessage(),
                ];
            }
        });
    }

    public function update(int $id, array $data): array
    {
        try {
            $student = $this->student->findOrFail($id);

            if (isset($data['image_removed']) && $data['image_removed']) {
                if ($student->image_url) {
                    Storage::disk('public')->delete($student->image_url);
                }
                $data['image_url'] = null;
            }

            if (request()->hasFile('image')) {
                if ($student->image_url) {
                    Storage::disk('public')->delete($student->image_url);
                }
                $data['image_url'] = request()->file('image')->store('students', 'public');
            }

            $student->update($data);
            $student->activities()->sync($data['activities']);
            $student->books()->sync($data['books'] ?? []);


            return [
                'success' => true,
                'status' => 200,
                'message' => 'Student updated successfully.',
                'data' => [
                    'student' => $student
                ]
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'status' => 500,
                'message' => 'Failed to update student: ' . $e->getMessage(),
            ];
        }
    }

    public function delete(int $id): array
    {
        try {
            $student = $this->student->findOrFail($id);
            if ($student->image_url) {
                Storage::disk('public')->delete($student->image_url);
            }
            $student->delete();
            return [
                'success' => true,
                'status' => 200,
                'message' => 'Student deleted successfully.',
                'data' => null
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'status' => 500,
                'message' => 'Failed to delete student: ' . $e->getMessage(),
            ];
        }
    }
}

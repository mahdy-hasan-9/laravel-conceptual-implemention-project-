<?php

namespace App\Services\Backend\Student;

use App\Models\Student;
use Illuminate\Support\Facades\Storage;
use Exception;

class StudentService
{
    protected Student $student;

    public function __construct(Student $student)
    {
        $this->student = $student;
    }

    public function store(array $data): array
    {
        try {
            if (isset($data['image']) && is_array($data['image']) && count($data['image']) > 0) {
                $file = request()->file('image')[0];
                $data['image_url'] = $file->store('students', 'public');
            }

            $student = $this->student->create($data);

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

            if (isset($data['image']) && is_array($data['image']) && count($data['image']) > 0) {
                if ($student->image_url) {
                    Storage::disk('public')->delete($student->image_url);
                }
                $file = request()->file('image')[0];
                $data['image_url'] = $file->store('students', 'public');
            }

            $student->update($data);
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
            if($student->image_url) {
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

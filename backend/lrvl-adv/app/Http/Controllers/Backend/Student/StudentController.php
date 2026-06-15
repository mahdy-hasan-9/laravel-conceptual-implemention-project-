<?php

namespace App\Http\Controllers\Backend\Student;

use App\Http\Controllers\Controller;
use App\Http\Request\Backend\Student\StudentRequest;
use App\Models\Student;
use App\Services\Backend\Student\StudentService;


class StudentController extends Controller
{
    protected StudentService $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    public function index()
    {
        $page = request()->query('page', 1);
        $perPage = request()->query('per_page', 10);

        $student = Student::with([
            'studentClass' => function ($query) {
                $query->select('id', 'name');
            },
            'activities' => function ($query) {
                $query->select('activities.id', 'activities.name');
            },
            'books' => function ($query) {
                $query->select('books.id', 'books.name');
            }
        ])->orderBy('id', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'status' => 200,
            'data' => $student->items(),
            'total' => $student->total(),
            'current_page' => $student->currentPage(),
            'per_page' => $student->perPage(),
            'last_page' => $student->lastPage(),
            'message' => 'Student List'
        ], 200);
    }

    public function show(int $id)
    {
        $student = Student::with([
            'studentClass' => function ($query) {
                $query->select('id', 'name');
            },
            'activities' => function ($query) {
                $query->select('activities.id', 'activities.name');
            },
            'books' => function ($query) {
                $query->select('books.id', 'books.name');
            }
        ])->find($id);

        if (!$student) {
            return response()->json([
                'success' => false,
                'status' => 404,
                'message' => 'Student not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'status' => 200,
            'data' => $student,
            'message' => 'Student Details'
        ], 200);
    }

    public function store(StudentRequest $request)
    {
        $result = $this->studentService->store($request->validated());
        return response()->json($result, $result['status']);
    }

    public function update(StudentRequest $request, int $id)
    {

        $result = $this->studentService->update($id, $request->validated());

        return response()->json($result, $result['status']);
    }

    public function destroy(int $id)
    {
        $result = $this->studentService->delete($id);

        return response()->json($result, $result['status']);
    }
}

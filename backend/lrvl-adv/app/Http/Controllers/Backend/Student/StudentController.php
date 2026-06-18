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
        // {"page":"1","per_page":"5","class_id":"11","activities":"6,5,4","books":"7,8"}

        $page = request()->query('page', 1);
        $perPage = request()->query('per_page', 10);

        $classId = request()->query('class_id');
        $activities = request()->query('activities');
        $books = request()->query('books');

        $classId = ($classId === 'undefined' || $classId === 'null' || $classId === '') ? null : $classId;
        $activities = ($activities === 'undefined' || $activities === 'null' || $activities === '') ? null : $activities;
        $books = ($books === 'undefined' || $books === 'null' || $books === '') ? null : $books;

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
        ])
            ->when($classId, function ($query) use ($classId) {
                 $query->where('class_id', (int) $classId);
            })
            ->when($activities , function ($query, $activities) {
                $activityIds = explode(',', $activities);
                $query->whereHas('activities', function ($q) use ($activityIds) {
                    $q->whereIn('activities.id', $activityIds);
                });
            })
            ->when($books , function ($query, $books) {
                $bookIds = explode(',', $books);
                $query->whereHas('books', function ($q) use ($bookIds) {
                    $q->whereIn('books.id', $bookIds);
                });
            })
            ->orderBy('id', 'desc')
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

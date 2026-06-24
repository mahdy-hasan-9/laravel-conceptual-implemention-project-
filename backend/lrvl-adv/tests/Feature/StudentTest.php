<?php

use App\Models\User;
use App\Models\Student;
use App\Models\ClassModel;
use App\Models\Activity;
use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

test('unauthorized user cannot access student endpoints', function () {
    $response = $this->getJson('/api/student/rsc');
    $response->assertStatus(401);
});

test('authorized user can list students', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class A', 'level' => 1, 'is_active' => true]);
    $student = Student::create([
        'name' => 'Alice Doe',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class->id,
        'is_active' => true,
    ]);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson('/api/student/rsc');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'status',
            'data',
            'total',
            'current_page',
            'per_page',
            'last_page',
            'message'
        ])
        ->assertJsonFragment([
            'name' => 'Alice Doe',
        ]);
});

test('can filter students by class', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class1 = ClassModel::create(['name' => 'Class 1', 'level' => 1, 'is_active' => true]);
    $class2 = ClassModel::create(['name' => 'Class 2', 'level' => 2, 'is_active' => true]);

    $student1 = Student::create([
        'name' => 'Alice',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class1->id,
        'is_active' => true,
    ]);

    $student2 = Student::create([
        'name' => 'Bob',
        'age' => 21,
        'gender' => 'male',
        'address' => '456 St',
        'class_id' => $class2->id,
        'is_active' => true,
    ]);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson("/api/student/rsc?class_id={$class1->id}");

    $response->assertStatus(200)
        ->assertJsonFragment(['name' => 'Alice'])
        ->assertJsonMissing(['name' => 'Bob']);
});

test('can filter students by activities', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class 1', 'level' => 1, 'is_active' => true]);
    $activity1 = Activity::create(['name' => 'Games', 'is_active' => true]);
    $activity2 = Activity::create(['name' => 'Music', 'is_active' => true]);

    $student1 = Student::create([
        'name' => 'Alice',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class->id,
        'is_active' => true,
    ]);
    $student1->activities()->sync([$activity1->id]);

    $student2 = Student::create([
        'name' => 'Bob',
        'age' => 21,
        'gender' => 'male',
        'address' => '456 St',
        'class_id' => $class->id,
        'is_active' => true,
    ]);
    $student2->activities()->sync([$activity2->id]);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson("/api/student/rsc?activities={$activity1->id}");

    $response->assertStatus(200)
        ->assertJsonFragment(['name' => 'Alice'])
        ->assertJsonMissing(['name' => 'Bob']);
});

test('can filter students by books', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class 1', 'level' => 1, 'is_active' => true]);
    $book1 = Book::create(['name' => 'Sci-Fi', 'is_active' => true]);
    $book2 = Book::create(['name' => 'Drama', 'is_active' => true]);

    $student1 = Student::create([
        'name' => 'Alice',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class->id,
        'is_active' => true,
    ]);
    $student1->books()->sync([$book1->id]);

    $student2 = Student::create([
        'name' => 'Bob',
        'age' => 21,
        'gender' => 'male',
        'address' => '456 St',
        'class_id' => $class->id,
        'is_active' => true,
    ]);
    $student2->books()->sync([$book2->id]);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson("/api/student/rsc?books={$book1->id}");

    $response->assertStatus(200)
        ->assertJsonFragment(['name' => 'Alice'])
        ->assertJsonMissing(['name' => 'Bob']);
});

test('can search students by name, class, or activity', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Aviation Class', 'level' => 1, 'is_active' => true]);
    $student = Student::create([
        'name' => 'Alice',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class->id,
        'is_active' => true,
    ]);


    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson("/api/student/rsc?search=Aviation");

    $response->assertStatus(200)
        ->assertJsonFragment(['name' => 'Alice']);


    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson("/api/student/rsc?search=Alice");

    $response->assertStatus(200)
        ->assertJsonFragment(['name' => 'Alice']);
});

test('can show a specific student', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class A', 'level' => 1, 'is_active' => true]);
    $student = Student::create([
        'name' => 'Alice',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class->id,
        'is_active' => true,
    ]);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson("/api/student/rsc/{$student->id}");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'status',
            'data' => ['id', 'name', 'age', 'gender', 'address'],
            'message'
        ])
        ->assertJsonPath('data.name', 'Alice');
});

test('returns 404 if student not found', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson('/api/student/rsc/99999');

    $response->assertStatus(404)
        ->assertJson([
            'success' => false,
            'message' => 'Student not found',
        ]);
});

test('can create a student with valid parameters', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class A', 'level' => 1, 'is_active' => true]);
    $activity = Activity::create(['name' => 'Games', 'is_active' => true]);
    $book = Book::create(['name' => 'Sci-Fi', 'is_active' => true]);

    $image = UploadedFile::fake()->image('student_pic.png');

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->postJson('/api/student/rsc', [
            'name' => 'Charlie Doe',
            'age' => 19,
            'gender' => 'male',
            'address' => '789 St',
            'is_active' => true,
            'class_id' => $class->id,
            'activities' => [$activity->id],
            'books' => [$book->id],
            'image' => $image,
        ]);

    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'Student created successfully.',
        ]);

    $this->assertDatabaseHas('students', [
        'name' => 'Charlie Doe',
        'age' => 19,
        'gender' => 'male',
        'class_id' => $class->id,
    ]);

    $studentId = $response->json('data.student.id');
    $this->assertDatabaseHas('activity_student', [
        'student_id' => $studentId,
        'activity_id' => $activity->id,
    ]);
    $this->assertDatabaseHas('book_student', [
        'student_id' => $studentId,
        'book_id' => $book->id,
    ]);

    $imageUrl = $response->json('data.student.image_url');
    $this->assertNotNull($imageUrl);
    Storage::disk('public')->assertExists($imageUrl);
});

test('cannot create student with invalid input', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->postJson('/api/student/rsc', [
            'name' => '',
            'age' => 200,
            'gender' => 'other',
            'activities' => 'not-an-array',
        ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
        ]);
});

test('can update student details', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class A', 'level' => 1, 'is_active' => true]);
    $student = Student::create([
        'name' => 'Old Name',
        'age' => 22,
        'gender' => 'female',
        'address' => 'Old Address',
        'class_id' => $class->id,
        'is_active' => true,
    ]);

    $activity = Activity::create(['name' => 'Music', 'is_active' => true]);
    $book = Book::create(['name' => 'Drama', 'is_active' => true]);

    $image = UploadedFile::fake()->image('updated_pic.png');

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->putJson("/api/student/rsc/{$student->id}", [
            'name' => 'New Name',
            'age' => 23,
            'gender' => 'male',
            'address' => 'New Address',
            'is_active' => true,
            'class_id' => $class->id,
            'activities' => [$activity->id],
            'books' => [$book->id],
            'image' => $image,
        ]);

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Student updated successfully.',
        ]);

    $this->assertDatabaseHas('students', [
        'id' => $student->id,
        'name' => 'New Name',
        'age' => 23,
        'gender' => 'male',
        'address' => 'New Address',
    ]);

    $this->assertDatabaseHas('activity_student', [
        'student_id' => $student->id,
        'activity_id' => $activity->id,
    ]);
    $this->assertDatabaseHas('book_student', [
        'student_id' => $student->id,
        'book_id' => $book->id,
    ]);
});

test('can remove student image', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class A', 'level' => 1, 'is_active' => true]);

    $fakePath = UploadedFile::fake()->image('profile.jpg')->store('students', 'public');

    $student = Student::create([
        'name' => 'Alice',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class->id,
        'image_url' => $fakePath,
        'is_active' => true,
    ]);

    Storage::disk('public')->assertExists($fakePath);

    $activity = Activity::create(['name' => 'Music', 'is_active' => true]);
    $book = Book::create(['name' => 'Drama', 'is_active' => true]);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->putJson("/api/student/rsc/{$student->id}", [
            'name' => 'Alice',
            'age' => 20,
            'gender' => 'female',
            'address' => '123 St',
            'class_id' => $class->id,
            'activities' => [$activity->id],
            'books' => [$book->id],
            'image_removed' => true,
        ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('students', [
        'id' => $student->id,
        'image_url' => null,
    ]);

    Storage::disk('public')->assertMissing($fakePath);
});

test('can delete a student', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $class = ClassModel::create(['name' => 'Class A', 'level' => 1, 'is_active' => true]);
    $fakePath = UploadedFile::fake()->image('profile.jpg')->store('students', 'public');

    $student = Student::create([
        'name' => 'Alice',
        'age' => 20,
        'gender' => 'female',
        'address' => '123 St',
        'class_id' => $class->id,
        'image_url' => $fakePath,
        'is_active' => true,
    ]);

    Storage::disk('public')->assertExists($fakePath);

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->deleteJson("/api/student/rsc/{$student->id}");

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Student deleted successfully.',
        ]);

    $this->assertDatabaseMissing('students', [
        'id' => $student->id,
    ]);

    Storage::disk('public')->assertMissing($fakePath);
});

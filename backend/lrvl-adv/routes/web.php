<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');


Route::get('/cart', function () {
    return Inertia::render('cart');
})->name('cart');


Route::get('/page/{parameter}', function () {
    return Inertia::render('page');
})->name('page');

<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/',[HomeController::class,'home'])->name('dashboard');

    Route::get('/user/{user}',function (){

    })->name('chat.user');
        Route::get('/group/{user}',function (){
        
    })->name('chat.group');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/group', [ProfileController::class, 'show'])->name('chat.group');
    Route::get('/profile/user', [ProfileController::class, 'show'])->name('chat.user');
});

require __DIR__.'/auth.php';

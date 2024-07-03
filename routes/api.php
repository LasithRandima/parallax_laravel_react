<?php

use App\Http\Controllers\PatientrequestController;
use App\Http\Controllers\RequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/requests', [RequestController::class, 'index']);
// Route::post('/requests', [RequestController::class, 'store']);
// Route::patch('/requests/{id}', [RequestController::class, 'update']);
// Route::delete('/requests/{id}', [RequestController::class, 'destroy']);

// Route::apiResource('/requests', RequestController::class);
Route::apiResource('/patientrequests', PatientrequestController::class);

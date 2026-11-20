<?php
use App\Http\Controllers\CmsController;
use App\Http\Controllers\PageContentController;
use App\Http\Middleware\CmsAdmin;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::post('/login',[CmsController::class,'login'])->middleware('throttle:5,1');
Route::post('/leads',[CmsController::class,'lead'])->middleware('throttle:10,60');
Route::get('/articles',[CmsController::class,'articles']);
Route::get('/articles/{slug}',[CmsController::class,'article']);
Route::get('/images',fn()=>DB::table('cms_images')->pluck('url','key'));
Route::get('/page-content',[PageContentController::class,'published']);
Route::middleware(CmsAdmin::class)->group(function () {
    Route::get('/admin/page-content',[PageContentController::class,'show']);
    Route::post('/admin/page-content',[PageContentController::class,'save']);
    Route::get('/session',fn()=>['authenticated'=>true]);
    Route::post('/logout',[CmsController::class,'logout']);
    Route::get('/admin/{resource}',[CmsController::class,'index']);
    Route::post('/admin/{resource}',[CmsController::class,'save']);
});

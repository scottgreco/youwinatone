<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('index');
});

Route::get('/offices', 'HomeController@offices');

Route::post('/feedback', 'HomeController@feedback');
Route::post('/conversation', 'HomeController@conversation');
Route::post('/notify', 'HomeController@notify');

Route::controller('/login', 'LoginController');

Route::get('logout', function()
{
    Auth::logout();
    return Redirect::intended('/');
});
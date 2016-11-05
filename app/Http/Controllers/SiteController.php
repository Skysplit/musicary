<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * Main site controller.
 * Contains mostly static pages.
 */
class SiteController extends Controller
{
    public function index()
    {
        return view('site.index');
    }
}
